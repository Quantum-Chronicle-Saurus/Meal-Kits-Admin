import { useState } from "react";
import Sidebar from "../components/Sidebar";

const ListItems = () => {
  // Mock data สำหรับสินค้า
  const initialItems = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of product 1",
      price: 100,
      image: "https://via.placeholder.com/150", // รูปภาพสำหรับสินค้า
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of product 2",
      price: 200,
      image: "https://via.placeholder.com/150", // รูปภาพสำหรับสินค้า
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of product 3",
      price: 300,
      image: "https://via.placeholder.com/150", // รูปภาพสำหรับสินค้า
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedImage, setEditedImage] = useState(null);

  // ฟังก์ชันแก้ไขข้อมูลสินค้า
  const handleEdit = (item) => {
    setEditingItem(item);
    setEditedName(item.name);
    setEditedDescription(item.description);
    setEditedPrice(item.price);
    setEditedImage(item.image);
  };

  const handleSaveEdit = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: editedName,
              description: editedDescription,
              price: editedPrice,
              image: editedImage,
            }
          : item
      )
    );
    setEditingItem(null); // หยุดการแก้ไข
  };

  // ฟังก์ชันลบข้อมูลสินค้า
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
    <div className="container mx-auto px-4 py-6 bg-gray-100 ">
      <h2 className="text-2xl font-bold mb-4">List of Items</h2>

      {editingItem ? (
        <div className="mb-4 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            placeholder="Product Name"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            placeholder="Product Description"
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            placeholder="Price"
          />
          <input
            type="text"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            placeholder="Image URL"
          />
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingItem(null)}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
  );
};

export default ListItems;



