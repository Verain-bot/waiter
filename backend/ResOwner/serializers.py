from rest_framework import serializers
from api.models import MenuItem

class MenuListSerializer(serializers.ModelSerializer):

    def get_hasCustomization(self, obj):
        if len(obj.item_customization.all()) > 0:
            return True
        else:
            return False

    
    class Meta:
        model = MenuItem
        fields = ['id','name',  'price', 'isActive']