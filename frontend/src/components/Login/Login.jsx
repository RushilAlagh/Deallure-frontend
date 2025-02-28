import React, { useState } from "react";
import { motion } from "framer-motion";
import googleLogo from "../../assets/google-logo.png"; // Ensure this image is in src/assets/

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid login credentials");
      }

      // Store user session in local storage
      localStorage.setItem("userEmail", email);

      alert("Login successful!");
      window.location.href = "/"; 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#1a1a2e] text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-[#2c2c54] rounded-lg text-center shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-5">Login to your account</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="flex flex-col items-center w-full" onSubmit={handleLogin}>
          <label className="text-left w-full text-sm text-gray-300 mb-1">Email address</label>
          <motion.input 
            type="email" 
            placeholder="Enter your email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-[#575fcf] rounded-md bg-[#33334d] text-white text-lg focus:outline-none focus:border-[#6c5ce7]"
            whileFocus={{ scale: 1.02, borderColor: "#70a1ff" }}
          />

          <label className="text-left w-full text-sm text-gray-300 mb-1">Password</label>
          <motion.input 
            type="password" 
            placeholder="Enter your password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-[#575fcf] rounded-md bg-[#33334d] text-white text-lg focus:outline-none focus:border-[#6c5ce7]"
            whileFocus={{ scale: 1.02, borderColor: "#70a1ff" }}
          />

          <a href="#" className="self-end text-[#70a1ff] text-sm mb-4 hover:underline">Forgot password?</a>

          <motion.button 
            type="submit" 
            className="w-full p-3 bg-[#575fcf] text-white text-lg font-semibold rounded-md transition hover:bg-[#4b4be2] mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Sign in with Google button with shimmer effect */}
        <div className="flex justify-center w-full relative overflow-hidden">
          <motion.button 
            className="flex items-center justify-center w-full p-3 bg-white text-black font-semibold text-sm rounded-md transition hover:bg-gray-200 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [-50, 50] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
              }}
            />
            <img src={googleLogo} alt="Google Logo" className="w-4 h-4 mr-2" />
            Sign in with Google
          </motion.button>
        </div>

        <p className="mt-4 text-sm text-gray-300">
          New here? <a href="/signup" className="text-[#70a1ff] font-semibold hover:underline">Create an account</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;