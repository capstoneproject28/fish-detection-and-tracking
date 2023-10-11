import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from 'react-dom/client'

//Import page components
const SignInSignUp = React.lazy(() => import('./components/SignInSignUp.jsx'));
const History = React.lazy(() => import('./components/History.jsx'));
const Upload = React.lazy(() => import('./Upload.jsx'));
const Analytics = React.lazy(() => import('./AnalyticsScreen.jsx'));
const Lpage = React.lazy(() => import('./Lpage.jsx'));
const Mlalgo = React.lazy(() => import('./Mlalgo.jsx'));
const App = React.lazy(() => import('./App.jsx'));
const Parallax = React.lazy(() => import('./Parallax.jsx'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Main />
);

export default function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Parallax />} />
				<Route path="/app" element={<App />} />
				<Route path="/sign" element={<SignInSignUp />} />
				<Route path="/mlalgo" element={<Mlalgo />} />
				<Route path="/lpage" element={<Lpage />} />
				<Route path="/" element={<History />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/analytics" element={<Analytics />} />
			</Routes>
		</BrowserRouter>
	);
}

