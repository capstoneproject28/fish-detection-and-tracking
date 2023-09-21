//import './App.css'
import React from 'react';
import Sidebar from './sidebar.jsx'
import Upload from '../Upload.jsx';

function App() {

  return (
	<>
	<div className="app">
		<Sidebar />
		<div class="mainContent">
			<Upload />
		</div>
	</div>
	</>
  )

}

export default App;
