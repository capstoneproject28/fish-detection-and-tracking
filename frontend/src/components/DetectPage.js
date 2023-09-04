import React, { useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


function DetectPage() {
  const [detecting, setDetecting] = useState(false);
  const [videoSrc, setSrc] = useState();
  const navigate = useNavigate();


  const Logout = async () => {
    const storedToken = JSON.parse(localStorage.getItem('tokenValue'));
    console.log(storedToken.token);
    if (storedToken && storedToken.token.token) {
      const config = {
        headers: {
          Authorization: `Token ${storedToken.token.token}`
        }
      };
  
      try {
        const response = await axios.post('http://localhost:8000/api/logout/', null, config);
        console.log('Logout successful', response);
        // Handle any further actions after successful logout
        navigate("/");
      } catch (error) {
        console.error('Logout failed', error);
        // Handle error cases
      }
    } else {
      console.error('No valid token found');
    }
  }
  const handleChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setDetecting(true);
      const formData = new FormData();
      formData.append("file", file);

      await axios
        .post("http://127.0.0.1:8000/api/detect/", formData)
        .then((response) => {
          console.log(response.data);
          setSrc(response.data);
          setDetecting(false);
        })
        .catch((error) => {
          console.error("Error posting file path:", error);
        });
    }
  };

  return (
    <div className="detect-page">
      <h3>Upload the Video to get the Detections</h3>
      <div className="card">
        <div className="card-content">
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input
              type="file"
              name="file"
              accept=".mp4"
              onChange={handleChange}
              disabled={detecting ? true : false}
            />
          </div>
        </div>
      </div>
      <div className="predicted-video">
        {videoSrc ? (
          <div className="predicted-video">
            <video
              class="video-js"
              controls
              preload="auto"
              width="100%"
              height="70%"
            ><source src={videoSrc} type="video/mp4" /></video>
          </div>
        ) : detecting ? (
          <DotLoader color="#36d7b7" />
        ) : (
          <div></div>
        )}
      </div>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default DetectPage;
