import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectPage from "./components/DetectPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import History from "./components/History";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path="/detect" element={<DetectPage />} />
            <Route exact path="/" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/history" element={<History />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
