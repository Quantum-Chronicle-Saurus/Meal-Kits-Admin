import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const AddItems = ({ token }) => {
  console.log("AddItems component rendered");
  console.log(token);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categoryGroup, setCategoryGroup] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [size, setSize] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("description", description || "");
      formData.append("longDescription", longDescription || "");
      formData.append("price", price || 0);
      formData.append("category", category || "");
      formData.append("categoryGroup", categoryGroup || "");
      formData.append("ingredients", ingredients || "");
      formData.append("size", size || "");
      formData.append("nutrition", nutrition || "");
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post(backendUrl + "/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setLongDescription("");
        setPrice("");
        setCategory("");
        setCategoryGroup("");
        setIngredients("");
        setSize("");
        setNutrition("");
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Main Content */}
      <div className="mt-10 flex-1 items-center justify-center px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 pt-10 pb-10 w-full max-w-[90%] sm:max-w-[800px] min-h-[650px] mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Add New Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Long Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Long Description
              </label>
              <input
                type="text"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Enter long description"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="boil">Boil</option>
                <option value="stir_fry">Stir Fry</option>
                <option value="curry">Curry</option>
                <option value="deep_fly">Deep Fry</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            {/* Category Group */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category Group
              </label>
              <select
                value={categoryGroup}
                onChange={(e) => setCategoryGroup(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="" disabled>
                  Select Category Group
                </option>
                <option value="MealKits">MealKits</option>
                <option value="PreparedAndReady">PreparedAndReady</option>
              </select>
            </div>
            {/* Ingredients */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ingredients
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Size */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter size"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Nutrition */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nutrition
              </label>
              <input
                type="text"
                value={nutrition}
                onChange={(e) => setNutrition(e.target.value)}
                placeholder="Enter nutrition info"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Image */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddItems;
