import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition/PageTransition";

// Lazy-load all pages
const Landing      = lazy(() => import("./components/Landing/Landing"));
const Login        = lazy(() => import("./components/Login/Login"));
const Signup       = lazy(() => import("./components/Signup/Signup"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword/ForgotPassword"));
const Home         = lazy(() => import("./components/Home/Home"));
const ProductHistoryPage = lazy(() => import("./components/Products/Products"));
const AboutUs      = lazy(() => import("./components/About/About"));
const Contact      = lazy(() => import("./components/Contact/Contact"));
const Subscription = lazy(() => import("./components/Subscription/Subscription"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute/PrivateRoute"));

// Google-style 4-dot bounce loader for Suspense
const PageLoader = () => (
  <div style={{
    position: "fixed", inset: 0, display: "flex", alignItems: "center",
    justifyContent: "center", background: "#FFFFFF", zIndex: 9999,
    fontFamily: "'Space Grotesk', sans-serif",
  }}>
    <div style={{ display: "flex", gap: 8 }}>
      {["#FF6200", "#FFD60A", "#0057FF", "#22C55E"].map((c, i) => (
        <span key={i} style={{
          width: 12, height: 12, borderRadius: "50%", background: c,
          animation: `pageLoaderBounce 0.8s ease-in-out ${i * 0.14}s infinite alternate`,
        }} />
      ))}
    </div>
    <style>{`
      @keyframes pageLoaderBounce {
        from { transform: translateY(0px); opacity: 0.8; }
        to   { transform: translateY(-14px); opacity: 1; }
      }
    `}</style>
  </div>
);

// Animated routes must be a child component so useLocation works inside Router
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        {/* Protected */}
        <Route path="/home" element={
          <PageTransition>
            <PrivateRoute><Home /></PrivateRoute>
          </PageTransition>
        } />
        <Route path="/products" element={
          <PageTransition>
            <PrivateRoute><ProductHistoryPage /></PrivateRoute>
          </PageTransition>
        } />
        <Route path="/subscription" element={
          <PageTransition>
            <PrivateRoute><Subscription /></PrivateRoute>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <div className="App">
          <AnimatedRoutes />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
