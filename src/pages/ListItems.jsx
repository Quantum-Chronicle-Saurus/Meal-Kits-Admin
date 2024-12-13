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
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

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
      image: null,
    });
    setPreviewImage(product.image[0]);
  };

  const saveProduct = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", editingProduct);
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("category", editForm.category);
      formData.append("categoryGroup", editForm.categoryGroup);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      const response = await axios.put(
        `${backendUrl}/product/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Main-category</b>
          <b>Sub-category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) =>
          editingProduct === item._id ? (
            <div
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border"
              key={index}
            >
              <div className="flex flex-col items-center">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-16 h-16 object-cover mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={editForm.categoryGroup}
                  onChange={(e) =>
                    setEditForm({ ...editForm, categoryGroup: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </div>
              <div className="flex justify-center gap-2 items-center">
                <button
                  onClick={saveProduct}
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded-sm w-16"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-sm w-16"
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
