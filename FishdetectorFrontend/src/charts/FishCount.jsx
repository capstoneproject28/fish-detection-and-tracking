import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

function FishCount(jsonData) {
    // Extract and aggregate fish data by species
    const speciesCount = jsonData.frames.reduce((acc, frame) => {
        frame.fish.forEach(fish => {
            acc[fish.species] = (acc[fish.species] || 0) + 1;
        });
        return acc;
    }, {});

    // Convert the aggregated data to an array format suitable for recharts
    const chartData = Object.entries(speciesCount).map(([species, count]) => ({ species, count }));

    return (
        <div>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis interval={0} height={100} dataKey="species" angle={-45} textAnchor="end" tick={{ fontSize: 8 }}label={{ value: 'Species', position: 'insideBottom', offset: 0 }} />
                <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default FishCount;
