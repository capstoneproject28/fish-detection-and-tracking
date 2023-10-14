import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from 'react-dom/client'

//Import page components
const SignInSignUp = React.lazy(() => import('./components/SignInSignUp.jsx'));
const History = React.lazy(() => import('./components/History.jsx'));
const Upload = React.lazy(() => import('./components/Upload.jsx'));
const Mlalgo = React.lazy(() => import('./Mlalgo.jsx'));
const Parallax = React.lazy(() => import('./Parallax.jsx'));
//Authentication
const Authentication = React.lazy(() => import('./components/Authentication.jsx'));

const root = ReactDOM.createRoot(document.getElementById('root'));

import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
  let navigate = useNavigate();
  let isAuthenticated = localStorage.getItem('uid');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}


root.render(
	<Main />
);

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/" element={<Parallax />} />
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="mlalgo" element={<Mlalgo />} />
          <Route path="history" element={<History />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


