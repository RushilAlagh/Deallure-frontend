import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setIsLoggedIn(!!userEmail);
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const navLinks = [
    { to: "/home", label: "Track" },
    { to: "/products", label: "Products" },
    { to: "/subscription", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        ...SG,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(255,255,255,0.96)"
          : "rgba(255,255,255,0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(10,10,10,0.09)"
          : "1px solid rgba(10,10,10,0.06)",
        boxShadow: scrolled
          ? "0 2px 20px rgba(10,10,10,0.07)"
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#FF6200",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,98,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.02em" }}>
              Tracklet
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: isActive ? "#FF6200" : "#555",
                    background: isActive ? "rgba(255,98,0,0.08)" : "transparent",
                    transition: "all 0.18s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#0A0A0A";
                      e.currentTarget.style.background = "rgba(10,10,10,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#555";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{
                  padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  background: "#F5F5F5", color: "#0A0A0A", border: "1px solid rgba(10,10,10,0.10)",
                  cursor: "pointer", transition: "all 0.18s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#EBEBEB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; }}
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/login" style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                  color: "#555", textDecoration: "none", transition: "color 0.18s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#0A0A0A"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#555"; }}
                >
                  Sign in
                </Link>
                <Link to="/signup" style={{
                  padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  background: "#FF6200", color: "#FFFFFF", textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(255,98,0,0.30)",
                  transition: "all 0.22s ease",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#e55800";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,98,0,0.45)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#FF6200";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,98,0,0.30)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            style={{ padding: 8, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", color: "#0A0A0A" }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "#FFFFFF",
              borderTop: "1px solid rgba(10,10,10,0.08)",
              boxShadow: "0 10px 40px rgba(10,10,10,0.12)",
              ...SG,
            }}
          >
            <div style={{ padding: "16px 24px 20px" }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      display: "block", padding: "12px 16px", borderRadius: 10, marginBottom: 4,
                      fontSize: 15, fontWeight: 600, textDecoration: "none",
                      color: isActive ? "#FF6200" : "#444",
                      background: isActive ? "rgba(255,98,0,0.08)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div style={{ borderTop: "1px solid rgba(10,10,10,0.07)", marginTop: 12, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {isLoggedIn ? (
                  <button onClick={handleLogout} style={{
                    padding: "14px 0", width: "100%", borderRadius: 10, fontSize: 15, fontWeight: 700,
                    background: "#F5F5F5", color: "#0A0A0A", border: "none", cursor: "pointer",
                  }}>
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link to="/login" style={{
                      display: "block", padding: "14px 0", textAlign: "center", borderRadius: 10,
                      fontSize: 15, fontWeight: 700, textDecoration: "none",
                      background: "#F5F5F5", color: "#0A0A0A",
                    }}>Sign in</Link>
                    <Link to="/signup" style={{
                      display: "block", padding: "14px 0", textAlign: "center", borderRadius: 10,
                      fontSize: 15, fontWeight: 700, textDecoration: "none",
                      background: "#FF6200", color: "#fff",
                      boxShadow: "0 4px 14px rgba(255,98,0,0.3)",
                    }}>Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;