import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "฿";

const ListItems = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    categoryGroup: "",
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/product/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      categoryGroup: product.categoryGroup,
    });
  };

  const saveProduct = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/product/edit",
        { id: editingProduct, ...editForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Main-category</b>
          <b>Sub-category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}
        {list.map((item, index) =>
          editingProduct === item._id ? (
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-2 py-1 px-2 border"
              key={index}
            >
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="border p-1"
              />
              <input
                type="text"
                value={editForm.categoryGroup}
                onChange={(e) =>
                  setEditForm({ ...editForm, categoryGroup: e.target.value })
                }
                className="border p-1"
              />
              <input
                type="text"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="border p-1"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                className="border p-1"
              />

              {/* ปุ่ม Save และ Cancel อยู่ในคอลัมน์เดียวกัน */}
              <div className="col-span-2 flex justify-center gap-2 mt-2">
                <button
                  onClick={saveProduct}
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={index}
            >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.categoryGroup}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => editProduct(item)}
                  className="text-sm px-2 py-1 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-sm px-2 py-1 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ListItems;
