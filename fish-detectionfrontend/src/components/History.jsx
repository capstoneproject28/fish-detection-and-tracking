import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../css/main.css'
import '../css/history.css'
import Navbar from '../designComponents/Navbar.jsx';
import Chart from "chart.js/auto";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';


export default function History() {

	//video history 
	const [videoLinks, setVideoLinks] = useState([]);

	//hide & show analytics for each entry
	const [analyticsVisible, setAnalyticsVisible] = useState([false]);

	//chart data
	var chartData = {};

	const username = localStorage.getItem('username');

	useEffect(() => {
		const apiUrl = `http://127.0.0.1:8000/api/history/?username=${username}`;

		axios
			.get(apiUrl)
			.then((response) => {
				console.log("heres the data");
				console.log(response);
				console.log("/data");

				const processedData = response.data.videos.map((item) => {

					// Parse the result_name string into an object
					const resultNameObject = JSON.parse(item.result_name);

					// Return a new object with the parsed result_name
					return {
						...item,
						result_name: resultNameObject,
					};
				});
				setVideoLinks(processedData);

				console.log(processedData);

				setAnalyticsVisible(new Array(processedData.length).fill(false));
			})
			.catch((error) => {
				console.error("Error fetching video links:", error);
			});
	}, [username]);

	function viewAnalytics(index) {
		var copiedAnalytics = JSON.parse(JSON.stringify(analyticsVisible));

		copiedAnalytics[index] = !copiedAnalytics[index];
		setAnalyticsVisible(copiedAnalytics);
	}

	return (
		<>
			<div className="main-container">
				<Navbar />
				<div className="mainContent">
					<div className="historyList">
						<h1>Recent Uploads</h1>
						{videoLinks.map((video, index) => (
							
						<div className = "historyEntry" >
							<div className="historyEntryTopSection">
								<div className="historyVideoSection">
									<video src={video.url} className="videoEntry" controls preload="auto"></video>
								</div>
								<div className="historyInfoSection">
									<h2>{video.filename}</h2>
									<h3 className="viewAnalyticsText" id={"analyticsButton." + index} onClick={() => viewAnalytics(index)}>View analytics</h3>
								</div>
							</div>
							<div className={analyticsVisible[index] ? 'historyEntryBottomSection' : 'historyEntryBottomSection hidden'}>
								<BarChart width={600} height={300} data={chartData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="species" label={{ value: 'Species', position: 'insideBottom', offset: 0 }} />
									<YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 10 }} />
									<Tooltip />
									<Bar dataKey="count" fill="#8884d8" />
								</BarChart>
							</div>
						</div>
						))}
				</div>
			</div>
		</div >
		</>
	);
}