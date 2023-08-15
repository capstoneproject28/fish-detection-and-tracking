from rest_framework import serializers
from api.models import CustomUser, Video, VideoAnalysis


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined')


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'user', 'title', 'video_file', 'uploaded_at',
                  'analyzed_at', 'analysis_result', 'is_analyzed')


class VideoAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoAnalysis
        fields = ('id', 'video', 'analysis_data', 'created_at')
