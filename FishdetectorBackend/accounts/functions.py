import os
import time
from moviepy.editor import VideoFileClip
from firebase_admin import credentials, storage
import firebase_admin
import json

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"storageBucket": "project28-f22ba.appspot.com"})


def handle_uploaded_file(f):
    upload_dir = './upload/'
    os.makedirs(upload_dir, exist_ok=True)

    # Add a timestamp to the original filename
    timestamp = int(time.time())  # Get current timestamp
    unique_filename = f"{timestamp}_{f.name}"

    file_path = os.path.join(upload_dir, unique_filename)

    with open(file_path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    return file_path, unique_filename  # Return the new unique filename


def convert_avi_to_mp4(input_path, output_path):
    try:
        video_clip = VideoFileClip(input_path)
        video_clip.write_videofile(output_path, codec="libx264")
        print("Conversion successful.")
    except Exception as e:
        print("Conversion failed:", str(e))


""" def upload_video_to_firebase(video_path, destination_path):
    bucket = storage.bucket()
    blob = bucket.blob(destination_path)
    blob.upload_from_filename(video_path)
    blob.make_public()
    public_url = blob.public_url

    return public_url """


def upload_video_to_firebase(video_path, destination_path, result_name):
    bucket = storage.bucket()
    blob = bucket.blob(destination_path)
    json_data = json.dumps(result_name, ensure_ascii=False)
    # Set the metadata to include the result_name
    blob.metadata = {"result_name": json_data}

    blob.upload_from_filename(video_path)
    blob.make_public()
    public_url = blob.public_url

    return public_url
