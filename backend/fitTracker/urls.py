from django.urls import path
from .views import SignUp
from django.conf.urls import url

urlpatterns = [
     url('register', SignUp.as_view(), name='register'),
]