import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import Register from './components/RegisterScreen.jsx'

import Upload from './Upload.jsx';
import Sidebar from './components/sidebar.jsx';
import SignInSignUp from './SignInSignUp.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import Lpage from './Lpage.jsx';

import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.jsx';
import Mlalgo from './Mlalgo.jsx';
import AnalyticsScreen from './AnalyticsScreen.jsx';
import DropDown from './Dropdown.jsx';
import Progressbar from './progressbar.jsx';
import Carousel from './Carousel.jsx';
import Experience from './Experience.jsx';
import Fish from './Fish.jsx';

import { Canvas } from '@react-three/fiber'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
<Main/>
);

export default function Main() {
  return (
    <>
      <App />
    </>
     /*
     <div className="main-container">
        <Navbar />
        <div className="content">
          <AnalyticsScreen />
        </div>
    </div>
    */
    /*
    
    <Lpage />
    <Upload />
    <Mlalgo />
    <DropDown />

    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={ <App /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
    */
  );
}

