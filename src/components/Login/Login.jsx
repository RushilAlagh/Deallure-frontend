import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };
const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[#F7F7F7] border border-[#0A0A0A]/10 text-[15px] text-[#0A0A0A] placeholder:text-[#BBB] font-semibold focus:outline-none focus:border-[#FF6200] focus:ring-2 focus:ring-[#FF6200]/15 transition-all";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid login credentials");
      localStorage.setItem("userEmail", email);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={SG}>
      {/* Left — Black panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0A0A0A] p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none" style={{ background: "#FF6200", opacity: 0.08 }} />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FF6200" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="text-white text-lg font-bold">Tracklet</span>
        </Link>

        {/* Quote */}
        <div className="relative z-10">
          <p className="text-3xl font-bold text-white leading-tight mb-4">
            "Smart shoppers<br />
            <span style={{ color: "#FF6200" }}>never overpay.</span>"
          </p>
          <p className="text-[#666] font-medium text-sm">Track prices across India's top stores, automatically.</p>
        </div>
      </div>

      {/* Right — White panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
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

          <h1 className="text-3xl font-bold text-[#0A0A0A] tracking-tight mb-1">Welcome back</h1>
          <p className="text-[#888] font-medium mb-8">Sign in to your account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 rounded-xl text-sm font-bold"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#EF4444" }}
            >
              {error}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" className={inputCls} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-[0.1em]">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold hover:underline" style={{ color: "#FF6200" }}>
                  Forgot password?
                </Link>
              </div>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className={inputCls} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 mt-2"
              style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                : "Sign in →"
              }
            </button>
          </form>

          <p className="text-center text-sm text-[#888] mt-8 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold hover:underline" style={{ color: "#FF6200" }}>
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;