from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginUserSerializer


class LoginUserView(TokenObtainPairView):
    serializer_class = LoginUserSerializer
