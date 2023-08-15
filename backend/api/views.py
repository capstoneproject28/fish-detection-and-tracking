from django.shortcuts import render
from rest_framework import generics
from api.models import Video
from api.serializers import VideoSerializer, CustomUserSerializer


class VideoView(generics.ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class CustomUserView(generics.ListAPIView):
    queryset = Video.objects.all()
    serializer_class = CustomUserSerializer
