import json
import os
import unittest
from unittest import mock
from unittest.mock import patch, mock_open, MagicMock, Mock
import time
from accounts.functions import handle_uploaded_file, convert_avi_to_mp4, upload_video_to_firebase, analytics
from accounts.views import register_user, user_login, user_logout
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

class TestUserViews(unittest.TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()

    @patch('accounts.views.UserSerializer')
    def test_register_user_valid(self, MockUserSerializer):
        data = {
            'username': 'testuser',
            'password': 'password123'
        }

        # Simulate a valid serializer
        mock_serializer_instance = MockUserSerializer.return_value
        mock_serializer_instance.is_valid.return_value = True
        mock_serializer_instance.data = data

        request = self.factory.post('/register/', data, format='json')
        response = register_user(request)

        self.assertEqual(response.status_code, 201)

    @patch('accounts.views.UserSerializer')
    def test_register_user_invalid(self, MockUserSerializer):
        data = {
            'username': 'testuser',
            'password': 'password123'
        }

        # Simulate an invalid serializer
        mock_serializer_instance = MockUserSerializer.return_value
        mock_serializer_instance.is_valid.return_value = False
        mock_serializer_instance.errors = {'error': 'some error'}

        request = self.factory.post('/register/', data, format='json')
        response = register_user(request)

        self.assertEqual(response.status_code, 400)

    @patch('accounts.views.authenticate')
    @patch('accounts.views.CustomUser.objects.get')
    @patch('accounts.views.Token.objects.get_or_create')
    def test_user_login_with_email(self, MockGetOrCreate, MockUserGet, MockAuthenticate):
        data = {
            'username': 'testuser@email.com',
            'password': 'password123'
        }

        user_mock = Mock()
        user_mock.id = 1

        MockUserGet.return_value = user_mock
        MockGetOrCreate.return_value = (Mock(), False)

        request = self.factory.post('/login/', data, format='json')
        response = user_login(request)

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)

    @patch('accounts.views.authenticate')
    @patch('accounts.views.CustomUser.objects.get')
    @patch('accounts.views.Token.objects.get_or_create')
    def test_user_login_invalid(self, MockGetOrCreate, MockUserGet, MockAuthenticate):
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }

        MockUserGet.side_effect = Exception('User not found')
        MockAuthenticate.return_value = None

        request = self.factory.post('/login/', data, format='json')
        response = user_login(request)

        self.assertEqual(response.status_code, 401)

    @patch.object(Request, 'user')
    def test_user_logout(self, mock_user):
        mock_token = Mock()
        mock_user.auth_token = mock_token

        request = self.factory.post('/logout/')
        response = user_logout(request)

        mock_token.delete.assert_called_once()
        self.assertEqual(response.status_code, 200)


