from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class LoginUserSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_email'] = user.email
        return token
