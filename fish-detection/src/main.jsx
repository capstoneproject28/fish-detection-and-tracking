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


export default function Main() {
  return (
    <>
    <Navbar />
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