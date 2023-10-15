import axios from 'axios';
import '../css/main.css';
import '../css/upload.css';
import Navbar from '../designComponents/Navbar.jsx';
import { useState, useEffect } from 'react';
import DropDown from '../designComponents/Dropdown.jsx';

function Upload() {
	const [fileInput, setFileInput] = useState(null);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState({ started: false, pc: 0 });
	const [msg, setMsg] = useState(null);
	const [video, setVideo] = useState();
	const [uploading, setUploading] = useState(false);
	const [loadingText, setLoadingText] = useState('Uploading...');

	useEffect(() => {
		if (uploading && !progress.started) {
			const messages = ['Uploading...', 'Video is being analyzed...', 'This may take a while...'];
			let index = 0;
			const interval = setInterval(() => {
				index = (index + 1) % messages.length;
				setLoadingText(messages[index]);
			}, 10000);

			return () => clearInterval(interval);
		}
	}, [uploading, progress.started]);

	async function handleUpload() {
		if (!file) {
			setMsg("No file selected");
			return;
		}

		setUploading(true);

		const fd = new FormData();
		const uid = localStorage.getItem('uid');
		const username = localStorage.getItem('username');

		fd.append("file", file);
		fd.append("uid", uid);
		fd.append("username", username);

		await axios
			.post("http://127.0.0.1:8000/api/detect/", fd)
			.then(() => {
				// Add navigation logic here if you have a routing mechanism
				navigation.navigate("/history");
			})
			.catch((error) => {
				console.error("Error posting file path:", error);
				if (error.response && error.response.status === 400) {
					setMsg("Only video files allowed!"); // Display this message for a 400 error
				} else {
					setMsg("An error occurred. Please try again.");
				}
				setUploading(false);  // Stop the loader when there's an error
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
						<button className="uploadbutton" onClick={handleUpload}>Upload</button>
						{msg && <div className="errorMsg">{msg}</div>}
						<br /><br /><br />
						<DropDown />
						{progress.started && <progress max="100" value={progress.pc}></progress>}
					</div>
					<div className={uploading && !progress.started ? '' : 'hidden'}>
						<div className='spinner'></div>
						<p>{loadingText}</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Upload;