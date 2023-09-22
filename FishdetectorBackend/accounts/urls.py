
from django.urls import path, include
from .views import register_user, user_login, user_logout, predict, list_video_links

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('detect/', predict, name="predict"),
    path('history/', list_video_links, name="list_video_links"),
]