import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };
const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[#F7F7F7] border border-[#0A0A0A]/10 text-[15px] text-[#0A0A0A] placeholder:text-[#BBB] font-semibold focus:outline-none focus:border-[#FF6200] focus:ring-2 focus:ring-[#FF6200]/15 transition-all";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email."); return; }
    setError(null); setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send reset email.");
      setStep(2);
      setSuccessMsg(data.message || "OTP sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) { setError("Please enter the OTP and your new password."); return; }
    setError(null); setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to reset password.");
      setSuccessMsg("Password reset successfully. Redirecting to login…");
      setTimeout(() => navigate("/login"), 2500);
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
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,98,0,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ background: "#FF6200" }} />

        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FF6200" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="text-white text-lg font-bold">Tracklet</span>
        </Link>

        <div className="relative z-10">
          <p className="text-4xl font-bold text-white leading-tight mb-3">
            Forgot your
            <br /><span style={{ color: "#FF6200" }}>password?</span>
          </p>
          <p className="text-[#666] font-medium text-sm">
            No worries — we'll send a secure reset code to your email.
          </p>
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

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: step >= s ? "#FF6200" : "#F5F5F5",
                    color: step >= s ? "#fff" : "#999",
                  }}
                >
                  {s}
                </div>
                {s < 2 && <div className="w-8 h-0.5 rounded-full" style={{ background: step > 1 ? "#FF6200" : "#eee" }} />}
              </div>
            ))}
            <span className="text-xs font-bold text-[#999] ml-2">
              {step === 1 ? "Enter Email" : "Enter Code & New Password"}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#0A0A0A] tracking-tight mb-1">Reset Password</h1>
          <p className="text-[#888] font-medium mb-8 text-sm">
            {step === 1
              ? "Enter your email address to receive a reset code."
              : "Check your email for the OTP and set a new password."}
          </p>

          {/* Alerts */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-5 rounded-xl text-sm font-bold"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#EF4444" }}>
              {error}
            </motion.div>
          )}
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-5 rounded-xl text-sm font-bold"
              style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#22C55E" }}>
              {successMsg}
            </motion.div>
          )}

          {step === 1 ? (
            <form className="space-y-5" onSubmit={handleRequestOTP}>
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  disabled={loading} placeholder="you@example.com" className={inputCls} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}>
                {loading
                  ? <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  : "Send Reset Code →"}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">Reset Code (OTP)</label>
                <input type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                  disabled={loading} placeholder="123456" maxLength={6}
                  className={`${inputCls} text-center text-xl tracking-[0.4em] font-mono`} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-2 uppercase tracking-[0.1em]">New Password</label>
                <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  disabled={loading} placeholder="••••••••" className={inputCls} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: "#FF6200", boxShadow: "0 6px 24px rgba(255,98,0,0.35)" }}>
                {loading
                  ? <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Setting password…
                    </span>
                  : "Confirm New Password →"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-semibold text-[#888] hover:text-[#FF6200] transition-colors">
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
