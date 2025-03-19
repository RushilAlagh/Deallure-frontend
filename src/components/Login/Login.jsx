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
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white px-4 py-8 sm:px-6 md:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.8 + 0.2
              }}
              animate={{ 
                x: [null, Math.random() * window.innerWidth], 
                y: [null, Math.random() * window.innerHeight] 
              }}
              transition={{ 
                duration: Math.random() * 20 + 10, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-4 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Welcome Back</h1>
          <p className="text-sm sm:text-base text-white/60 mt-2">Sign in to continue your journey</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-2 sm:p-3 mb-4 sm:mb-6 rounded-lg bg-red-500/20 border border-red-500/40"
          >
            <p className="text-red-300 text-xs sm:text-sm">{error}</p>
          </motion.div>
        )}

        <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
          <motion.div 
            className="space-y-1 sm:space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-xs sm:text-sm font-medium text-white/70 block">Email address</label>
            <div className="relative">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-4 pl-3 sm:pl-5 rounded-lg bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-1 sm:space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-medium text-white/70">Password</label>
              <a href="#" className="text-xs text-blue-300 hover:text-blue-200 transition">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 sm:p-4 pl-3 sm:pl-5 rounded-lg bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          <motion.button 
            type="submit" 
            className="w-full p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sign in
          </motion.button>
        </form>

        <div className="my-4 sm:my-6 flex items-center">
          <div className="flex-grow h-px bg-white/10"></div>
          <span className="px-2 sm:px-3 text-xs text-white/40 font-medium">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>

        <motion.button 
          className="flex items-center justify-center w-full p-2 sm:p-4 bg-white/5 border border-white/10 text-white rounded-lg transition-all hover:bg-white/10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <img src={googleLogo} alt="Google Logo" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
          <span className="text-xs sm:text-sm">Sign in with Google</span>
        </motion.button>

        <motion.p 
          className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          New here? <a href="/signup" className="text-blue-300 font-medium hover:underline">Create an account</a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;