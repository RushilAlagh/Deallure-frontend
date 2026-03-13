import React, { useEffect } from "react";
import Navbar from "/src/components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Subscription = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const freeTier = [
    "Track up to 5 products",
    "Daily price checks",
    "Email alerts on price drop",
    "Amazon & Flipkart support",
  ];

  const premiumTier = [
    "Unlimited product tracking",
    "Real-time (hourly) price checks",
    "Priority email + SMS alerts",
    "All stores including Ajio, Nike, Nykaa",
    "Historical price charts",
    "Priority customer support",
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]" style={SG}>
      <Navbar />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#0A0A0A] overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.09) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: "#FF6200" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] block mb-4">Pricing</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-[#888] text-lg font-medium max-w-lg mx-auto">
              Start free — upgrade when you need more power.
            </p>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#FFFFFF"/>
        </svg>
      </div>

      {/* ── Pricing cards ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Free plan */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="p-8 rounded-2xl border-2 border-[#0A0A0A]/10 hover:border-[#0A0A0A]/20 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="mb-6">
                <span className="text-xs font-bold text-[#999] uppercase tracking-widest block mb-2">Free</span>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-[#0A0A0A] tracking-tight">₹0</span>
                  <span className="text-[#999] font-medium mb-1.5">/ forever</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {freeTier.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#444]">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className="block w-full py-3.5 text-center font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#F5F5F5",
                  color: "#0A0A0A",
                  border: "1.5px solid rgba(10,10,10,0.10)",
                }}
              >
                Get started free
              </Link>
            </motion.div>

            {/* Premium plan */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "#0A0A0A",
                border: "2px solid rgba(255,98,0,0.35)",
              }}
              whileHover={{ y: -4 }}
            >
              {/* Orange top badge */}
              <div className="absolute top-0 right-8 px-3 py-1 rounded-b-lg text-xs font-bold text-white" style={{ background: "#FF6200" }}>
                Most Popular
              </div>

              {/* Subtle glow */}
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ background: "#FF6200" }} />

              <div className="relative z-10">
                <div className="mb-6">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2">Premium</span>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">₹99</span>
                    <span className="text-[#888] font-medium mb-1.5">/ month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {premiumTier.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#ccc]">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,98,0,0.2)" }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#FF6200" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/checkout"
                  className="block w-full py-3.5 text-center font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#FF6200",
                    color: "#fff",
                    boxShadow: "0 6px 24px rgba(255,98,0,0.35)",
                  }}
                >
                  Subscribe Now →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ-style guarantee strip ── */}
      <section className="bg-[#F7F7F7] py-16 px-6 border-t border-[#0A0A0A]/06">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🔒", title: "No credit card", desc: "Free plan requires zero payment info." },
              { icon: "⚡", title: "Cancel anytime", desc: "No contracts, no lock-in, ever." },
              { icon: "💬", title: "Email support", desc: "We respond within 24 hours." },
            ].map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-bold text-[#0A0A0A] text-sm mb-1">{f.title}</div>
                <div className="text-[#888] text-xs font-medium">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
