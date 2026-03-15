import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "/src/components/Navbar/Navbar";
import { Link } from "react-router-dom";

const DOMAIN_COLORS = {
  amazon:  { bg: "#FF9900", text: "#FFFFFF" },
  flipkart:{ bg: "#2874F0", text: "#FFFFFF" },
  ajio:    { bg: "#e53935", text: "#FFFFFF" },
  nykaa:   { bg: "#FC2778", text: "#FFFFFF" },
  nike:    { bg: "#111111", text: "#FFFFFF" },
  default: { bg: "#FF6200", text: "#FFFFFF" },
};

function getDomainColor(domain) {
  const d = domain.toLowerCase();
  return DOMAIN_COLORS[d] || DOMAIN_COLORS.default;
}

const ProductHistoryPage = () => {
  const [productHistory, setProductHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [filter, setFilter] = useState("all"); // all | monitoring | alerted

  useEffect(() => {
    const fetchProductHistory = async () => {
      setLoading(true);
      const email = localStorage.getItem("userEmail");
      if (!email) { setLoading(false); return; }
      try {
        const response = await fetch(`https://tc4d4uk8sf.execute-api.ap-south-1.amazonaws.com/dev/products/user-products?email=${email}`);
        const data = await response.json();
        if (response.ok) setProductHistory(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductHistory();
  }, []);

  const extractDomain = (url) => {
    try {
      const d = new URL(url).hostname.replace("www.", "");
      return d.split(".")[0].charAt(0).toUpperCase() + d.split(".")[0].slice(1);
    } catch { return "Product"; }
  };

  const handleDelete = async (id) => {
    setProductHistory(productHistory.filter((p) => p.Product_ID !== id));
    if (expandedProduct === id) setExpandedProduct(null);
  };

  const filtered = productHistory.filter(p => {
    if (filter === "monitoring") return !p.NotificationSent;
    if (filter === "alerted") return p.NotificationSent;
    return true;
  });

  const monitoringCount = productHistory.filter(p => !p.NotificationSent).length;
  const alertedCount = productHistory.filter(p => p.NotificationSent).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="flex gap-2">
            {["#FF6200","#FFD60A","#0057FF","#22C55E"].map((c, i) => (
              <span key={i} className="w-3 h-3 rounded-full animate-bounce"
                style={{ background: c, animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar />

      {/* ── Dark Hero Header ── */}
      <div className="relative bg-[#0A0A0A] overflow-hidden pt-20">
        {/* orange dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* orange glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: "#FF6200" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 pb-16">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">
                Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                My Trackers
              </h1>
              <p className="text-[#888] mt-2 font-medium text-base">
                {productHistory.length > 0
                  ? `${productHistory.length} product${productHistory.length > 1 ? "s" : ""} under surveillance`
                  : "No products tracked yet — start by adding one."}
              </p>
            </div>

            {/* Stats chips */}
            {productHistory.length > 0 && (
              <div className="flex items-center gap-4 flex-wrap">
                <div className="px-5 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-center min-w-[90px]">
                  <div className="text-2xl font-bold text-white">{monitoringCount}</div>
                  <div className="text-[10px] font-bold text-[#888] uppercase tracking-wider mt-0.5">Monitoring</div>
                </div>
                <div className="px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center min-w-[90px]">
                  <div className="text-2xl font-bold text-green-400">{alertedCount}</div>
                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-0.5">Alerted</div>
                </div>
                <Link
                  to="/home"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#0A0A0A] text-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
                  style={{ background: "#FF6200" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add New
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* bottom divider — scalloped white */}
        <div className="relative z-20">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-10 pb-24">

        {/* Filter tabs */}
        {productHistory.length > 0 && (
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[["all", "All"], ["monitoring", "Monitoring"], ["alerted", "Alerted"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
                style={filter === val
                  ? { background: "#FF6200", color: "#fff", boxShadow: "0 4px 14px rgba(255,98,0,0.3)" }
                  : { background: "#F5F5F5", color: "#666" }
                }
              >
                {label}
                {val !== "all" && (
                  <span className="ml-1.5 opacity-70">
                    {val === "monitoring" ? monitoringCount : alertedCount}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {productHistory.length === 0 ? (
          <motion.div
            className="text-center py-28 border-2 border-dashed border-[#0A0A0A]/10 rounded-3xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "#FF6200" }}
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Nothing here yet</h3>
            <p className="text-[#888] mb-8 font-medium">Add your first product to start tracking prices.</p>
            <Link
              to="/home"
              className="inline-block px-10 py-4 font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
            >
              Add a Product →
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                key="no-filter"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-16 text-[#999] font-medium"
              >
                No {filter} products.
              </motion.div>
            ) : (
              <motion.div className="space-y-4">
                {filtered.map((product, index) => {
                  const domain = extractDomain(product.Product_URL);
                  const color = getDomainColor(domain);
                  const isExpanded = expandedProduct === product.Product_ID;

                  return (
                    <motion.div
                      key={product.Product_ID}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group border border-[#0A0A0A]/08 rounded-2xl overflow-hidden hover:border-[#0A0A0A]/20 hover:shadow-xl transition-all duration-300"
                      style={{ background: "#FFFFFF" }}
                    >
                      {/* Card top — orange left stripe */}
                      <div
                        className="w-full h-1 transition-all duration-300"
                        style={{ background: product.NotificationSent ? "#22C55E" : "#FF6200" }}
                      />

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          {/* Domain badge + info */}
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            {/* Domain letter badge */}
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                              style={{ background: color.bg, color: color.text }}
                            >
                              {domain.charAt(0)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-[#0A0A0A]">{domain}</h3>
                                {/* Status badge */}
                                {product.NotificationSent ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Alert Sent
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FFF3E0", color: "#FF6200" }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                    Live
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#999] truncate font-medium">{product.Product_URL}</p>

                              {/* Metrics row */}
                              <div className="flex flex-wrap items-center gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#bbb] uppercase tracking-widest">Target</span>
                                  <span className="text-base font-bold text-[#0A0A0A]">₹{product.Threshold_Value}</span>
                                </div>
                                <div className="w-px h-4 bg-[#eee]" />
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#bbb] uppercase tracking-widest">Store</span>
                                  <span className="text-sm font-bold" style={{ color: color.bg }}>{domain}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                            <a
                              href={product.Product_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                              style={{ background: "#FF6200" }}
                            >
                              View →
                            </a>
                            <button
                              onClick={() => setExpandedProduct(isExpanded ? null : product.Product_ID)}
                              className="p-2 rounded-lg text-[#bbb] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-all"
                            >
                              <svg
                                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(product.Product_ID)}
                              className="p-2 rounded-lg text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-all"
                              title="Remove tracker"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-[#0A0A0A]/06 bg-[#FAFAFA] px-6 py-6">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Target price */}
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest">Target Price</span>
                                  <span className="text-2xl font-bold text-[#0A0A0A]">₹{product.Threshold_Value}</span>
                                </div>
                                {/* Date */}
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest">Added On</span>
                                  <span className="text-base font-bold text-[#444]">
                                    {new Date(product.Created_At).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                  </span>
                                </div>
                                {/* Status */}
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest">Status</span>
                                  <span className="text-base font-bold" style={{ color: product.NotificationSent ? "#22C55E" : "#FF6200" }}>
                                    {product.NotificationSent ? "✓ Alert Delivered" : "⚡ Tracking Active"}
                                  </span>
                                </div>
                              </div>

                              {/* Full URL */}
                              <div className="mt-5 pt-5 border-t border-[#0A0A0A]/06">
                                <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest mb-1">Product URL</p>
                                <a
                                  href={product.Product_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium break-all hover:underline"
                                  style={{ color: "#FF6200" }}
                                >
                                  {product.Product_URL}
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProductHistoryPage;