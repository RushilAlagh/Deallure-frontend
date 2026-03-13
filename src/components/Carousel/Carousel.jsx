import React from "react";
import { motion } from "framer-motion";

const brandImages = [
  { name: "Ajio", src: "/src/assets/Ajio.png", url: "https://www.ajio.com" },
  { name: "Amazon", src: "/src/assets/Amazon.jpg", url: "https://www.amazon.com" },
  { name: "Flipkart", src: "/src/assets/Flipkart.jpg", url: "https://www.flipkart.com" },
  { name: "Nykaa", src: "/src/assets/Nykaa.png", url: "https://www.nykaa.com" },
  { name: "Nike", src: "/src/assets/Nike.jpg", url: "https://www.nike.com" },
];

export const InfiniteCarousel = () => {
  // We duplicate the items a few times so the marquee scrolls seamlessly
  const duplicatedLogos = [...brandImages, ...brandImages, ...brandImages, ...brandImages];

  return (
    <section className="w-full py-20 bg-white/50 backdrop-blur-md overflow-hidden border-y border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-100 inline-block px-4 py-1.5 rounded-full border border-slate-200">
          Trusted by millions across top stores
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Left and Right faded edges for a sleek look */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex flex-nowrap shrink-0 gap-16 py-4 items-center"
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {duplicatedLogos.map((brand, i) => (
            <motion.a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center shrink-0 w-32 md:w-44 h-20 md:h-24 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 ease-out bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="max-w-[70%] max-h-[70%] object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">${brand.name}</span>`;
                }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteCarousel;