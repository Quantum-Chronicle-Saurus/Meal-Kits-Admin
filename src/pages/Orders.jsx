import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Orders = () => {
  const today = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Wireless Mouse",
      productImage: "https://via.placeholder.com/100", // Mock image URL
      customer: {
        name: "John Doe",
        address: "123 Main St, Springfield",
        email: "john.doe@example.com",
        phone: "123-456-7890",
      },
      quantity: 2,
      date: today,
      paymentMethod: "Credit Card",
      price: 50.0,
      status: "Pending",
    },
    {
      id: 2,
      productName: "Keyboard",
      productImage: "https://via.placeholder.com/100", // Mock image URL
      customer: {
        name: "Jane Smith",
        address: "456 Oak Lane, Metropolis",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
      },
      quantity: 1,
      date: today,
      paymentMethod: "PayPal",
      price: 75.0,
      status: "Shipped",
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

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
                <th className="p-3 border-b-2 text-left min-w-[150px]">Product</th>
                <th className="p-3 border-b-2 text-left min-w-[250px]">Customer Info</th>
                <th className="p-3 border-b-2 text-center min-w-[100px]">Quantity</th>
                <th className="p-3 border-b-2 text-center min-w-[150px]">Date</th>
                <th className="p-3 border-b-2 text-left min-w-[150px]">Payment</th>
                <th className="p-3 border-b-2 text-center min-w-[100px]">Price</th>
                <th className="p-3 border-b-2 text-center min-w-[100px]">Status</th>
                <th className="p-3 border-b-2 text-center min-w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="p-3 border-b flex items-center gap-3 ">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-35 h-35 border-b"
                    />
                    <p>{order.productName}</p>
                  </td>
                  <td className="p-3  border-b">
                    <p>
                      <strong>Name:</strong> {order.customer.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.customer.address}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.customer.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.customer.phone}
                    </p>
                  </td>
                  <td className="p-3 border-b text-center">{order.quantity}</td>
                  <td className="p-3 border-b text-center">{order.date}</td>
                  <td className="p-3 border-b">{order.paymentMethod}</td>
                  <td className="p-3 border-b text-center">${order.price.toFixed(2)}</td>
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






