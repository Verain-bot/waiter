from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from rest_framework import views, generics, viewsets
from .serializers import *
from .helper import sendOTPtoPhone
from rest_framework.response import Response
from django.core.cache import cache
from .permissions import *


def index(request):
    return HttpResponse('First')

# Create your views here.
class RestraurantList(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantListSerializer

class RestaurantDetail(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailsSerializer

class MenuDetails(generics.RetrieveAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuDetailsSerializer

class CustomerView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer

class TableListView(generics.ListAPIView):
    queryset = Tables.objects.all()
    serializer_class = TableSerializer

    def get_queryset(self):
        queryset = Tables.objects.filter(restaurant=self.kwargs['pk'])
        return queryset

class CustomerLogin(views.APIView):

    def post(self, request, *args, **kwargs):
        if 'phone' in request.session and 'is_verified' in request.session and request.session['is_verified']:
            if 'logout' in request.data and request.data['logout']:
                request.session.flush()
                return Response({'logout': True})
            return Response({'phone': request.session['phone'], 'created': False})
        
        elif 'phone' in request.data:
            phone = request.data['phone']

            # Check if phone number is already registered
            if not Customer.objects.filter(phone=phone).exists():
                return Response({'error': 'Phone number is not registered. Please register first'}, status=404)
            
            request.session['phone'] = int(phone)
            request.session['is_verified'] = False
            
            cacheData = {
                'otp' : sendOTPtoPhone(phone),
                'tries' : 0,
            }
            cache.set(phone, cacheData, timeout=120)

            return Response({'phone': phone, 'message' : 'OTP is sent to your phone and will expire in 2 mins'})
        
        return Response({'error': 'Invalid Request'}, status=400)

class VerifyOTP(views.APIView):

    def post(self, request, *args, **kwargs):
        if 'phone' not in request.session or 'is_verified' not in request.session:
            return Response({'error': 'Please generate OTP first'}, 400)

        phone = request.session['phone']
        otp = int(request.data['otp'])
        cacheData = cache.get(phone)
        cacheData['tries'] += 1
        cache.set(phone, cacheData)

        if cacheData['tries'] >= 5:
            cache.delete(phone)
            request.session.flush()
            return Response({'error': 'Too many attempts. Please try again'}, status=400)
        
        if otp == cacheData['otp']:
            request.session['is_verified'] = True
            return Response({'verified': True})
        else:
            return Response({'verified': cache.get(request.session['phone'])})

#Update customer details
class UpdateAccount(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [IsCustomer]

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), phone=self.request.session['phone'])
        self.check_object_permissions(self.request, obj)
        return obj

class OrderList(generics.ListAPIView):
    #queryset contains all the orders of the customer
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer
    permission_classes = [IsCustomer, IsCustomerOrder]

    def get_queryset(self):
        return super().get_queryset().filter(customers__phone=self.request.session['phone'])

class OrderDetails(generics.RetrieveAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsCustomer, IsCustomerOrder]

#assign table to customer using session
class AssignTable(views.APIView):
    permission_classes = [IsCustomer]

    def post(self, request, *args, **kwargs):
        
        #if table already assigned
        if 'tableNumber' in request.session:
            return Response({'error': 'Table already assigned to you'}, status=400)

        if 'tableNumber' not in request.data:
            return Response({'error': 'Please provide table id'}, status=400)
        
        tableNumber = request.data['tableNumber']
        #get table
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=self.kwargs['pk'])
        
        if table.status != 'Available':
            return Response({'error': 'Table is already occupied'}, status=400)
        
        table.status = 'Occupied'
        table.customersSitting.add(Customer.objects.get(phone=request.session['phone']))
        table.save()
        request.session['table'] = tableNumber
        request.session['restaurant'] = self.kwargs['pk']
        return Response({'message': 'Table assigned successfully'})
    
    #delete assigned table
    def delete(self, request, *args, **kwargs):
        if 'table' not in request.session:
            return Response({'error': 'No table assigned to you'}, status=400)
        
        tableNumber = request.session['table']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=self.kwargs['pk'])
        table.status = 'Available'
        table.customersSitting.remove(Customer.objects.get(phone=request.session['phone']))
        table.save()
        del request.session['table']
        del request.session['restaurant']
        return Response({'message': 'Table unassigned successfully'})
    
#Join existing table
class JoinTable(views.APIView):
    permission_classes = [IsCustomer]
    def post(self, request, *args, **kwargs):
        
        #if table already assigned
        if 'tableNumber' in request.session:
            return Response({'error': 'Table already assigned to you'}, status=400)
        
        if 'tableNumber' not in request.data:
            return Response({'error': 'Please provide table id'}, status=400)

        tableNumber = request.data['tableNumber']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=self.kwargs['pk'])
        
        if table.status != 'Occupied':
            return Response({'error': 'Table is not occupied'}, status=400)
        #append to existing cache
        if cache.get(f'{table.restaurant.id}+{table.tableNumber}'):
            cacheData = cache.get(f'{table.restaurant.id}+{table.tableNumber}')
            cacheData.append({'phone': request.session['phone']})
            cache.set(f'{table.restaurant.id}+{table.tableNumber}', cacheData, timeout=300)
        
        else:
            cache.set(f'{table.restaurant.id}+{table.tableNumber}', [{'phone': request.session['phone'], 'status': 'requested'}], timeout=300)
        
        return Response({'message': 'You will join the table when someone from the table accepts your request'})

class CheckTable(views.APIView):
    permission_classes = [IsCustomer,IsTableAssigned]
    def get(self, request, *args, **kwargs):
        table_id = request.session['table']
        table = get_object_or_404(Tables, id=table_id)
        data = []
        if cache.get(f'{table.restaurant.id}+{table.tableNumber}'):
            data = cache.get(f'{table.restaurant.id}+{table.tableNumber}')
        
        return Response({'restaurant': table.restaurant.name,'tableNumber': table.tableNumber, 'status': table.status, 'peopleRequesting': data})
