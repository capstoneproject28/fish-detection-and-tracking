import { useState } from 'react'
import "./css/main.css"

function Sidebar() {
	return (
		<div className="sidebar">
			<ul className="sidebarItems">
				<li className="sidebarItem">
					<img style={{ display: 'block', margin: '0 auto' }} width="60px" height="60px" src="./src/assets/logoMin.png" />
				</li>
				<li className="sidebarItem">
					<img style={{ display: 'block', margin: '0 auto' }} src="./src/assets/analytics.svg" width="30" height="30" />
				</li>
				<li className="sidebarItem Selected">
					<img style={{ display: 'block', margin: '0 auto' }} src="./src/assets/analytics.svg" width="30" height="30" />
				</li>
				<li className="sidebarItem">
					<img style={{ display: 'block', margin: '0 auto' }} src="./src/assets/analytics.svg" width="30" height="30" />
				</li>
				<li className="sidebarItem">
					<img style={{ display: 'block', margin: '0 auto' }} src="./src/assets/analytics.svg" width="30" height="30" />
				</li>
			</ul>
		</div>
	);
}

export default Sidebar
