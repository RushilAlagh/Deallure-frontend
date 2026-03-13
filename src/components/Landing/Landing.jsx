import React, { useEffect, useState } from "react";
import Navbar from "/src/components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InfiniteCarousel from "../Carousel/Carousel";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Paste a link",
      icon: "🔗",
      desc: "Drop any product URL from Amazon, Flipkart, or other supported stores.",
    },
    {
      number: "02",
      title: "Set your price",
      icon: "🎯",
      desc: "Tell us the price you're willing to pay — your target, your terms.",
    },
    {
      number: "03",
      title: "Get notified",
      icon: "⚡",
      desc: "We monitor 24/7 and email you the moment the price drops below your target.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Products Tracked" },
    { value: "98%", label: "Alert Accuracy" },
    { value: "₹0", label: "Forever Free" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0A0A0A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar />

      {/* ══ HERO — White Section ══ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden bg-white">
        {/* Subtle orange dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Orange glow, top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-[0.06] blur-[120px] pointer-events-none" />
        {/* Yellow glow, bottom left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-yellow-400 opacity-[0.08] blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0A0A0A]/10 bg-white shadow-sm mb-8 cursor-default"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-[#0A0A0A] tracking-wide">
              Smart Price Tracking — India's stores
            </span>
          </motion.div>

          {/* Hero heading */}
          <motion.h1
            className="text-6xl sm:text-8xl font-bold leading-[0.95] tracking-[-0.04em] mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-[#0A0A0A]">Track prices.</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #FF6200 0%, #FFD60A 60%, #FF6200 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-shift 4s linear infinite",
              }}
            >
              On Your Terms.
            </span>
          </motion.h1>

          <style>{`
            @keyframes gradient-shift {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}</style>

          <motion.p
            className="text-xl text-[#555] max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Monitor product prices across your favourite stores. We'll alert you
            the moment they drop — so you buy at the right time, every time.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/signup"
              className="px-8 py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#FF6200",
                boxShadow: "0 8px 30px rgba(255,98,0,0.35)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e55800"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,98,0,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FF6200"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,98,0,0.35)"; }}
            >
              Start Tracking — it's free →
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 text-base font-bold text-[#0A0A0A] bg-white border-2 border-[#0A0A0A]/12 hover:border-[#0A0A0A]/30 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Learn more
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-12 mt-20 pt-12 border-t border-[#0A0A0A]/08"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#0A0A0A] tracking-tight">{s.value}</div>
                <div className="text-sm text-[#999] font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CAROUSEL — Light gray strip ══ */}
      <InfiniteCarousel />

      {/* ══ HOW IT WORKS — Black section ══ */}
      <section className="relative w-full py-28 px-6 bg-[#0A0A0A] overflow-hidden">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Orange accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-500 opacity-[0.08] blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 block">
              Simple Process
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              How it works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] group transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Step number */}
                <div className="text-xs font-bold text-orange-500 uppercase tracking-[0.15em] mb-6">
                  {step.number}
                </div>
                <div className="text-4xl mb-5">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#888] leading-relaxed font-medium">{step.desc}</p>
                {/* Bottom orange line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUE PROP — White section ══ */}
      <section className="w-full py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 block">
                Why Tracklet
              </span>
              <h2 className="text-5xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-6">
                Stop overpaying.
                <br />
                <span className="text-orange-500">Start saving.</span>
              </h2>
              <p className="text-lg text-[#555] leading-relaxed font-medium mb-8">
                Whether it's a gadget you've been eyeing or everyday essentials — set your price
                and we'll do the watching. No spam, no noise. Just the alert you need, when you need it.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#0A0A0A",
                  boxShadow: "0 4px 20px rgba(10,10,10,0.2)",
                }}
              >
                Create Free Account
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Right: Feature pills */}
            <motion.div
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {[
                { icon: "🔔", title: "Instant Alerts", desc: "Email notifications the moment prices drop below your target." },
                { icon: "🏪", title: "Multi-store Support", desc: "Amazon, Flipkart, Ajio, Nike, Nykaa and more." },
                { icon: "🔒", title: "Privacy First", desc: "We never store your browsing data or personal preferences." },
                { icon: "⚡", title: "24/7 Monitoring", desc: "Our bots run round the clock, even when you're asleep." },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-[#0A0A0A]/08 hover:border-orange-500/30 hover:bg-orange-50/30 transition-all duration-300 group cursor-default"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <div className="font-bold text-[#0A0A0A] text-base">{f.title}</div>
                    <div className="text-[#666] text-sm mt-1 font-medium">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CTA — Black section ══ */}
      <section className="relative w-full py-28 px-6 bg-[#0A0A0A] overflow-hidden text-center">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Ready to save
            <br />
            <span style={{ color: "#FF6200" }}>smarter?</span>
          </h2>
          <p className="text-xl text-[#888] mb-10 font-medium">
            Join thousands who already track prices with Tracklet.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-5 font-bold text-[#0A0A0A] rounded-xl text-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            style={{
              background: "#FFD60A",
              boxShadow: "0 8px 40px rgba(255,214,10,0.35)",
            }}
          >
            Get Started Free →
          </Link>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="w-full py-12 px-6 bg-white border-t border-[#0A0A0A]/08">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#FF6200" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="text-base font-bold text-[#0A0A0A]">Tracklet</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-[#888] font-medium">
            {[["Home", "/"], ["Track", "/home"], ["Products", "/products"], ["About", "/about"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="hover:text-[#0A0A0A] transition-colors">{label}</Link>
            ))}
          </div>

          <p className="text-xs text-[#aaa]">© 2026 Tracklet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;