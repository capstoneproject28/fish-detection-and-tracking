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

	const [uploading, setUploading] = useState(false);

	async function handleUpload() {
		if (!file) {
			setMsg("No file selected")
			return;
		}

		setUploading(true);

		const fd = new FormData()
		const uid = localStorage.getItem('uid');
		const username = localStorage.getItem('username');

		fd.append("file", file);
		fd.append("uid", uid);
		fd.append("username", username);
		fd.append("file", file)

		await axios
			.post("http://127.0.0.1:8000/api/detect/", fd)
			.then(() => {
				navigation.navigate("/history");
			})
			.catch((error) => {
				console.error("Error posting file path:", error);
			});
	}
	return (
		<>
			<Navbar />
			<div className="mainContent">
				<div className="uploadBox">
					<div className={uploading ? 'hidden' : ''}>
						<h1>Upload video</h1>
						<input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />

						<button onClick={handleUpload}>Upload</button>

						{progress.started && <progress max="100" value={progress.pc}></progress>}
					</div>
					<div className={uploading ? '' : 'hidden'}>
						Uploading
					</div>
				</div>
			</div>
		</>
	);
}

export default Upload;