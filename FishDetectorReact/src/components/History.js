import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

function FishesPerFrame({ result_name }) {
    console.log("Original data:", result_name);
    // Extract the number of fishes for each frame and filter out frames with 0 fishes
    const frameData = result_name.frames
        .map(frame => ({
            frame: frame.frame.split('Trim_')[1], // Extract only the number after "Trim_"
            count: frame.fish.length
        }))
        .filter(data => data.count > 0); // Exclude frames with 0 fishes
    console.log(frameData);
    // Sort the frames in ascending order by their number
    frameData.sort((a, b) => parseInt(a.frame) - parseInt(b.frame));

    return (
        <div>
            <BarChart width={800} height={400} data={frameData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frame" label={{ value: 'Frame', position: 'insideBottom', offset: 0 }} />
                <YAxis label={{ value: 'Number of Fishes', angle: -90, position: 'insideLeft', offset: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

const History = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/api/history/?username=${username}`;

        axios
            .get(apiUrl)
            .then((response) => {
                const processedData = response.data.videos.map((item) => {
                    const resultNameObject = JSON.parse(item.result_name);
                    return {
                        ...item,
                        result_name: resultNameObject,
                    };
                });
                setVideoLinks(processedData);
            })
            .catch((error) => {
                console.error("Error fetching video links:", error);
            });
    }, [username]);

    return (
        <Container>
            <Row>
                <h1>Your History of detected videos!</h1>
                <h3>
                    For username: <span style={{ color: "yellow" }}>{username}</span>
                </h3>
            </Row>
            <br />
            <br />

            <h2>Your Videos</h2>

            {videoLinks.map((video, index) => (
                <Row key={index}>
                    <Col md={6}>
                        <div className="predicted-video">
                            <video class="video-js" controls preload="auto" width="100%" height="70%">
                                <source src={video.url} type="video/mp4" />
                            </video>
                        </div>
                    </Col>

                    <Col md={6}>
                        <FishesPerFrame result_name={video.result_name} />
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default History;
