import { useState } from 'react'
import axios from 'axios'
import '../css/main.css'
import '../css/upload.css'
import Navbar from '../designComponents/Navbar.jsx';

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
		const uid = localStorage.getItem('uid');
		const username = localStorage.getItem('username');

		fd.append("file", file);
		fd.append("uid", uid);
		fd.append("username", username);
		fd.append("file", file)

		console.log(fd.get("username"));

		await axios
			.post("http://127.0.0.1:8000/api/detect/", fd)
			.then((response) => {
				console.log(response.data["public_url"]);
				console.log(response.data);
				setVideo(response.data["public_url"]);
			})
			.catch((error) => {
				console.error("Error posting file path:", error);
			});
	}
	return (
		<>
			<Navbar />
			<div className="uploadBox">
				<h1>Upload video</h1>
				<input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />

				<button onClick={handleUpload}>Upload</button>

				{progress.started && <progress max="100" value={progress.pc}></progress>}

				<div className="predicted-video">
					{video ? (
						<div className="predicted-video">
							<video
								class="video-js"
								controls
								preload="auto"
								width="100%"
								height="70%"
							><source src={video} type="video/mp4" /></video>
						</div>
					) : (
						<div>no video yet</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Upload;