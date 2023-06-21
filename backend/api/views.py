from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from rest_framework import views, generics, viewsets
from .serializers import *
from .helper import sendOTPtoPhone
from rest_framework.response import Response
from django.core.cache import cache
from .permissions import *
from . import responseMessages as msg

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
                return Response(msg.USER_LOGGED_OUT)
            return Response(msg.USER_LOGGED_IN(request.session['phone']))
        
        elif 'phone' in request.data:
            phone = request.data['phone']

            # Check if phone number is already registered
            if not Customer.objects.filter(phone=phone).exists():
                return Response(msg.PHONE_NOT_FOUND, status=404)
            
            request.session['phone'] = int(phone)
            request.session['is_verified'] = False
            
            cacheData = {
                'otp' : sendOTPtoPhone(phone),
                'tries' : 0,
            }
            cache.set(phone, cacheData, timeout=120)

            return Response(msg.OTP_SENT(phone))
        
        return Response(msg.INVALID_REQUEST, status=400)

class VerifyOTP(views.APIView):

    def post(self, request, *args, **kwargs):
        if 'phone' not in request.session or 'is_verified' not in request.session:
            return Response(msg.OTP_NOT_GENERATED, 400)

        phone = request.session['phone']
        otp = int(request.data['otp'])
        cacheData = cache.get(phone)
        cacheData['tries'] += 1
        cache.set(phone, cacheData)

        if cacheData['tries'] >= 5:
            cache.delete(phone)
            request.session.flush()
            return Response(msg.OTP_TOO_MANY_ATTEMPTS, status=400)
        
        if otp == cacheData['otp']:
            request.session['is_verified'] = True
            return Response(msg.OTP_VERIFICATION_COMPLETE)
        else:
            return Response(msg.WRONG_OTP, status=400)

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
            return Response(msg.TABLE_ALREADY_ASSIGNED, status=400)

        if 'tableNumber' not in request.data:
            return Response(msg.TABLENO_NOT_PROVIDED, status=400)
        
        tableNumber = request.data['tableNumber']
        #get table
        
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=self.kwargs['pk']))
        
        if table.status != 'Available':
            return Response(msg.TABLE_ALREADY_OCCUPIED, status=400)
        
        table.status = 'Occupied'
        table.customersSitting.add(Customer.objects.get(phone=request.session['phone']))
        table.save()
        request.session['table'] = tableNumber
        request.session['restaurant'] = self.kwargs['pk']
        return Response(msg.TABLE_ASSIGNED_SUCCESS)
    
    #delete assigned table
    def delete(self, request, *args, **kwargs):
        if 'table' not in request.session:
            return Response(msg.TABLE_NOT_ASSIGNED, status=400)
        
        tableNumber = request.session['table']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=self.kwargs['pk']))
        table.status = 'Available'
        table.customersSitting.remove(Customer.objects.get(phone=request.session['phone']))
        table.save()
        del request.session['table']
        del request.session['restaurant']
        return Response(msg.GENERAL_SUCCESS)

