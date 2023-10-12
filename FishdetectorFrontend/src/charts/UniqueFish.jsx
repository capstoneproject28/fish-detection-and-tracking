import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

function SpeciesCount(jsonData) {
    // Extract unique species from all frames
    const uniqueSpecies = new Set();
    jsonData.frames.forEach(frame => {
        frame.fish.forEach(fish => {
            uniqueSpecies.add(fish.species);
        });
    });

    // Convert the set of unique species to an array format suitable for recharts
    const chartData = Array.from(uniqueSpecies).map(species => ({ species, count: 1 }));

    // Define colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ payload }) => payload.species}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {
                        chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default SpeciesCount;
