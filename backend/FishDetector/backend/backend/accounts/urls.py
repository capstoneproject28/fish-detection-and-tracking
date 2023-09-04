
from django.urls import path, include
from .views import register_user, user_login, user_logout, predict
from .models import CustomUser


urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('detect/', predict, name="predict"),
]