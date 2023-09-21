import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './components/App.jsx'
import Register from './components/RegisterScreen.jsx'
import './index.css'
import Upload from './Upload.jsx';
import Sidebar from './components/sidebar.jsx';
import SignInSignUp from './SignInSignUp.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import Lpage from './Lpage.jsx';

export default function Main() {
  return (
    <>
    <Lpage />
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