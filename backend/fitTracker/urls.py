from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
  url('api/register', SignUp.as_view(), name='register'),
  url('api/login', Login.as_view(), name='login')
]