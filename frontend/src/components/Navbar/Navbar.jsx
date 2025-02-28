import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/Deallure.png"; // Adjust path if necessary

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md shadow-purple-500/10 z-50 flex justify-between items-center py-4 px-8 h-16"> 
      {/* Left Logo Image */}
      <div className="flex items-center">
        <img 
          src={logo}  
          alt="Deallure Logo"
          className="h-31 max-h-full w-auto object-contain" // Larger logo without increasing navbar height
        />
      </div>

      {/* Navbar Items (Centered) */}
      <ul className="flex gap-8 flex-grow justify-center">
        {/* Features Dropdown */}
        <li
          className="relative group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="text-white text-lg transition-colors duration-300 hover:text-purple-400 cursor-pointer">
            Features
          </span>

          {/* Animated Dropdown */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white w-56 rounded-lg shadow-lg shadow-purple-500/30 py-2 border border-white/20"
            >
              <Link
                to="/home"
                className="flex items-center px-4 py-2 hover:bg-purple-600 transition text-center whitespace-nowrap"
              >
                {/* White Professional Icon */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3502/3502512.png"
                  alt="Track Product"
                  className="w-5 h-5 object-contain filter invert mr-2"
                />
                Track Your Product
              </Link>
              <div className="px-4 py-2 text-sm text-purple-300 text-center">
                More features coming soon...
              </div>
            </motion.div>
          )}
        </li>

        {/* Subscriptions with Expanded Alert Box */}
        <li className="relative group">
          <a href="#" className="text-white text-lg transition-colors duration-300 hover:text-purple-400">
            Subscriptions
          </a>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="hidden group-hover:flex absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-purple-500/30 backdrop-blur-md border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-center"
          >
            Stay tuned for exciting updates! 🚀
            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white/10"></span>
          </motion.span>
        </li>

        <li>
          <a href="#about-me" className="text-white text-lg transition-colors duration-300 hover:text-purple-400">
            About Us
          </a>
        </li>
      </ul>

      {/* Login/Signup Buttons (Right-Aligned) */}
      <div className="flex gap-4 ml-auto">
        <Link to="/login">
          <button className="border border-white text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-purple-500 hover:border-purple-500">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-purple-500 border border-purple-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-purple-500">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
