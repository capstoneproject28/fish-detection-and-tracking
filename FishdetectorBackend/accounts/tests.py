import unittest
from unittest.mock import patch, mock_open, MagicMock
import time
from functions import handle_uploaded_file, convert_avi_to_mp4, upload_video_to_firebase


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

    @patch('functions.VideoFileClip')
    @patch('functions.print')
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
