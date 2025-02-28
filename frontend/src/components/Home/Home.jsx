import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "/src/components/Navbar/Navbar";

const Home = () => {
  const [productLink, setProductLink] = useState("");
  const [priceThreshold, setPriceThreshold] = useState("");
  const [timeoutPeriod, setTimeoutPeriod] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      setError("User not logged in. Please log in first.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/products/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          productLink,
          priceThreshold,
          timeoutPeriod,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to store product tracking details");
      }
  
      setMessage("✅ Product details stored successfully! Tracking is underway.");
      alert("✅ Product details stored successfully! Tracking is underway.");
  
      // Reset input fields
      setProductLink("");
      setPriceThreshold("");
      setTimeoutPeriod("");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <motion.div
      className="flex flex-col min-h-screen text-purple-300"
      initial={{ background: "linear-gradient(to right, #1a1a2e, #16213e)" }}
      animate={{ background: ["linear-gradient(to right, #1a1a2e, #16213e)", "linear-gradient(to right, #240046, #5a189a)"] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    >
      <Navbar />

      {/* Center Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center mt-10">
        {/* Static Heading */}
        <h1 className="text-4xl font-bold mb-2">Track Product Prices in Real-Time</h1>
        <p className="text-lg text-purple-400 mb-6">Enter the product details to start tracking!</p>

        {/* Animated Form Box */}
        <motion.div
          className="bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-lg shadow-purple-500/20 w-full max-w-xl px-6 sm:px-12"
          initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02, rotateX: 2 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Product Link */}
            <div>
              <label className="block text-purple-400 text-lg font-semibold mb-2">Product Link</label>
              <input
                type="url"
                required
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="Enter product link"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-xl focus:shadow-purple-500/40 transition-all duration-300"
              />
            </div>

            {/* Price Threshold (Min: 1) */}
            <div>
              <label className="block text-purple-400 text-lg font-semibold mb-2">Price Threshold ($)</label>
              <input
                type="number"
                required
                min="1"
                value={priceThreshold}
                onChange={(e) => setPriceThreshold(e.target.value)}
                placeholder="Enter threshold price"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-xl focus:shadow-purple-500/40 transition-all duration-300"
              />
            </div>

            {/* Timeout Period (Months) */}
            <div>
              <label className="block text-purple-400 text-lg font-semibold mb-2">Timeout Period (Months)</label>
              <input
                type="number"
                required
                min="1"
                max="12"
                value={timeoutPeriod}
                onChange={(e) => setTimeoutPeriod(e.target.value)}
                placeholder="Enter timeout period"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-xl focus:shadow-purple-500/40 transition-all duration-300"
              />
            </div>

            {/* Submit Button with Pulse Effect */}
            <motion.button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white text-lg font-semibold py-3 rounded-lg relative overflow-hidden transition-all duration-300 shadow-md shadow-purple-500/40"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Tracking 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
