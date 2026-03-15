import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };
const inputCls = (hasErr) =>
  `w-full px-4 py-3.5 rounded-xl bg-[#F7F7F7] border text-[15px] text-[#0A0A0A] placeholder:text-[#BBB] font-semibold focus:outline-none transition-all ${
    hasErr
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/15"
      : "border-[#0A0A0A]/10 focus:border-[#FF6200] focus:ring-2 focus:ring-[#FF6200]/15"
  }`;

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validateName = (n) => !/\d/.test(n);
  const validatePassword = (pw) => {
    if (!/[A-Z]/.test(pw)) return "Include an uppercase letter";
    if (!/[a-z]/.test(pw)) return "Include a lowercase letter";
    if (pw.length < 8) return "At least 8 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    setValidationErrors(v => ({ ...v, [name]: "" }));
  };

  const validateForm = () => {
    const errs = { name: "", email: "", password: "", confirmPassword: "" };
    let valid = true;
    if (!validateName(formData.name)) { errs.name = "Name shouldn't contain numbers"; valid = false; }
    if (!validateEmail(formData.email)) { errs.email = "Enter a valid email address"; valid = false; }
    const pwErr = validatePassword(formData.password);
    if (pwErr) { errs.password = pwErr; valid = false; }
    if (formData.password !== formData.confirmPassword) { errs.confirmPassword = "Passwords don't match"; valid = false; }
    setValidationErrors(errs);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true); setError(""); setMessage("");
    try {
      const response = await fetch("https://tc4d4uk8sf.execute-api.ap-south-1.amazonaws.com/dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      setMessage("Account created! Redirecting to login…");
      setTimeout(() => { window.location.href = "/login"; }, 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ id, label, type = "text", placeholder, error: err }) => (
    <div>
      <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">{label}</label>
      <input id={id} name={id} type={type} required value={formData[id]} onChange={handleChange}
        placeholder={placeholder} className={inputCls(!!err)} />
      {err && <p className="text-xs text-red-500 font-bold mt-1.5">{err}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={SG}>
      {/* Left — Black panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0A0A0A] p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none" style={{ background: "#FFD60A", opacity: 0.06 }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "#FF6200", opacity: 0.08 }} />

        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FF6200" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="text-white text-lg font-bold">Tracklet</span>
        </Link>

        <div className="relative z-10 space-y-5">
          {[
            { icon: "🔔", text: "Instant price drop alerts on email" },
            { icon: "🏪", text: "Amazon, Flipkart, Ajio, Nike & more" },
            { icon: "⚡", text: "24/7 monitoring — we never sleep" },
            { icon: "₹0", text: "100% free, forever. No credit card." },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl w-8 flex-shrink-0">{f.icon}</span>
              <span className="text-[#aaa] font-medium text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — White panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] py-8"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FF6200" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="text-lg font-bold text-[#0A0A0A]">Tracklet</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-[#0A0A0A] tracking-tight mb-1">Create an account</h1>
          <p className="text-[#888] font-medium mb-8">Start tracking prices for free</p>

          {/* Status banners */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 rounded-xl text-sm font-bold"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#EF4444" }}>
              {error}
            </motion.div>
          )}
          {message && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 rounded-xl text-sm font-bold"
              style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#22C55E" }}>
              {message}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field id="name" label="Full Name" placeholder="John Doe" error={validationErrors.name} />
            <Field id="email" label="Email" type="email" placeholder="you@example.com" error={validationErrors.email} />
            <Field id="password" label="Password" type="password" placeholder="••••••••" error={validationErrors.password} />
            <Field id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" error={validationErrors.confirmPassword} />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 mt-2"
              style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                : "Create Account →"
              }
            </button>
          </form>

          <p className="text-center text-sm text-[#888] mt-6 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline" style={{ color: "#FF6200" }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;