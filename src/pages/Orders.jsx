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

  const fetchUserById = async (_id) => {
    try {
      const response = await axios.post(
        backendUrl + "/admin/getUserById",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.username;
    } catch (error) {
      console.error(error);
      return "Unknown User";
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

        const usernamesMap = {};

        for (const order of orders) {
          if (order.userId) {
            usernamesMap[order.userId] = await fetchUserById(order.userId);
          }
        }

        setUsernames(usernamesMap);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 bg-gray-200 text-sm font-bold py-2 px-3">
        <div className="min-w-[25px] max-w-[25px] overflow-hidden text-ellipsis whitespace-nowrap">
          #
        </div>
        <div className="col-span-2">Customer Info</div>
        <div>User</div>
        <div>Date</div>
        <div>Payment</div>
        <div>Total Price</div>
        <div>Status</div>
      </div>
      {orders.map((order, index) => (
        <div
          key={order._id}
          className="grid grid-cols-8 md:grid-cols-8 sm:grid-cols-4 text-sm items-center py-2 px-3 border-b hover:bg-gray-100"
        >
          <div>{index + 1}</div>
          <div className="col-span-2 text-left">
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
          </div>
          <div>{usernames[order.userId] || "Loading..."}</div>
          <div>{formatDate(order.date)}</div>
          <div>{order.paymentMethod}</div>
          <div>
            {currency} {order.totalPrice}
          </div>
          <div>
            <select
              className="px-2 py-1 border border-gray-300 rounded"
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
