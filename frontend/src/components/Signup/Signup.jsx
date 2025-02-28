import React, { useState } from "react";
import { motion } from "framer-motion";
import googleLogo from "../../assets/google-logo.png";
import githubLogo from "../../assets/github-logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e] text-white font-['Poppins']">
      <div className="w-full max-w-md p-8 bg-[#2c2c54] rounded-lg text-center shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-5">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password" },
          ].map((input, index) => (
            <div className="relative text-left" key={index}>
              <label htmlFor={input.name} className="block text-sm text-gray-300">{input.label}</label>
              <div className="relative w-full">
                <input
                  type={input.type}
                  id={input.name}
                  name={input.name}
                  className="w-full px-4 py-3 mt-1 border border-indigo-600 rounded-md bg-[#2c2c54] text-white focus:outline-none focus:border-indigo-500 relative z-10"
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required
                />
                <motion.div
                  className="absolute inset-0 w-full h-full rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], x: [-50, 50] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                  }}
                />
              </div>
            </div>
          ))}

          <button type="submit" className="w-full py-3 mt-3 bg-indigo-600 text-white font-semibold rounded-md transition duration-200 hover:bg-indigo-500">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300">or continue with</p>
        
        {/* Social Signup Buttons */}
        <div className="flex justify-center gap-4 mt-3 w-full">
          <button className="flex items-center justify-center w-1/3 px-3 py-2 bg-white text-gray-900 rounded-md font-semibold transition hover:bg-gray-200 text-xs">
            <img src={googleLogo} alt="Google Logo" className="w-10 h-10 mr-1" />
            Google
          </button>
          <button className="flex items-center justify-center w-1/3 px-3 py-2 bg-white text-gray-900 rounded-md font-semibold transition hover:bg-gray-200 text-xs">
            <img src={githubLogo} alt="GitHub Logo" className="w-10 h-10 mr-1" />
            GitHub
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
