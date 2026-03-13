import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * PageTransition — wraps every page with a smooth fade+slide animation.
 * Mount: slides up from 16px below, fades in (0.35s)
 * Unmount: fades out instantly (handled by AnimatePresence in App.jsx)
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1], // Apple-style spring curve
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
};

export const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
