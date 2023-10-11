import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from 'react-dom/client'
import Experience from './Experience.jsx';

//Import page components
const SignInSignUp = React.lazy(() => import('./components/SignInSignUp.jsx'));
const History = React.lazy(() => import('./components/History.jsx'));
const Upload = React.lazy(() => import('./Upload.jsx'));
const Analytics = React.lazy(() => import('./AnalyticsScreen.jsx'));
const Lpage = React.lazy(() => import('./Lpage.jsx'));
const mlalgo = React.lazy(() => import('./Mlalgo.jsx'));
const Fpage = React.lazy(() => import('./Fpage.jsx'));
const App = React.lazy(() => import('./App.jsx'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Main />
);

export default function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<SignInSignUp />} />
				<Route path="/mlalgo" element={<mlalgo />} />
				<Route path="/lpage" element={<Lpage />} />
				<Route path="/history" element={<History />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/analytics" element={<Analytics />} />
			</Routes>
		</BrowserRouter>
	);
}

