import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // อัปเดต localStorage เมื่อ token เปลี่ยน
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    // ลบ token จาก state และ localStorage
    setToken(""); // รีเซ็ตค่า token ใน state
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage

    // แจ้งเตือนว่าล็อกเอาต์สำเร็จ
    toast.success("You've logged out!");

    // นำผู้ใช้กลับไปที่หน้า Login
    Navigate("/loginAdmin");
  };
  // Protected Route สำหรับป้องกันการเข้าถึงหน้าโดยไม่ได้ล็อกอิน
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/loginAdmin" replace />;
    }
    return children;
  };

  return (
    <Router>
      {/* ToastContainer สำหรับแสดงข้อความแจ้งเตือน */}
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        {/* Navbar และ Sidebar จะถูกแสดงเฉพาะเมื่อผู้ใช้ล็อกอิน */}
        {token && <Navbar handleLogout={handleLogout} />}
        <div className="flex flex-grow">
          {token && <Sidebar />}
          <div className="flex-grow p-4">
            <Routes>
              {/* Route สำหรับ Login */}
              <Route
                path="/loginAdmin"
                element={<Login setToken={setToken} />}
              />

              {/* Route สำหรับหน้าแรก */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddItems token={token} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <ListItems token={token} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders token={token} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
