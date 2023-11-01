import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "../Components/LaunchPage";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Components/Home";
import Meditations from "../Components/Meditations";
import Profile from "../Components/Profile";
import Community from "../Components/Community";
import SingleMeditation from "../Components/SingleMeditation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meditations" element={<Meditations />} />
        <Route path="/single_meditation" element={<SingleMeditation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
