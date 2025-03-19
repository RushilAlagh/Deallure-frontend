import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "/src/components/Navbar/Navbar";

const Home = () => {
  const [productLink, setProductLink] = useState("");
  const [priceThreshold, setPriceThreshold] = useState("");
  const [timeoutPeriod, setTimeoutPeriod] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      setError("User not logged in. Please log in first.");
      setIsSubmitting(false);
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
      
      // Reset input fields
      setProductLink("");
      setPriceThreshold("");
      setTimeoutPeriod("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear error or success message when user starts typing
  const clearMessages = () => {
    if (error) setError("");
    if (message) setMessage("");
  };

  // Floating price tags animation - adaptive to screen size
  const PriceTag = ({ delay, duration, x, y, scale, rotate }) => (
    <motion.div
      className="absolute text-purple-300/20 text-4xl font-bold"
      initial={{ opacity: 0, x, y, rotate, scale }}
      animate={{ 
        opacity: [0, 0.7, 0],
        y: y - 100,
        rotate: rotate + 10,
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 5
      }}
    >
      $
    </motion.div>
  );
  
  // Adjust number of background elements based on screen size
  const bgElementCount = windowDimensions.width < 768 ? 8 : 15;
  
  // Number of price tags based on screen size
  const priceTagCount = windowDimensions.width < 768 ? 5 : 10;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          {/* Animated background elements - responsive quantity */}
          {[...Array(bgElementCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500"
              initial={{
                width: Math.random() * (windowDimensions.width < 768 ? 100 : 200) + 50,
                height: Math.random() * (windowDimensions.width < 768 ? 100 : 200) + 50,
                x: Math.random() * windowDimensions.width,
                y: Math.random() * windowDimensions.height,
                opacity: 0.1,
              }}
              animate={{
                x: [
                  Math.random() * windowDimensions.width,
                  Math.random() * windowDimensions.width,
                ],
                y: [
                  Math.random() * windowDimensions.height,
                  Math.random() * windowDimensions.height,
                ],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 60 + 30,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating price tags - responsive quantity */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(priceTagCount)].map((_, i) => (
          <PriceTag 
            key={i}
            delay={Math.random() * 5}
            duration={Math.random() * 5 + 10}
            x={Math.random() * windowDimensions.width}
            y={Math.random() * windowDimensions.height + 300}
            scale={Math.random() * 0.5 + 0.7}
            rotate={Math.random() * 40 - 20}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Hero Section - More responsive spacing */}
          <motion.div
            className="text-center mb-8 md:mb-12 mt-4 md:mt-8 px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-block relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Price Drop Alerts
              </h1>
              <motion.div 
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-purple-600 text-white text-xs px-2 py-1 rounded-full transform rotate-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 10, 
                  delay: 0.9 
                }}
              >
                NEW
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-base md:text-xl text-purple-200 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Get notified when products drop to your target price
            </motion.p>
          </motion.div>

          {/* Form Card - Full width on mobile */}
          <motion.div
            className="w-full max-w-xl backdrop-blur-md bg-gray-900/60 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Card Header with responsive icon */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 md:p-6 relative">
              <div className="flex items-center">
                <div className="bg-white/10 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Price Tracker</h2>
                  <p className="text-purple-200 text-xs md:text-sm">Never miss a price drop again</p>
                </div>
              </div>
              
              {/* Decorative elements - responsive spacing */}
              <div className="absolute -bottom-3 left-0 w-full h-6 flex justify-around">
                {[...Array(windowDimensions.width < 768 ? 6 : 8)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-900/60 transform translate-y-1/2"></div>
                ))}
              </div>
            </div>

            {/* Error or Success Messages */}
            {error && (
              <motion.div 
                className="bg-red-900/80 text-red-200 p-3 md:p-4 border-l-4 border-red-500 text-sm md:text-base"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                ❌ {error}
              </motion.div>
            )}
            
            {message && (
              <motion.div 
                className="bg-green-900/80 text-green-200 p-3 md:p-4 border-l-4 border-green-500 text-sm md:text-base"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {message}
              </motion.div>
            )}

            {/* Form - responsive padding */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6" onChange={clearMessages}>
              {/* Product Link */}
              <div className="space-y-1 md:space-y-2">
                <label className="block text-base md:text-lg font-medium text-purple-300">Product URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    required
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                    placeholder="https://example.com/product"
                    className="w-full pl-10 p-3 md:p-4 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 group-hover:border-purple-500/70 text-sm md:text-base"
                  />
                  <motion.span 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300/70 text-xs hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: productLink ? 0 : 0.7 }}
                  >
                    Paste product URL here
                  </motion.span>
                </div>
                <p className="text-xs text-purple-400 pl-2">Works with Amazon, eBay, Walmart, and more</p>
              </div>

              {/* Form Grid for Price and Timeout - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* Price Threshold */}
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-base md:text-lg font-medium text-purple-300">Target Price ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-purple-400 text-sm md:text-base">$</span>
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      value={priceThreshold}
                      onChange={(e) => setPriceThreshold(e.target.value)}
                      placeholder="99.99"
                      className="w-full pl-10 p-3 md:p-4 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm md:text-base"
                    />
                    <motion.div 
                      className="absolute -right-2 -top-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: priceThreshold ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    >
                      ${priceThreshold}
                    </motion.div>
                  </div>
                  <p className="text-xs text-purple-400 pl-2">We'll notify you below this price</p>
                </div>

                {/* Timeout Period */}
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-base md:text-lg font-medium text-purple-300">Duration (Months)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      max="12"
                      value={timeoutPeriod}
                      onChange={(e) => setTimeoutPeriod(e.target.value)}
                      placeholder="3"
                      className="w-full pl-10 p-3 md:p-4 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm md:text-base"
                    />
                  </div>
                  <p className="text-xs text-purple-400 pl-2">Track for up to 12 months</p>
                </div>
              </div>

              {/* Submit Button with pulse effect - responsive padding */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-base md:text-lg font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg relative overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <div className="relative">
                    <span className="relative z-10">Start Price Tracking</span>
                    <motion.span 
                      className="absolute -right-10 top-1/2 transform -translate-y-1/2 hidden md:block"
                      animate={{ 
                        x: [-5, -10, -5],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.span>
                    
                    {/* Pulse effect on button */}
                    <motion.span 
                      className="absolute inset-0 bg-white rounded-lg"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0, 0.15, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                )}
              </motion.button>
            </form>

            {/* How It Works - Footer */}
            <div className="bg-gray-800/40 p-3 md:p-4 border-t border-purple-700/30">
              <div className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-300 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs md:text-sm text-purple-300">
                  We'll check prices daily and email you when the price drops below your target.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards - Stack on mobile, adjust spacing */}
          <motion.div 
            className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Feature 1 */}
            <div className="bg-gray-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-purple-500/10 rounded-full group-hover:scale-150 transition-all duration-700"></div>
              <div className="bg-purple-600/20 p-2 md:p-3 rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Instant Alerts</h3>
              <p className="text-xs md:text-sm text-purple-200">Get notifications instantly via email when prices drop below your target threshold.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-purple-500/10 rounded-full group-hover:scale-150 transition-all duration-700"></div>
              <div className="bg-purple-600/20 p-2 md:p-3 rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Save Money</h3>
              <p className="text-xs md:text-sm text-purple-200">Never pay full price again. Our users save an average of 15% on their tracked purchases.</p>
            </div>
          </motion.div>

          {/* Interactive Counter - responsive layout */}
          <motion.div
            className="mt-8 md:mt-16 bg-gray-800/40 backdrop-blur-sm px-6 py-4 md:px-8 md:py-6 rounded-xl border border-purple-500/20 flex flex-col sm:flex-row items-center gap-4 md:gap-6 mx-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-purple-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                5,280+
              </motion.div>
              <div className="text-xs md:text-sm text-purple-400">Active Trackers</div>
            </div>
            
            <div className="w-full sm:w-px h-px sm:h-12 bg-purple-700/30"></div>
            
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-purple-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
              >
                $342K
              </motion.div>
              <div className="text-xs md:text-sm text-purple-400">Saved by Users</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;