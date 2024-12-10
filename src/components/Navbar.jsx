import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    alert("Logged out (Mock)!");
  };

  return (
    <div className="flex items-center justify-between py-2 px-[4%] bg-white shadow-md">
      <img className="w-[max(8%,80px)]" src="/logoFlavor.png" alt="Logo" />
      <p className="flex justify-center text-xl font-medium text-gray-600 px-5 py-2 sm:px-7 sm:py-2">
        Admin Panel
      </p>
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm hover:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

