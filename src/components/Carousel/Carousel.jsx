import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Import images correctly
import Ajio from '../../assets/Ajio.png';
import Amazon from '../../assets/amazon.jpg';
import Flipkart from '../../assets/flipkart.jpg';
import Nykaa from '../../assets/nykaa.png';
import Nike from '../../assets/nike.jpg';

// Using the imported images
const brandImages = [Ajio, Amazon, Flipkart, Nykaa, Nike];

// Adding corresponding brand URLs
const brandUrls = {
  "Ajio": "https://www.ajio.com",
  "Amazon": "https://www.amazon.com",
  "Flipkart": "https://www.flipkart.com",
  "Nykaa": "https://www.nykaa.com",
  "Nike": "https://www.nike.com"
};

const InfiniteCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Create a duplicated array of images for infinite scrolling effect
  const allImages = [...brandImages, ...brandImages, ...brandImages];

  // Continuous scrolling effect
  useEffect(() => {
    const scrollSpeed = 0.5; // Reduced for a smoother premium feel
    let animationFrameId;
    let lastTime = 0;
    
    const animate = (time) => {
      if (lastTime !== 0 && !isPaused) {
        const deltaTime = time - lastTime;
        
        // Update scroll position
        setScrollPosition(prevPosition => {
          const newPosition = prevPosition + scrollSpeed;
          
          // Reset when we've scrolled the width of the original set of images
          const totalWidth = brandImages.length * 340;
          if (newPosition >= totalWidth) {
            return 0;
          }
          
          // Update active index based on scroll position
          setActiveIndex(Math.floor(newPosition / 340) % brandImages.length);
          
          return newPosition;
        });
      }
      
      lastTime = time;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);
  
  // Apply the scroll position
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  // Handle mouse interactions
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Error handling for images
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/320/200?text=Image+Not+Found";
    e.target.className = "w-full h-full object-cover bg-purple-700";
  };

  // Get brand name from image path
  const getBrandName = (imagePath) => {
    return imagePath.split('/').pop().split('.')[0];
  };

  // Get brand URL from brand name
  const getBrandUrl = (brandName) => {
    return brandUrls[brandName] || "#"; // Fallback to # if URL not found
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 inline-block">
            Featured Brands
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Add product links from various brands
          </p>
        </motion.div>
        
        {/* Enhanced glass-morphism navigation buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-purple-600/40 backdrop-blur-md text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-purple-500/60 transition-all duration-300 border border-purple-400/30"
          onClick={() => {
            const newPosition = Math.max(scrollPosition - 340, 0);
            setScrollPosition(newPosition);
            setActiveIndex(Math.floor(newPosition / 340) % brandImages.length);
          }}
          style={{ left: "10px" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-purple-600/40 backdrop-blur-md text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-purple-500/60 transition-all duration-300 border border-purple-400/30"
          onClick={() => {
            const newPosition = (scrollPosition + 340) % (brandImages.length * 340);
            setScrollPosition(newPosition);
            setActiveIndex(Math.floor(newPosition / 340) % brandImages.length);
          }}
          style={{ right: "10px" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </motion.button>
        
        {/* Enhanced carousel container with modern glass effect */}
        <div 
          className="relative overflow-hidden mx-16 rounded-2xl border border-purple-500/20 shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image track - No scrollbar */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden w-full backdrop-blur-sm bg-gray-900/60 p-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allImages.map((img, index) => {
              const brandName = getBrandName(img);
              const brandUrl = getBrandUrl(brandName);
              
              return (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 h-52 rounded-xl overflow-hidden shadow-xl relative group"
                  whileHover={{ 
                    scale: 1.03, 
                    zIndex: 20,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur border border-purple-500/20 rounded-xl">
                    {/* Brand logo/image with improved styling */}
                    <img
                      src={img}
                      alt={`Brand ${index % brandImages.length + 1}`}
                      className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      onError={handleImageError}
                    />
                    
                    {/* Improved overlay with brand name and clickable Shop Now link */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                      <p className="text-purple-300 font-bold text-lg">{brandName}</p>
                      <a 
                        href={brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 text-sm inline-block hover:text-purple-300 transition-colors duration-300 hover:underline"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Enhanced fade effect on left side */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          
          {/* Enhanced fade effect on right side */}
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
        
        {/* Enhanced scroll indicator dots */}
        <div className="flex justify-center mt-8 gap-2">
          {brandImages.map((_, index) => (
            <button 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8" 
                  : "bg-gray-600 hover:bg-gray-500 w-2"
              }`}
              onClick={() => {
                setScrollPosition(index * 340);
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
        
        {/* Added subtle animated decoration */}
        <div className="absolute -bottom-8 left-0 right-0 h-16 opacity-30 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
        <div className="absolute -top-8 left-1/4 w-32 h-32 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute -bottom-16 right-1/4 w-48 h-48 rounded-full bg-pink-600/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;