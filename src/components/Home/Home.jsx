import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "/src/components/Navbar/Navbar";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const Home = () => {
  const [productLink, setProductLink] = useState("");
  const [priceThreshold, setPriceThreshold] = useState("");
  const [timeoutPeriod, setTimeoutPeriod] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("Please sign in first to start tracking.");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/products/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, productURL: productLink, threshold: priceThreshold, timeout: timeoutPeriod }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to start tracking");
      setMessage("Tracking activated! We'll email you when the price drops.");
      setProductLink(""); setPriceThreshold(""); setTimeoutPeriod("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearMessages = () => { if (error) setError(""); if (message) setMessage(""); };

  const inputClass = "w-full px-5 py-4 rounded-xl bg-[#F7F7F7] border border-[#0A0A0A]/10 text-[15px] text-[#0A0A0A] placeholder:text-[#BBB] font-semibold focus:outline-none focus:border-[#FF6200] focus:ring-2 focus:ring-[#FF6200]/15 transition-all";

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]" style={SG}>
      <Navbar />

      {/* Dark hero header */}
      <div className="relative bg-[#0A0A0A] overflow-hidden pt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 block">New Alert</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Add a price tracker
          </h1>
          <p className="text-[#888] font-medium text-base">
            Paste a product link, set your target, and we'll take care of the rest.
          </p>
        </div>
        <div className="relative z-20">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-10 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-[#0A0A0A]/08 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Alert banners */}
          <AnimatePresence>
            {(error || message) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`mx-6 mt-6 p-4 rounded-xl flex items-center justify-between text-sm font-bold`}
                style={error
                  ? { background: "#FEF2F2", border: "1px solid #FECACA", color: "#EF4444" }
                  : { background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#22C55E" }
                }
              >
                <span>{error || message}</span>
                <button onClick={() => { setError(""); setMessage(""); }} className="text-lg leading-none opacity-60 hover:opacity-100 ml-3">×</button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} onChange={clearMessages} className="p-6 md:p-8 space-y-6">
            {/* URL */}
            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.12em]">Product URL</label>
              <input type="url" required value={productLink} onChange={e => setProductLink(e.target.value)}
                placeholder="https://www.amazon.in/dp/..." className={inputClass} />
              <p className="text-xs text-[#aaa] mt-2 font-medium">Supports Amazon, Flipkart, Ajio, Nike, Nykaa, and more.</p>
            </div>

            {/* Price + Duration row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.12em]">Target Price (₹)</label>
                <input type="number" required min="1" value={priceThreshold} onChange={e => setPriceThreshold(e.target.value)}
                  placeholder="999" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.12em]">Track for (months)</label>
                <input type="number" required min="1" max="12" value={timeoutPeriod} onChange={e => setTimeoutPeriod(e.target.value)}
                  placeholder="3" className={inputClass} />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
            >
              {isSubmitting
                ? <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Setting up tracker…
                  </span>
                : "Start Tracking →"
              }
            </button>
          </form>

          {/* Footer note */}
          <div className="px-8 py-4 border-t border-[#0A0A0A]/06 bg-[#FAFAFA] text-center">
            <p className="text-xs text-[#aaa] font-medium">
              We check prices daily and email you when the price drops.{" "}
              <span className="font-bold" style={{ color: "#FF6200" }}>Free, always.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;