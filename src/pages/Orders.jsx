import { useState } from "react";

const Orders = () => {
  // Mock data สำหรับรายการสั่งซื้อ
  const initialOrders = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      image: "https://via.placeholder.com/150", // รูปภาพ
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 2,
      image: "https://via.placeholder.com/150", // รูปภาพ
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 1,
      image: "https://via.placeholder.com/150", // รูปภาพ
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const increaseQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      )
    );
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const decreaseQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id && order.quantity > 1
          ? { ...order, quantity: order.quantity - 1 }
          : order
      )
    );
  };

  // ฟังก์ชันลบสินค้าออกจากคำสั่งซื้อ
  const removeItem = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  // คำนวณราคาทั้งหมด
  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.price * order.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">${order.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => decreaseQuantity(order.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md mr-2"
                >
                  -
                </button>
                {order.quantity}
                <button
                  onClick={() => increaseQuantity(order.id)}
                  className="px-2 py-1 bg-gray-300 rounded-md ml-2"
                >
                  +
                </button>
              </td>
              <td className="px-4 py-2">${order.price * order.quantity}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => removeItem(order.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* การแสดงผลรวมของคำสั่งซื้อทั้งหมด */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Total: ${calculateTotal()}</h3>
        <button className="px-6 py-2 bg-green-500 text-white rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Orders;
