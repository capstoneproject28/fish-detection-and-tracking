import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { CSVLink } from 'react-csv';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './css/analytics.css'
import './css/main.css'
import Navbar from './designComponents/Navbar.jsx';
import Mlalgo from './Mlalgo.jsx';

import axios from "axios";	

const AnalyticsScreen = () => {

	const username = "Adnan2510";

	useEffect(() => {
		const apiUrl = `http://127.0.0.1:8000/api/history/?username=${username}`;

		axios
			.get(apiUrl)
			.then((response) => {
				console.log(response);

				const processedData = response.data.videos.map((item) => {
					// Parse the result_name string into an object
					const resultNameObject = JSON.parse(item.result_name);
					console.log(resultNameObject);

					// Return a new object with the parsed result_name
					return {
						...item,
						result_name: resultNameObject,
					};
				});
				//setVideoLinks(processedData);
			})
			.catch((error) => {
				console.error("Error fetching video links:", error);
			});
	}, [username]);

	return (
		<div className="main-container">
			<Navbar />
			<div className="mainContent">
				<div className="quarter">
					<h1>Video Title</h1>
					<h2>Upload date</h2>
					<h2>Description</h2>
				</div>
				<div style={{ justifyContent: "center" }} className="quarter">
					<video controls style={{ width: "80%" }} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"></video>
				</div>
				<div className="quarter">
					<h1>Video Analytics</h1>
				</div>
				<div className="quarter">
					<h1>Video Analytics</h1>
				</div>
			</div>
		</div>

	);
};

export default AnalyticsScreen;
