import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "฿";

const formatDate = (dateString) => {
  return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ฟังก์ชันดึงชื่อผู้ใช้ตาม userId
  const fetchUserById = async (_id) => {
    try {
      console.log(_id);
      const response = await axios.post(
        backendUrl + "/admin/getUserById",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data.username; // return ชื่อผู้ใช้
    } catch (error) {
      console.log(error);
      return "Unknown User"; // ในกรณีเกิดข้อผิดพลาด
    }
  };

  const fetchOrderList = async () => {
    try {
      const response = await axios.get(backendUrl + "/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const orders = response.data.orders.reverse();
        setOrders(orders);

        // ดึงข้อมูล username สำหรับแต่ละ order
        const usernamesMap = {};

        for (const order of orders) {
          if (order.userId) {
            usernamesMap[order.userId] = await fetchUserById(order.userId);
          }
          console.log("usernameMap", usernamesMap);
        }

        setUsernames(usernamesMap); // เก็บชื่อผู้ใช้ใน state
        console.log("usernameMap", usernames);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const updateStatus = async (id, newStatus) => {
  //   try {
  //     const response = await axios.put(
  //       `${backendUrl}/order/${id}/status`,
  //       { status: newStatus },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (response.data.success) {
  //       setOrders((prev) =>
  //         prev.map((order) =>
  //           order._id === id ? { ...order, status: newStatus } : order
  //         )
  //       );
  //       toast.success("Status updated successfully!");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 transition-all ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-4 text-white bg-blue-500 rounded-full fixed top-4 left-4 z-50"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg ">
            <thead>
              <tr>
                <th className="p-3 border-b-2 text-center min-w-[25px]">#</th>
                <th className="p-3 border-b-2 text-left min-w-[250px]">
                  Customer Info
                </th>
                <th className="p-3 border-b-2 text-center min-w-[150px]">
                  User
                </th>
                {/* <th className="p-3 border-b-2 text-center min-w-[100px]">
                  Quantity
                </th> */}
                <th className="p-3 border-b-2 text-center min-w-[150px]">
                  Date
                </th>
                <th className="p-3 border-b-2 text-left min-w-[150px]">
                  Payment
                </th>
                <th className="p-3 border-b-2 text-center min-w-[100px]">
                  Total Price
                </th>
                <th className="p-3 border-b-2 text-center min-w-[100px]">
                  Status
                </th>
                <th className="p-3 border-b-2 text-center min-w-[150px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="p-3  border-b text-right">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-3 border-b ">
                    <p>
                      <strong>Name:</strong> {order.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.address}
                    </p>
                  </td>
                  <td className="p-3 border-b text-center ">
                    <p>{usernames[order.userId] || "Loading..."}</p>
                  </td>
                  {/* <td className="p-3 border-b text-center">{order.quantity}</td> */}
                  <td className="p-3 border-b text-center">
                    {formatDate(order.date)}
                  </td>
                  <td className="p-3 border-b">{order.paymentMethod}</td>
                  <td className="p-3 border-b text-center">
                    {order.totalPrice}
                  </td>
                  <td className="p-3 border-b text-center">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border-b text-center">
                    <select
                      className="px-2 py-1 border border-gray-300 rounded"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
