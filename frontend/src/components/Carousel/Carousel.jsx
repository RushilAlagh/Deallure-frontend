import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Using the asset paths from your system
const brandImages = [
  "/src/assets/Ajio.png",
  "/src/assets/Amazon.jpg",
  "/src/assets/Flipkart.jpg",
  "/src/assets/Nykaa.png",
  "/src/assets/Nike.jpg",
];

const InfiniteCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  
  // Create a duplicated array of images for infinite scrolling effect
  const allImages = [...brandImages, ...brandImages, ...brandImages];

  // Continuous scrolling effect
  useEffect(() => {
    const scrollSpeed = 1; // Pixels per frame - adjust for faster/slower scrolling
    let animationFrameId;
    let lastTime = 0;
    
    const animate = (time) => {
      if (lastTime !== 0) {
        const deltaTime = time - lastTime;
        
        // Update scroll position
        setScrollPosition(prevPosition => {
          const newPosition = prevPosition + scrollSpeed;
          
          // Reset when we've scrolled the width of the original set of images
          const totalWidth = brandImages.length * 340;
          if (newPosition >= totalWidth) {
            return 0;
          }
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
  }, []);
  
  // Apply the scroll position
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  // Error handling for images
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/320/200?text=Image+Not+Found";
    e.target.className = "w-full h-full object-cover bg-purple-700";
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-12 overflow-hidden mt-16">
      <div className="max-w-6xl mx-auto px-12 relative">
        <motion.h2 
          className="text-center text-white text-3xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Brands
        </motion.h2>
        
        {/* Fixed Nav Buttons - Always on top with high z-index */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-500 transition"
          onClick={() => setScrollPosition(prev => Math.max(prev - 340, 0))}
          style={{ left: "0px" }}
        >
          ❮
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-500 transition"
          onClick={() => setScrollPosition(prev => (prev + 340) % (brandImages.length * 340))}
          style={{ right: "0px" }}
        >
          ❯
        </motion.button>
        
        {/* Carousel container */}
        <div className="relative overflow-hidden mx-16">
          {/* Image track - No scrollbar */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allImages.map((img, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 h-52 bg-gradient-to-br from-purple-800 to-purple-600 rounded-xl overflow-hidden shadow-xl"
                whileHover={{ 
                  scale: 1.05, 
                  zIndex: 20,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                  {/* Brand logo/image */}
                  <img
                    src={img}
                    alt={`Brand ${index % brandImages.length + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  
                  {/* Overlay with brand name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white font-bold">
                      {img.split('/').pop().split('.')[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fade effect on left side */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          
          {/* Fade effect on right side */}
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
