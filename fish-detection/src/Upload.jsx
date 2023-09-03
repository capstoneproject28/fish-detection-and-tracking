import { useState } from 'react'
import axios from 'axios'
import './App.css'

function Upload() {

const [file, setFile] = useState(null)
const [progress, setProgress] = useState({started: false, pc: 0})
const [msg, setMsg] = useState(null)

function handleUpload(){
    if(!file){
        setMsg("No file selected")
        return;
    }

    const fd = new FormData()
    fd.append('file', file)
    setMsg("Uploading...")
    setProgress(prevState => {
        return{...prevState, started: true}
    })
    axios.post('http://httpbin.org/post', fd, {
        onUploadProgress: (progressEvent)=> { 
            setProgress(prevState => {
                return{ ...prevState, pc: progressEvent.progress*100}
            })
        }, headers: {
            "Custom-header" : "value",
        }
    })
    .then(res => {
        setMsg("Upload successfull");
        console.log(res.data);
    })
    .catch(err => {
        setMsg("Upload failed");
        console.error(err);
    })
}
return(
    <div class="uploadBox">
      <h1>Upload video</h1>
      <input onChange={ (e)=> {setFile(e.target.files[0])}} type="file" />

      <button onClick={handleUpload}>Upload</button>

      {progress.started && <progress max = "100" value= {progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </div>
  );
}

export default Upload;