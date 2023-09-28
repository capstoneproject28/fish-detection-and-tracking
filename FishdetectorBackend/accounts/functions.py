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


def analytics(label_path):
    txt_files_dir = f"{label_path}/labels/"
    labelmap_path = r"./roboflow_labelmap.txt"
    output_path = f"./output_data.json"

    # Load label map
    label_map = {}
    with open(labelmap_path, 'r') as f:
        for line in f:
            idx, label = line.strip().split(': ')
            label_map[idx] = label

    # Process txt files
    txt_files = sorted([f for f in os.listdir(
        txt_files_dir) if f.endswith('.txt')])

    data = {
        "overview": {
            "total_species": 0,
            "total_fish": 0,
            "avg_confidence": 0.0
        },
        "frames": []
    }

    total_confidence = 0.0
    all_species = set()
    all_ids = set()

    for txt_file in txt_files:
        frame_data = {
            "frame": txt_file.split('.')[0],
            "fish": []
        }

        with open(os.path.join(txt_files_dir, txt_file), 'r') as f:
            for line in f:
                parts = line.strip().split()
                if len(parts) < 7:
                    continue

                species_id = parts[0]
                species_name = label_map.get(
                    species_id, f"Unknown_{species_id}")
                bounding_box = list(map(float, parts[1:5]))
                confidence = float(parts[5])
                fish_id = int(parts[6])

                total_confidence += confidence
                all_species.add(species_name)
                all_ids.add(fish_id)

                fish_data = {
                    "species": species_name,
                    "bounding_box": bounding_box,
                    "confidence": confidence,
                    "id": fish_id
                }
                frame_data["fish"].append(fish_data)

        data["frames"].append(frame_data)

    data["overview"]["total_fish"] = len(all_ids)
    data["overview"]["total_species"] = len(all_species)
    data["overview"]["avg_confidence"] = total_confidence / \
        len(all_ids) if all_ids else 0.0

    # Save to output file
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Processed data saved to {output_path}")


def upload_video_to_firebase(video_path, destination_path, result_name):
    bucket = storage.bucket()
    blob = bucket.blob(destination_path)
    with open(result_name, 'r') as f:
        json_data = json.load(f)
    print("Testing ...")
    print(json_data)
    # Set the metadata to include the result_name
    blob.metadata = {"result_name": json.dumps(json_data)}

    blob.upload_from_filename(video_path)
    blob.make_public()
    public_url = blob.public_url

    return public_url
