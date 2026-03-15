import React, { useEffect } from "react";
import Navbar from "/src/components/Navbar/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const team = [
    { name: "Anshika Srivastava", role: "Frontend & Design", icon: "🎨" },
    { name: "Parth Dhavan",       role: "Backend & Cloud",   icon: "⚡" },
    { name: "Rushil Alagh",       role: "DevOps & Security", icon: "🔒" },
    { name: "Sairanjan Subudhi",  role: "AI/ML & Data",      icon: "🤖" },
  ];

  const sections = [
    {
      icon: "🎯",
      title: "Our mission",
      content: "Tracklet exists to make smart shopping effortless. We help you make confident purchasing decisions — without constantly checking prices.",
    },
    {
      icon: "💡",
      title: "Why we built this",
      content: "Prices shift every day. We were tired of missing deals and buyer's regret, so we built something better — a tool that watches prices for you.",
    },
    {
      icon: "🔒",
      title: "Our promise",
      content: "Simple, transparent, and free. Whether you're a casual shopper or a dedicated deal-hunter, Tracklet is built for you.",
    },
  ];

  const features = [
    "Monitor prices across major e-commerce platforms",
    "Custom price drop alerts delivered to your inbox",
    "Flexible tracking periods — you set the terms",
    "Automated 24/7 price surveillance",
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
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: "#FF6200" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] block mb-4">The Tracklet Story</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">About Tracklet</h1>
            <p className="text-[#888] text-lg font-medium max-w-xl mx-auto">
              Built by students who believe you should never overpay for what you love.
            </p>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#FFFFFF"/>
        </svg>
      </div>

      {/* ── Mission sections ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-7 rounded-2xl border border-[#0A0A0A]/08 hover:border-orange-500/20 hover:shadow-xl hover:shadow-orange-500/05 transition-all duration-300 group cursor-default"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">{s.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed font-medium">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What we do — black section ── */}
      <section className="bg-[#0A0A0A] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] block mb-3">What We Do</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Built to save you money</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#FF6200" }} />
                <span className="text-[#ccc] font-medium text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team — white section ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] block mb-3">The Builders</span>
            <h2 className="text-4xl font-bold text-[#0A0A0A] tracking-tight">Meet the team</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group text-center p-6 rounded-2xl border border-[#0A0A0A]/08 hover:border-orange-500/25 hover:shadow-lg hover:shadow-orange-500/08 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: "rgba(255,98,0,0.10)" }}
                >
                  {member.icon}
                </div>
                <h4 className="font-bold text-[#0A0A0A] text-sm leading-snug mb-1">{member.name}</h4>
                <p className="text-xs text-[#999] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A0A0A] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 max-w-xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Ready to start saving?</h2>
          <p className="text-[#888] mb-8 font-medium">Join Tracklet — free, forever.</p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#FF6200", color: "#fff", boxShadow: "0 8px 32px rgba(255,98,0,0.35)", fontSize: 15 }}
          >
            Get Started →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
