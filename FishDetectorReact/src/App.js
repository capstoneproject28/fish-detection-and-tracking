import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectPage from "./components/DetectPage";
import AuthenticationPage from "./components/AuthenticationPage";  // <-- Importing the new component
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
            <Route exact path="/" element={<AuthenticationPage />} /> {/* Updated to use new component */}
            <Route path="/register" element={<AuthenticationPage />} /> {/* Updated to use new component */}
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
