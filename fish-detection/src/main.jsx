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
import DropDown from './Dropdown.jsx';
import Progressbar from './progressbar.jsx';
import Carousel from './Carousel.jsx';



export default function Main() {
  return (
    <>
          <Upload />
          <Carousel />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);