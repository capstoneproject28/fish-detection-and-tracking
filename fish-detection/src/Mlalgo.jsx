import React from 'react'
import "./css/Mlalgo.css"
import Navbar from './designComponents/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
  { name: 'YOLO', accuracy: 89, speed: 95 },
  { name: 'CNN', accuracy: 67, speed: 75 },
  { name: 'RNN', accuracy: 70, speed: 80 },
  { name: 'RCNN', accuracy: 48, speed: 50 }
];

export default function Mlalgo(){
    return (
      <div className="main-container">
        <div className="Navbar">
            <Navbar />
        </div>
        
        <div className="content-container">
            <div className="content-body">
              <h1>Machine Learning Algorithms at AquaVision</h1>
                <div className="algorithm-container">
                    <section className="algorithm" id="yolo">
                      <h3>YOLO (You Only Look Once)</h3>
                      <br/>
                      <p>
                        YOLO is a real-time object detection algorithm that is incredibly fast and accurate. It's perfect for scenarios where performance and speed are essential.
                      </p><br/><br/>
                      <div className="accuracy-container">
                          <div className="accuracy-bar" style={{ width: '89%' }}></div>
                      </div>
                        <p className="accuracy-text">89% Accuracy</p>
                        <div className="speed-container">
                          <div className="speed-bar" style={{ width: '89%' }}></div>
                      </div>
                        <p className="accuracy-text">89% Speed</p>
                    </section>
              
                    <section className="algorithm" id="cnn">
                      <h3>CNN (Convolutional Neural Networks)</h3>
                      <br/>
                      <p>
                        CNNs are primarily used for image classification tasks and are highly effective in understanding the spatial hierarchies in images. They provide a good balance between accuracy and speed.
                      </p>
                      <div className="accuracy-container">
                          <div className="accuracy-bar" style={{ width: '67%' }}></div>
                      </div>
                        <p className="accuracy-text">67% Accuracy</p>
                        <div className="speed-container">
                          <div className="speed-bar" style={{ width: '89%' }}></div>
                      </div>
                        <p className="accuracy-text">89% Speed</p>
                    </section>
              
                    <section className="algorithm" id="rnn">
                      <h3>RNN (Recurrent Neural Networks) - In Development</h3>
                      <br/>
                      <p>
                        RNNs are powerful for sequences and lists, making them highly advantageous for time-series analysis. However, they are still in the development phase at AquaVision.
                      </p>
                      <div className="accuracy-container">
                          <div className="accuracy-bar" style={{ width: '70%' }}></div>
                      </div>
                        <p className="accuracy-text">70% Accuracy</p>
                        <div className="speed-container">
                          <div className="speed-bar" style={{ width: '89%' }}></div>
                      </div>
                        <p className="accuracy-text">89% Speed</p>
                    </section>
              
                    <section className="algorithm" id="rcnn">
                      <h3>RCNN (Region-based Convolutional Neural Networks) - In Development</h3>
                      <br/>
                      <p>
                        RCNNs are excellent for object detection and segmentation but are currently under development to optimize their performance and speed for AquaVision.
                      </p>
                      <div className="accuracy-container">
                          <div className="accuracy-bar" style={{ width: '48%' }}></div>
                      </div>
                        <p className="accuracy-text">48% Accuracy</p>
                        <div className="speed-container">
                          <div className="speed-bar" style={{ width: '89%' }}></div>
                      </div>
                        <p className="accuracy-text">89% Speed</p>
                    </section>
                    </div>
                </div>
                <div className="chart-container">
                  <div style={{ margin: "40px 0" }}>
                    <BarChart width={900} height={400} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                      <Bar dataKey="speed" fill="#82ca9d" name="Speed" />
                    </BarChart>
                  </div>
                </div>
              </div>
      </div>
      );
}
