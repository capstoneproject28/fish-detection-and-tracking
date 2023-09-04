
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from ultralytics import YOLO
import os
from .models import CustomUser
from rest_framework.viewsets import ViewSet
from django.http import HttpResponse 
from django.http import JsonResponse

from .functions import handle_uploaded_file, convert_avi_to_mp4, upload_video_to_firebase

model = YOLO('best.pt')

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['POST'])
def predict(request):
    if request.method == "POST":
        file_path, filename = handle_uploaded_file(request.FILES['file'])
        predict_path = "./predictions"
        model(file_path, save=True, project=predict_path, name=f"{filename[:-4]}")
        convert_path = f"{predict_path}/{filename[:-4]}/"
        annotated_video_file = os.path.join(convert_path, filename[:-4])

        input_path = f"{annotated_video_file}" + ".avi"
        output_path = f"{annotated_video_file}"+ ".mp4"
        
        convert_avi_to_mp4(input_path, output_path)

        video_path = output_path
        destination_path = f"{filename[:-4]}"
        public_url = upload_video_to_firebase(video_path, destination_path)

        return HttpResponse(public_url)
    else:
        return HttpResponse("File Not Upload successfuly")