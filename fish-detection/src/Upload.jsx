import { useState } from 'react'
import axios from 'axios'
import './App.css'

function Upload() {

	const [file, setFile] = useState(null)
	const [progress, setProgress] = useState({ started: false, pc: 0 })
	const [msg, setMsg] = useState(null)

	const [video, setVideo] = useState();

	async function handleUpload() {
		if (!file) {
			setMsg("No file selected")
			return;
		}

		const fd = new FormData()
		fd.append("file", file)
		setMsg("Uploading...")
		setProgress(prevState => {
			return { ...prevState, started: true }
		})


		await axios
        .post("http://127.0.0.1:8000/api/detect/", fd)
        .then((response) => {
          console.log(response.data);
          setVideo(response.data);
        })
        .catch((error) => {
          console.error("Error posting file path:", error);
        });
	}
	return (
		<div class="uploadBox">
			<h1>Upload video</h1>
			<input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />

			<button onClick={handleUpload}>Upload</button>

			{progress.started && <progress max="100" value={progress.pc}></progress>}
			{msg && <span>{msg}</span>}

			<div className="predicted-video">
				{video ? (
					<div className="predicted-video">
						<video
							class="video-js"
							controls
							preload="auto"
							width="100%"
							height="70%"
						><source src={videoSrc} type="video/mp4" /></video>
					</div>
				) : (
					<div>no video yet</div>
				)}
			</div>
		</div>
	);
}

export default Upload;