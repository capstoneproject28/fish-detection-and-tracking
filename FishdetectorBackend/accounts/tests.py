import unittest
from unittest.mock import patch, mock_open, MagicMock, Mock
import time
from accounts.functions import handle_uploaded_file, convert_avi_to_mp4, upload_video_to_firebase
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


if __name__ == '__main__':
    unittest.main()