class TestVideoProcessing(unittest.TestCase):

    def test_handle_uploaded_file(self):
        # Mock the file object
        mock_file = MagicMock()
        mock_file.name = "test.avi"
        mock_file.chunks.return_value = [b"chunk1", b"chunk2"]

        # Mock open method
        with patch("builtins.open", mock_open()) as mocked_open:
            file_path, unique_filename = handle_uploaded_file(mock_file)

        # Check if unique filename is generated correctly
        self.assertTrue(unique_filename.startswith(
            f"{int(time.time())}_test.avi"))

        # Check if file is written correctly
        mocked_open.assert_called_with(f"./upload/{unique_filename}", "wb+")
        handle = mocked_open()
        handle.write.assert_any_call(b"chunk1")
        handle.write.assert_any_call(b"chunk2")

    @patch('accounts.functions.VideoFileClip')
    @patch('accounts.functions.print')
    def test_convert_avi_to_mp4(self, mock_print, mock_videofileclip):
        # Mock VideoFileClip's behavior
        mock_clip = MagicMock()
        mock_videofileclip.return_value = mock_clip

        convert_avi_to_mp4("input.avi", "output.mp4")

        mock_videofileclip.assert_called_with("input.avi")
        mock_clip.write_videofile.assert_called_with(
            "output.mp4", codec="libx264")
        mock_print.assert_called_with("Conversion successful.")
        
    @mock.patch('accounts.functions.storage.bucket')  # replace 'your_module' with the actual module name
    @mock.patch('builtins.open', new_callable=mock.mock_open, read_data='{"some": "data"}')
    @mock.patch('accounts.functions.json.load', return_value={"some": "data"})  # replace 'your_module' with the actual module name
    @mock.patch('accounts.functions.json.dumps', return_value='{"some": "data"}')  # replace 'your_module' with the actual module name
    def test_upload_video_to_firebase(self, mock_dumps, mock_load, mock_open, mock_bucket):
        # Setting up the mock bucket and blob objects
        mock_blob = mock.MagicMock()
        mock_bucket.return_value = mock.MagicMock(blob=mock.MagicMock(return_value=mock_blob))
        mock_blob.public_url = "http://mockurl.com/video"

        video_path = "mock_video_path"
        destination_path = "mock_destination_path"
        result_name = "mock_result_name"

        returned_url = upload_video_to_firebase(video_path, destination_path, result_name)

        # Assert open was called correctly
        mock_open.assert_called_once_with(result_name, 'r')
        
        # Assert json.load was called correctly
        mock_load.assert_called_once()
        
        # Assert metadata was set on the blob
        self.assertEqual(mock_blob.metadata, {"result_name": '{"some": "data"}'})
        
        # Assert blob.upload_from_filename was called with the correct video path
        mock_blob.upload_from_filename.assert_called_once_with(video_path)
        
        # Assert blob was made public
        mock_blob.make_public.assert_called_once()
        
        # Assert the function returns the correct public URL
        self.assertEqual(returned_url, "http://mockurl.com/video")

class TestAnalyticsFunction(unittest.TestCase):

    @patch('accounts.functions.os.listdir')  # Replace 'your_module_name' with the name of the module containing the analytics function
    @patch('accounts.functions.open', new_callable=mock_open, read_data="0: species_0\n1: species_1")
    @patch('accounts.functions.json.dump')
    def test_analytics(self, mock_json_dump, mock_open_file, mock_listdir):

        # Mocking list of text files in the directory
        mock_listdir.return_value = ['file1.txt', 'file2.txt']

        mock_txt_content = '0 0.1 0.2 0.3 0.4 0.5 1\n1 0.5 0.6 0.7 0.8 0.9 2'
        mock_file_handles = [
            mock_open(read_data="0: species_0\n1: species_1").return_value,  # Return mocked content for the label map
            mock_open(read_data=mock_txt_content).return_value,  # Return mocked content for the txt file
            mock_open(read_data=mock_txt_content).return_value,  # Return mocked content for the label map
            mock_open().return_value  # For the output JSON file
        ]
        mock_open_file.side_effect = mock_file_handles

        analytics("/some_path")

        # Verifying the function's internal behavior
        self.assertEqual(mock_open_file.call_count, 4)

        # Ensure json.dump is called with the correct data
        expected_data = {
            "overview": {
                "total_species": 2,
                "total_fish": 2,
                "avg_confidence": 1.4
            },
            "frames": [
                {
                    "frame": "file1",
                    "fish": [
                        {"species": "species_0", "bounding_box": [0.1, 0.2, 0.3, 0.4], "confidence": 0.5, "id": 1},
                        {"species": "species_1", "bounding_box": [0.5, 0.6, 0.7, 0.8], "confidence": 0.9, "id": 2}
                    ]
                },
                {
                    "frame": "file2",
                    "fish": [
                        {"species": "species_0", "bounding_box": [0.1, 0.2, 0.3, 0.4], "confidence": 0.5, "id": 1},
                        {"species": "species_1", "bounding_box": [0.5, 0.6, 0.7, 0.8], "confidence": 0.9, "id": 2}
                    ]
                }
            ]
        }

        mock_json_dump.assert_called_once_with(expected_data, mock_file_handles[-1], indent=4)
        
if __name__ == '__main__':
    unittest.main()
