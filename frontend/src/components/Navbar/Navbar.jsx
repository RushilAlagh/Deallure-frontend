import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md shadow-purple-500/10 z-50 flex justify-between items-center py-4 px-8">
      <div className="text-xl font-bold text-purple-400">Deallure</div>

      <ul className="flex gap-8 flex-grow justify-center">
        <li className="relative group">
          <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-purple-400">
            Features
          </a>
          <span className="hidden group-hover:flex items-center justify-center absolute top-full left-1/2 transform -translate-x-1/2 bg-white/10 text-white px-8 py-2 min-w-[280px] rounded-lg text-sm font-semibold shadow-md shadow-purple-500/30 backdrop-blur-md border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            🚀 Exciting features coming soon!
            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white/10"></span>
          </span>
        </li>
        <li className="relative group">
          <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-purple-400">
            Subscriptions
          </a>
          <span className="hidden group-hover:flex items-center justify-center absolute top-full left-1/2 transform -translate-x-1/2 bg-white/10 text-white px-8 py-2 min-w-[280px] rounded-lg text-sm font-semibold shadow-md shadow-purple-500/30 backdrop-blur-md border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            ✨ Stay tuned for updates!
            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white/10"></span>
          </span>
        </li>
        <li>
          <a href="#about-me" className="text-white text-lg transition-colors duration-300 hover:text-purple-400">
            About Us
          </a>
        </li>
      </ul>

      <div className="flex gap-4 ml-auto">
        <button className="border border-white text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-purple-500 hover:border-purple-500">
          Login
        </button>
        <button className="bg-purple-500 border border-purple-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-purple-500">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
