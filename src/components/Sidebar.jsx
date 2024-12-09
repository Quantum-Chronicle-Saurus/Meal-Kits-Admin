import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-4  w-[150px] p-4 ">
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `py-2 px-4 rounded  hover:bg-gray-300 ${
            isActive ? "bg-gray-400 text-white " : ""
          }`
        }
      >
        Add Items
      </NavLink>
      <NavLink
        to="/list"
        className={({ isActive }) =>
          `py-2 px-4 rounded hover:bg-gray-300 ${
            isActive ? "bg-gray-400 text-white " : ""
          }`
        }
      >
        List Items
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `py-2 px-4 rounded hover:bg-gray-300 ${
            isActive ? "bg-gray-400 text-white" : ""
          }`
        }
      >
        Orders
      </NavLink>
    </nav>
  );
};

export default Sidebar;