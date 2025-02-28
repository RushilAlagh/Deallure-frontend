import React, { useState } from "react";
import "./Signup.css";
import googleLogo from "../../assets/google-logo.png"; // Correct import
import githubLogo from "../../assets/github-logo.png"; // Correct import

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
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="signup-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="signup-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="signup-input"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-social-container">
          <button className="signup-social-button">
            <img src={googleLogo} alt="Google Logo" className="signup-social-icon" />
            Sign up with Google
          </button>
          <button className="signup-social-button">
            <img src={githubLogo} alt="GitHub Logo" className="signup-social-icon" />
            Sign up with GitHub
          </button>
        </div>

        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/login" className="signup-trial-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
