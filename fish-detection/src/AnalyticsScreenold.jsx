import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { CSVLink } from 'react-csv';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './css/analytics.css'
import './css/main.css'
import Navbar from './designComponents/Navbar.jsx';
import Mlalgo from './Mlalgo.jsx';

const AnalyticsScreen = () => {
	const playerRef = useRef(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const graphData = [
		{ name: '0s', 'Fish Count': 10 },
		{ name: '5s', 'Fish Count': 20 },
		{ name: '10s', 'Fish Count': 15 },
		// ... add more data
	];

	const toggleFullscreen = () => {
		if (playerRef.current) {
			const player = playerRef.current;
			if (player) {
				const wrapper = player.wrapper;
				if (wrapper.requestFullscreen) {
					wrapper.requestFullscreen();
				} else if (wrapper.mozRequestFullScreen) {
					wrapper.mozRequestFullScreen();
				} else if (wrapper.webkitRequestFullscreen) {
					wrapper.webkitRequestFullscreen();
				} else if (wrapper.msRequestFullscreen) {
					wrapper.msRequestFullscreen();
				}
			}
			setIsFullscreen(!isFullscreen);
		}
	};

	return (
		<div className="main-container">
			<Navbar />
			<div className="mainContent">
				<div className="analytics-screen">
					<h1>Video Analytics</h1>

					<div className="video-section">
						<ReactPlayer
							ref={playerRef}
							url="https://www.youtube.com/watch?v=6HSfLTvRwDM"
							width="100%"
							height="100%"
							controls
						/>
						<button onClick={toggleFullscreen}>Toggle Fullscreen</button>
						<br></br> <br />
						<a href="https://www.youtube.com/watch?v=6HSfLTvRwDM" download>
							<button>Download video </button>
						</a>
					</div>

					<div className="graph-section">
						<h2>Graph Data</h2>
						<BarChart width={500} height={300} data={graphData}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
							<Bar type="monotone" dataKey="Fish Count" fill="#8884d8" barSize={30} />
						</BarChart>
						<CSVLink data={graphData.map(obj => Object.values(obj))} filename={"graph-data.csv"}>
							<button >Download Graph Data as CSV</button>
						</CSVLink>
					</div>
				</div>
			</div>
		</div>

	);
};

export default AnalyticsScreen;
