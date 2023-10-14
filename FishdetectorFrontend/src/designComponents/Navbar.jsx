import React, { useState } from 'react'
import "../css/sidebar.css"

export default function Navbar() {
	const [isActive, setIsActive] = useState(true);

	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	}

	const toggleSection = () => {
		setIsActive(!isActive);
	};

	const navigationLinks = [
		{
			href: '/upload',
			iconClass: 'fa-solid fa-cloud-arrow-up',
			text: 'Upload',
		},
		{
			href: '/history',
			iconClass: 'fa-solid fa-clock-rotate-left',
			text: 'History',
		},
		{
			href: '/mlalgo',
			iconClass: 'fa-regular fa-lightbulb',
			text: 'Algorithms',
			count: 'Tips'
		},
		{
			onClick: logout,
			iconClass: 'fa-solid fa-right-from-bracket',
			text: 'Logout',
		}
	];

	return (
		<>
			<section className={isActive ? 'active' : ''}>
				<div className="button" onClick={toggleSection}>
					<i className="fa-solid fa-bars" />
				</div>
				<div className="sidebar">
					<div className="profile">
						<div className="pro_img">
							<img src="./src/assets/logoMin.png" alt="profile_picture" />
						</div>
						<div className="pro_info">
							<p>Logged in as</p>
							<h3>{localStorage.getItem("username")}</h3>
						</div>
					</div>
					<ul>
						{navigationLinks.map((link, index) => (
							<li key={index}>
								<a 
									href={link.href || '#'} 
									className={link.isActive ? 'active' : ''}
									onClick={link.onClick}
								>
									<span className="icon">
										<i className={link.iconClass} />
									</span>
									<span className="item">{link.text}</span>
									{link.count && <span className="count">{link.count}</span>}
								</a>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	)
}