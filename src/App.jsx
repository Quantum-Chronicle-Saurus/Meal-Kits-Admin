import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // ใช้ useNavigate แทน

  // อัปเดต localStorage เมื่อ token เปลี่ยน
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(""); // รีเซ็ตค่า token ใน state
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage

    toast.success("You've logged out!"); // แจ้งเตือนว่าล็อกเอาต์สำเร็จ
    navigate("/loginAdmin"); // ใช้ navigate สำหรับเปลี่ยนเส้นทาง
  };

  // Protected Route สำหรับป้องกันการเข้าถึงหน้าโดยไม่ได้ล็อกอิน
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/loginAdmin" replace />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        {token && <Navbar handleLogout={handleLogout} />}
        <div className="flex flex-grow">
          {token && <Sidebar />}
          <div className="flex-grow p-4">
            <Routes>
              <Route
                path="/loginAdmin"
                element={<Login setToken={setToken} />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
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
    </>
  );
}

export default App;
