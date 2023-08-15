from api.views import VideoView, CustomUserView
from django.urls import path

urlpatterns = [
    path('video', VideoView.as_view()),
    path('user', CustomUserView.as_view()),
]
