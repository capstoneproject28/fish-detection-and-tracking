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

    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
        // ... additional colors as previously provided
    ];

    const renderCustomLabel = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        // Split the species name at the space character
        const splitAt = payload.species.lastIndexOf(' ', 15); // Find last space before character 15
        let text1, text2;
        if (splitAt !== -1) {
            text1 = payload.species.slice(0, splitAt);
            text2 = payload.species.slice(splitAt + 1);
        } else {
            text1 = payload.species;
            text2 = null;
        }
    
        return (
            <text x={x} y={y} fill="black" textAnchor={"middle"} dominantBaseline="central">
                <tspan x={x} dy="0">{text1}</tspan>
                {text2 && <tspan x={x} dy="1.2em">{text2}</tspan>}
            </text>
        );
    };    

    return (
        <div>
            <PieChart width={600} height={600}>
                <Pie
                    data={chartData}
                    cx={300}
                    cy={300}
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={250}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {
                        chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
        </div>
    );
}

export default SpeciesCount;
