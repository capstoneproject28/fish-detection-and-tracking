import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './components/App.jsx'
import Register from './components/RegisterScreen.jsx'
import './index.css'
import Upload from './Upload.jsx';
import Sidebar from './components/sidebar.jsx';
import SignInSignUp from './SignInSignUp.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import Lpage from './Lpage.jsx';
import ThreeModel from './ThreeModel.jsx';

import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.jsx';
import Mlalgo from './Mlalgo.jsx';
import AnalyticsScreen from './AnalyticsScreen.jsx';


export default function Main() {
  return (
    <>
     <div className="main-container">
        <Navbar />
        <div className="content">
          <AnalyticsScreen />
        </div>
    </div>
    </>
    /*
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={ <App /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
    */
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);