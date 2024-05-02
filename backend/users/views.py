from rest_framework.views import APIView
from rest_framework import permissions
from user_profiles.models import UserProfile
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib import auth
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data["password"]

        try:
            user = auth.authenticate(username=username, password=password)
            user_name_check = User.objects.filter(username=username).exists()

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            elif not user_name_check:
                return Response({'error': 'Account with username does not exist'})
            else:
                return Response({'error': 'Incorrect password. Please Try again'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        try:
            refresh_token = request.data.get('refresh')  # Get the refresh token from the request data
            if refresh_token:
                # Blacklist the refresh token
                refresh_token_instance = RefreshToken(refresh_token)
                refresh_token_instance.blacklist()
            auth.logout(request)
            return Response({'success': 'Successfully logged out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})

        except:
            return Response({'isAuthenticated': 'error'})


class SignUpView(APIView):
    """
    POST /signup/
    
    username (string, required): The username for the new account.
    password (string, required): The password for the new account.
    re_password (string, required): Re-entered password to confirm.

    Success Response:

    Status Code: 200 OK
    Content: {'success': 'User created successfully'}
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data["password"]
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': "Username already exists"})

                else:
                    if len(password) < 6:
                        return Response({'error': "Password must be at least 6 characters"})

                    else:

                        user = User.objects.create_user(
                            username=username, password=password)

                        user = User.objects.get(id=user.id)

                        user_profile = UserProfile.objects.create(
                            user=user, first_name='', last_name='', body_weight='')

                        return Response({'success': 'User created successfully'})
            else:
                return Response({'error': "Passwords do not match"})
        except:
            return Response({'error': 'Something went wrong when registering account'})

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        try:
            User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user'})


class GetUsersView(APIView):
    def get(self, requset, format=None):
        try:
            users = User.objects.all()
            users = UserSerializer(users, many=True)
            return Response(users.data)
        except:
            return Response({"error": "something went wrong when trying to get users"})