import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from "react";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <Router>
      <ToastContainer />

      <div className="flex flex-col min-h-screen">
        {/* Show Navbar and Sidebar only after login */}
        <Navbar />
        <div className="flex flex-grow">
          {/* <Sidebar /> */}
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/loginAdmin" element={<Login setToken={setToken}/>} />

              <Route path="/" element={<Home />} />

              <Route path="/add" element={<AddItems token={token}/>} />
              <Route path="/list" element={<ListItems />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
