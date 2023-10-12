import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

function FishesPerFrame(jsonData) {
    // Extract the number of fishes for each frame and filter out frames with 0 fishes
    const frameData = jsonData.frames
        .map(frame => ({
            frame: frame.frame.split('Trim_')[1], // Extract only the number after "Trim_"
            count: frame.fish.length
        }))
        .filter(data => data.count > 0); // Exclude frames with 0 fishes

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

export default FishesPerFrame;