import React, { useEffect, useState } from "react";
import Navbar from "/src/components/Navbar/Navbar";
import { motion } from "framer-motion";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[#F7F7F7] border border-[#0A0A0A]/10 text-[15px] text-[#0A0A0A] placeholder:text-[#BBB] font-semibold focus:outline-none focus:border-[#FF6200] focus:ring-2 focus:ring-[#FF6200]/15 transition-all";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 4000);
  };

  const contactInfo = [
    { label: "Organisation", value: "University of Petroleum and Energy Studies, Dehradun" },
    { label: "Email", value: "deallure2025@gmail.com" },
    { label: "Phone", value: "+91 7217202698" },
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
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: "#FF6200" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] block mb-4">Reach Out</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">Get in touch</h1>
            <p className="text-[#888] text-lg font-medium">
              Have a question or want to reach out? We'd love to hear from you.
            </p>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#FFFFFF"/>
        </svg>
      </div>

      {/* ── Content ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-8 tracking-tight">Contact Details</h2>

            <div className="space-y-6 mb-10">
              {contactInfo.map((info, i) => (
                <div key={i} className="group">
                  <p className="text-xs font-bold text-[#BBB] uppercase tracking-widest mb-1">{info.label}</p>
                  <p className="text-base font-semibold text-[#333] group-hover:text-[#FF6200] transition-colors duration-200">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-bold text-[#BBB] uppercase tracking-widest mb-4">Follow us</p>
              <div className="flex gap-3">
                {[
                  { icon: <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />, href: "#" },
                  { icon: <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />, href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href}
                    className="w-10 h-10 rounded-xl border border-[#0A0A0A]/10 flex items-center justify-center text-[#888] hover:text-[#FF6200] hover:border-orange-500/30 hover:bg-orange-50 transition-all duration-200"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl text-sm font-bold"
                style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#22C55E" }}
              >
                ✓ Message sent! We'll get back to you soon.
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="How can we help you?" className={inputCls} style={{ resize: "vertical", minHeight: 120 }} />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
            >
              Send Message →
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
