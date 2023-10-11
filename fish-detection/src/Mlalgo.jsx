import React from 'react'
import "./css/Mlalgo.css"
import Navbar from './designComponents/Navbar';

export default function Mlalgo(){
    return (
      <div className="main-container">
        <div className="Navbar">
            <Navbar />
        </div>
        <div className="content-container">
            <h1>Machine Learning Algorithms at AquaVision</h1>
            
            <section className="algorithm" id="yolo">
              <h2>YOLO (You Only Look Once)</h2>
              <p>
                YOLO is a real-time object detection algorithm that is incredibly fast and accurate. It's perfect for scenarios where performance and speed are essential.
              </p>
            </section>
      
            <section className="algorithm" id="cnn">
              <h2>CNN (Convolutional Neural Networks)</h2>
              <p>
                CNNs are primarily used for image classification tasks and are highly effective in understanding the spatial hierarchies in images. They provide a good balance between accuracy and speed.
              </p>
            </section>
      
            <section className="algorithm" id="rnn">
              <h2>RNN (Recurrent Neural Networks) - In Development</h2>
              <p>
                RNNs are powerful for sequences and lists, making them highly advantageous for time-series analysis. However, they are still in the development phase at AquaVision.
              </p>
            </section>
      
            <section className="algorithm" id="rcnn">
              <h2>RCNN (Region-based Convolutional Neural Networks) - In Development</h2>
              <p>
                RCNNs are excellent for object detection and segmentation but are currently under development to optimize their performance and speed for AquaVision.
              </p>
            </section>
        </div>
      </div>
      );
}
