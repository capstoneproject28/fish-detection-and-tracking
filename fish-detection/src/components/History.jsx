import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../css/main.css'
import '../css/history.css'
import Navbar from '../designComponents/Navbar.jsx';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";


export default function History() {

	const [videoLinks, setVideoLinks] = useState([]);

	const username = "Adnan2510";

	useEffect(() => {
		const apiUrl = `http://127.0.0.1:8000/api/history/?username=${username}`;

		axios
			.get(apiUrl)
			.then((response) => {
				const processedData = response.data.videos.map((item) => {
					console.log("wororrkringgg");

					// Parse the result_name string into an object
					const resultNameObject = JSON.parse(item.result_name);
					console.log(resultNameObject);

					// Return a new object with the parsed result_name
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
		<>
			<div className="main-container">
				<Navbar />
				<div className="mainContent">
					<div className="historyList">
						<h1>Recent Uploads</h1>
						{videoLinks.map((video, index) => (
							<div className="historyEntry">
								<div className="historyEntryTopSection">
									<div className="historyVideoSection">
										<video src={video.url} className="videoEntry" controls preload="auto"></video>
									</div>
									<div className="historyInfoSection">
										<h2>{video.filename}</h2>
										<h3>View analytics</h3>
									</div>
								</div>
								<div className="historyEntryBottomSection">
									<Bar
										data={{
											// Name of the variables on x-axies for each bar

											labels: [...Object.values(video.result_name)],
											datasets: [
												{
													// Label for bars
													label: "prediction/specie name",
													// Data or value of your each variable

													data: [...Object.keys(video.result_name)],
													// Color of each bar
													backgroundColor: ["aqua", "green", "red", "yellow"],
													// Border color of each bar
													borderColor: ["aqua", "green", "red", "yellow"],
													borderWidth: 0.5,
												},
											],
										}}
										// Height of graph
										height={350}
										options={{
											maintainAspectRatio: false,
											scales: {
												yAxes: [
													{
														ticks: {
															// The y-axis value will start from zero
															beginAtZero: true,
														},
													},
												],
											},
											legend: {
												labels: {
													fontSize: 15,
												},
											},
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}