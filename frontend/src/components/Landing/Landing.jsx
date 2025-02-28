import React, { useEffect } from "react";
import Navbar from "/src/components/Navbar/Navbar";
import Carousel from "/src/components/Carousel/Carousel";

const Landing = () => {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    handleHashScroll(); // Handle initial page load
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-purple-300 text-center">
      <Navbar /> {/* ✅ Navbar stays at the top */}

      {/* Shifted text even further down using pt-40 */}
      <div className="mt-20 pt-40"> 
        <h1 className="text-4xl font-bold mb-3">Track Product Prices in Real-Time</h1>
        {/* Keeping the reduced gap between text and carousel */}
        <p className="text-lg text-purple-400 mb-4">Stay ahead of price drops and get the best deals.</p>
      </div>

      {/* Semi-Circular Carousel Section */}
      <div className="mt-4">
        <Carousel />
      </div>

      {/* About Me Section */}
      <div id="about-me" className="w-full bg-gray-800 py-8 mt-20 border-t-2 border-purple-600 text-center">
        <h2 className="text-3xl text-purple-400">About Us</h2>
        <p className="text-lg text-purple-300 mt-2 px-4">
          Welcome to <b>Deallure</b>! We are committed to helping you track product prices effortlessly. 
          Our platform ensures you never miss out on a great deal.
        </p>
      </div>
    </div>
  );
};

export default Landing;
