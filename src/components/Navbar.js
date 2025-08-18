import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-black bg-opacity-30">
      <h1 className="text-3xl font-bold tracking-widest drop-shadow-lg">🇪🇸 LangLearner</h1>
      <div>
        <button className="bg-white text-red-600 px-4 py-2 rounded-xl font-semibold mr-2 hover:bg-gray-200 shadow">
          Login
        </button>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 shadow">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
