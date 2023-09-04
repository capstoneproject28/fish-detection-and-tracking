import "./App.css";
import DetectPage from "./components/DetectPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/detect" element={<DetectPage />} />
            <Route exact path="/" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
