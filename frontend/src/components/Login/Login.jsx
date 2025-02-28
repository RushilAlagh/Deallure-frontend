import React from "react";
import "./Login.css";
import googleLogo from "../../assets/google-logo.png"; // Ensure this image is in `src/assets/`

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-heading">Login to your account</h1>

        <form className="login-form">
          <label className="login-label">Email address</label>
          <input type="email" placeholder="Enter your email" required className="login-input" />

          <label className="login-label">Password</label>
          <input type="password" placeholder="Enter your password" required className="login-input" />

          <a href="#" className="login-forgot-password">Forgot password?</a>

          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Sign in with Google button */}
        <div className="login-options">
          <button className="login-google-button">
            <img src={googleLogo} alt="Google Logo" className="login-google-logo" />
            Sign in with Google
          </button>
        </div>

        <p className="login-footer-text">
          New here? <a href="/signup" className="login-signup-link">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;