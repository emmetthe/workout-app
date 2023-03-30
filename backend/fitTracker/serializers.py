from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
    )
  
  username = serializers.CharField(
    max_length=32,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  
  password = serializers.CharField(min_length=8, write_only=True)

  def create(self, registration_data):
    user = User.objects.create_user(registration_data['username'], registration_data['email'],
      registration_data['password'])
    return user

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')