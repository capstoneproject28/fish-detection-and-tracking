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

    axios.post('http://httpbin.org/post', fd, {
        onUploadProgress: (progressEvent)=> { 
            console.log(progressEvent.progressEvent*100)
        }, headers: {
            "Custom-header" : "value",


        }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
}
return(
    <div className='App'>
      <h1>Upload video</h1>
      <input onChange={ (e)=> {setFile(e.target.files[0])}} type="file" />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;