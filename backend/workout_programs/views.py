from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User

# Create your views here.
class GetAllWorkouts(APIView):
  def get(self, request, format=None):
      try:
          workouts = User.objects.all()
          return Response('success')
      except:
          return Response({"Error": "Something went wrong when trying to get workouts"})

class GetSingleWorkout(APIView):
  def get(self, request, format=None):
      try:
          workout = User.objects.all()
          return Response('success')
      except:
          return Response({"Error": "Something went wrong when trying to get workout"})
      
class CreateWorkout(APIView):
  def post(self, request, format=None):
      try:
          workout = User.objects.all()
          return Response('success')
      except:
          return Response({"Error": "Something went wrong when trying to create workout"})
      
class UpdateWorkout(APIView):
  def put(self, request, format=None):
      try:
          workout = User.objects.all()
          return Response('success')
      except:
          return Response({"Error": "Something went wrong when trying to update workout"})