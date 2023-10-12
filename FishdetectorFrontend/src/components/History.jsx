import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../css/main.css'
import '../css/history.css'
import Navbar from '../designComponents/Navbar.jsx';

//Charts
import FishesPerFrame from '../charts/FishesPerFrame.jsx';
import SpeciesCount from '../charts/UniqueFish.jsx';
import FishCount from '../charts/FishCount.jsx';


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

				const processedData = response.data.videos.map((item) => {

					// Parse the result_name string into an object
					const resultNameObject = JSON.parse(item.result_name);

					// Return a new object with the parsed result_name
					return {
						...item,
						result_name: resultNameObject,
					};
				});
				setVideoLinks(processedData.reverse());

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
							
						<div className="historyEntry">
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
								<h1>Fish Per Frame</h1>
								<div className="graphDiv">
									{FishesPerFrame(videoLinks[index].result_name)}
								</div>
								<h1>Unique Fish Species</h1>
								<div className="graphDiv">
									{SpeciesCount(videoLinks[index].result_name)}
								</div>
								<h1>Species Count</h1>
								<div className="graphDiv">
									{FishCount(videoLinks[index].result_name)}
								</div>
							</div>
						</div>
						))}
				</div>
			</div>
		</div >
		</>
	);
}