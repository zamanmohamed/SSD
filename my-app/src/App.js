import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import Worker from "./Pages/Worker";
import Manager from "./Pages/Manager";
import Admin from "./Pages/Admin";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/worker" element={<Worker />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
