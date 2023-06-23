from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        # model_fields = ['id', 'user', 'first_name',
        #                 'last_name', 'position', 'phone', 'city']
        # extra_fields = ['tasks_num']
        # fields = model_fields + extra_fields
        fields = '__all__'