#Join existing table
class JoinTable(views.APIView):
    permission_classes = [IsCustomer]

    def get(self, request, *args, **kwargs):
        #get update on status
        #if tableRequested is not in session
        if 'tableRequested' not in request.session:
            return Response(msg.TABLE_NOT_REQUESTED, status=400)
        
        tableNumber = request.session['tableRequested']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=request.session['restaurant']))

        #get cache data
        cacheData = cache.get(f"TableCache {table.id}")

        #find index of current customer in cache data
        index = -1
        for i in range(len(cacheData)):
            if cacheData[i]['phone'] == request.session['phone']:
                index = i
                break
        
        #if status is accepted
        if cacheData[index]['status'] == 'accepted':
            table.customersSitting.add(Customer.objects.get(phone=request.session['phone']))
            table.save()
            request.session['table'] = tableNumber
            
            #remove from cache
            cacheData.pop(index)
            cache.set(f"TableCache {table.id}", cacheData)

            del request.session['tableRequested']
            return Response(msg.TABLE_ASSIGNED_SUCCESS)

    def post(self, request, *args, **kwargs):
        
        #if table already assigned
        if 'tableNumber' in request.session:
            return Response(msg.TABLE_ALREADY_ASSIGNED, status=400)
        
        if 'tableNumber' not in request.data:
            return Response(msg.TABLENO_NOT_PROVIDED, status=400)

        if 'tableRequested' in request.session:
            return Response(msg.TABLE_ALREADY_REQUESTED, status=400)

        tableNumber = request.data['tableNumber']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=self.kwargs['pk']))
        
        if table.status != 'Occupied':
            return Response(msg.TABLE_NOT_OCCUPIED, status=400)
        #append to existing cache
        if cache.get(f"TableCache {table.id}"):
            cacheData = cache.get(f"TableCache {table.id}")
            cacheData.append({'phone': request.session['phone'], 'status': 'requested'})
            cache.set(f"TableCache {table.id}", cacheData, timeout=300)
        
        else:
            cache.set(f"TableCache {table.id}", [{'phone': request.session['phone'], 'status': 'requested'}], timeout=300)

        request.session['tableRequested'] = table.tableNumber
        request.session['restaurant'] = self.kwargs['pk']

        return Response(msg.TABLE_JOIN_REQUESTED)

    def delete(self, request, *args, **kwargs):
        #delete join request
        if 'tableRequested' not in request.session:
            return Response(msg.INVALID_REQUEST, status=400)
        
        tableNumber = request.session['tableRequested']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=request.session['restaurant']))

        #get cache data
        cacheData = cache.get(f"TableCache {table.id}")
        #find index of current customer in cache data
        index = -1
        for i in range(len(cacheData)):
            if cacheData[i]['phone'] == request.session['phone']:
                index = i
                break
        
        #if status is accepted
        if cacheData[index]['status'] == 'accepted':
            return Response(msg.TABLE_ALREADY_ASSIGNED, status=400)
        
        #if status is requested
        if cacheData[index]['status'] == 'requested':
            cacheData.pop(index)
            cache.set(f"TableCache {table.id}", cacheData, timeout=300)
            del request.session['tableRequested']
            return Response(msg.TABLE_REQUEST_DELETED)
        
        #if status is rejected
        if cacheData[index]['status'] == 'rejected':
            cacheData.pop(index)
            cache.set(f"TableCache {table.id}", cacheData, timeout=300)
            del request.session['tableRequested']
            return Response(msg.TABLE_REQUEST_DELETED)
        
        return Response(msg.INVALID_REQUEST, status=400)

class CheckTable(views.APIView):
    permission_classes = [IsCustomer,IsTableAssigned]
    def get(self, request, *args, **kwargs):
        tableNumber = request.session['table']
        table = get_object_or_404(Tables, tableNumber=tableNumber, restaurant=Restaurant.objects.get(pk=request.session['restaurant']))
        data = []
        if cache.get(f"TableCache {table.id}"):
            data = cache.get(f"TableCache {table.id}")
        
        return Response({'restaurant': table.restaurant.name,'tableNumber': table.tableNumber, 'status': table.status, 'peopleRequesting': data, "people": [customer.name for customer in table.customersSitting.all()]})
    
    def post(self, request):
        #get phone from request
        if 'phone' not in request.data:
            return Response({'error': 'Please provide user'}, status=400)
        phone = int(request.data['phone'])
        
        #get table
        table = get_object_or_404(Tables, tableNumber=request.session['table'], restaurant=request.session['restaurant'])

        #get cache data
        cacheData = cache.get(f"TableCache {table.id}")

        #find the index of the phone in cache
        index = -1
        for i in range(len(cacheData)):
            if cacheData[i]['phone'] == phone:
                index = i
                break
        
        #if phone not found
        if index == -1:
            return Response(msg.USER_NOT_FOUND, status=400)
        
        #set status to accepted
        cacheData[index]['status'] = 'accepted'
        cache.set(f"TableCache {table.id}", cacheData, timeout=300)
        return Response(msg.USER_ACCEPTED)
        
