import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Backend URL (ควรใช้จาก environment variable ใน production)
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
console.log(backendUrl);
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // Submit handler function
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // ส่ง request ไปยัง backend
      const response = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });

      // ตรวจสอบ response และแสดงผล
      if (response.data.success) {
        toast.success("Login successful!"); // แจ้งเตือนเมื่อ login สำเร็จ
        setToken(response.data.token); // เก็บ token
        navigate("/add");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);

      // // แสดงข้อความ error
      // if (error.response && error.response.data.message) {
      //   toast.error(error.response.data.message);
      // } else {
      //   toast.error("An unexpected error occurred. Please try again.");
      // }
    }
  };

  return (
    <div className="m-10 flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Email Address
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
