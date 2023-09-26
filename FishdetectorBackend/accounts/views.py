
from accounts.functions import handle_uploaded_file, convert_avi_to_mp4, upload_video_to_firebase
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from accounts.serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from ultralytics import YOLO
import os
from accounts.models import CustomUser
from rest_framework.viewsets import ViewSet
from django.http import HttpResponse
from django.http import JsonResponse
from firebase_admin import credentials, storage
import firebase_admin
import shutil

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, name='my-app-name', options={"storageBucket": "project28-f22ba.appspot.com"})


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
            return Response({'token': token.key, 'username': username}, status=status.HTTP_200_OK)

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
        name = request.data.get('username')
        print("username is this ", name)
        file_path, filename = handle_uploaded_file(request.FILES['file'])

        new_filename = f"{name}_{filename}"

        print(new_filename)
        predict_path = "./predictions"
        result = model(file_path, save=True,
                       project=predict_path, name=f"{filename[:-4]}")
        result_name = result[0].names
        # print("the complete results are: ^^^^^ ",result)
        print("Only the DATA RELATED TO Barchart is ")
        print(result_name)
        convert_path = f"{predict_path}/{filename[:-4]}/"
        annotated_video_file = os.path.join(convert_path, filename[:-4])

        input_path = f"{annotated_video_file}" + ".avi"
        output_path = f"{annotated_video_file}" + ".mp4"

        convert_avi_to_mp4(input_path, output_path)

        video_path = output_path

        destination_path = f"{new_filename[:-4]}"
        # destination_path = f"{new_filename[:-4]}"
        public_url = upload_video_to_firebase(
            video_path, destination_path, result_name)

        try:
            os.remove(video_path)  # remove the .mp4 file
            # remove the .avi file
            os.remove(input_path)
            shutil.rmtree("./upload")
        except Exception as e:
            print(f"Error deleting file: {e}")

        response_data = {
            'result_name': result_name,
            'public_url': public_url
        }

        # Return the dictionary as a JSON response
        return JsonResponse(response_data)

        # return HttpResponse(public_url)
    else:
        return HttpResponse("File Not Upload successfuly")


@api_view(['GET'])
def list_video_links(request):
    try:
        app = firebase_admin.get_app(name='my-app-name')
        bucket = storage.bucket(app=app)

        blobs = bucket.list_blobs()

        username = request.query_params.get('username')

        video_links = []
        for blob in blobs:
            if blob.name.startswith(f"{username}_"):
                video_metadata = blob.metadata  # Get the metadata for the blob
                if video_metadata is not None:
                    # Get the result_name from metadata
                    result_name = video_metadata.get("result_name", "")
                else:
                    result_name = ""  # Set a default value if metadata is None
                video_links.append(
                    {"url": blob.public_url, "filename": blob.name, "result_name": result_name})

        return JsonResponse({"videos": video_links}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
