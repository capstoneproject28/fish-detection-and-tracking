import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../css/main.css'
import '../css/history.css'
import Navbar from '../designComponents/Navbar.jsx';

export default function History() {

	return (
		<>
			<div className="main-container">
				<Navbar />
				<div className="mainContent">
					<div className="historyEntry"></div>
					<div className="historyEntry"></div>
					<div className="historyEntry"></div>
					<div className="historyEntry"></div>
					<div className="historyEntry"></div>
				</div>
			</div>
		</>
	);
}