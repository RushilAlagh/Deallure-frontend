import React from "react";

// 1. Correct Image Imports
import Ajio from "../../assets/Ajio.png";
import Amazon from "../../assets/amazon.jpg";
import Flipkart from "../../assets/flipkart.jpg";
import Nykaa from "../../assets/nykaa.png";
import Nike from "../../assets/nike.jpg";

const brandImages = [
  { name: "Ajio", src: Ajio, url: "https://www.ajio.com" },
  { name: "Amazon", src: Amazon, url: "https://www.amazon.in" },
  { name: "Flipkart", src: Flipkart, url: "https://www.flipkart.com" },
  { name: "Nykaa", src: Nykaa, url: "https://www.nykaa.com" },
  { name: "Nike", src: Nike, url: "https://www.nike.com" },
];

export const InfiniteCarousel = () => {
  const duplicatedLogos = [...brandImages, ...brandImages, ...brandImages, ...brandImages];

  return (
    <section className="w-full py-20 bg-white/50 backdrop-blur-md overflow-hidden border-y border-slate-100 relative">
      
      {/* 💥 WE INJECT THE CSS KEYFRAMES DIRECTLY HERE 💥 */}
      <style>
        {`
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .custom-marquee {
            display: flex;
            width: max-content;
            animation: infiniteScroll 30s linear infinite;
          }
          .custom-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-100 inline-block px-4 py-1.5 rounded-full border border-slate-200">
          Trusted by millions across top stores
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Faded edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        {/* We apply the custom class we defined in the <style> tag above */}
        <div className="custom-marquee flex-nowrap shrink-0 gap-16 py-4 items-center">
          {duplicatedLogos.map((brand, i) => (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center shrink-0 w-32 md:w-44 h-20 md:h-24 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 ease-out bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 hover:-translate-y-1"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="max-w-[70%] max-h-[70%] object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteCarousel;