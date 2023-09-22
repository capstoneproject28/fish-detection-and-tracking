import React, { useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";

function DetectPage() {

  const [detecting, setDetecting] = useState(false);
  const [videoSrc, setSrc] = useState();
  const [data, setData] = useState({});

  const handleChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setDetecting(true);
      const uid = localStorage.getItem('uid');
      const username = localStorage.getItem('username');
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uid", uid);
      formData.append("username", username);

      console.log(uid);

      await axios
        .post("http://127.0.0.1:8000/api/detect/", formData)
        .then((response) => {
          console.log(response.data);
          setSrc(response.data['public_url']);
          setData(response.data['result_name']);
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
            <br />
            <h4 style={{ color: 'yellow' }}>Possible Fish types</h4>
            <div style={{ height: '200px', overflowY: 'auto', fontSize: '1em', border: '1.2px solid grey', borderRadius: '20px' }}>
              <ul style={{ listStyleType: "none" }}>
                {Object.entries(data).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> <span style={{ color: 'yellow' }}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : detecting ? (
          <DotLoader color="#36d7b7" />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default DetectPage;
