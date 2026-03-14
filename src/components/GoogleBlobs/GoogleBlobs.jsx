import React, { useEffect, useRef } from "react";

/**
 * GoogleBlobs - Animated Google-style floating blobs (wavy polka dot circles)
 * that cover the background on launch, similar to Google Meet / Google One.
 * Uses CSS animations for performance (no JS runtime cost after mount).
 */
const blobs = [
  // Google Blue
  {
    color: "#4285F4",
    size: 480,
    x: -8,
    y: -10,
    delay: 0,
    duration: 18,
    opacity: 0.15,
  },
  // Google Green
  {
    color: "#34A853",
    size: 380,
    x: 75,
    y: -5,
    delay: 4,
    duration: 22,
    opacity: 0.12,
  },
  // Google Yellow
  {
    color: "#FBBC04",
    size: 320,
    x: 20,
    y: 70,
    delay: 8,
    duration: 16,
    opacity: 0.13,
  },
  // Google Red
  {
    color: "#EA4335",
    size: 280,
    x: 65,
    y: 60,
    delay: 2,
    duration: 20,
    opacity: 0.10,
  },
  // Extra Blue (bottom left)
  {
    color: "#4285F4",
    size: 350,
    x: -5,
    y: 80,
    delay: 11,
    duration: 24,
    opacity: 0.09,
  },
  // Extra Green (center)
  {
    color: "#34A853",
    size: 260,
    x: 45,
    y: 35,
    delay: 6,
    duration: 19,
    opacity: 0.08,
  },
];

export const GoogleBlobs = ({ className = "" }) => {
  return (
    <>
      <style>{`
        @keyframes blob-float {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(30px, -20px) scale(1.08); }
          50%  { transform: translate(-15px, 30px) scale(0.94); }
          75%  { transform: translate(20px, 15px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob-float-alt {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(-25px, 20px) scale(1.06); }
          66%  { transform: translate(20px, -25px) scale(0.96); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .google-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
          animation: blob-float var(--duration) ease-in-out infinite var(--delay);
        }
        .google-blob:nth-child(even) {
          animation-name: blob-float-alt;
        }
      `}</style>

      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
        aria-hidden="true"
      >
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="google-blob"
            style={{
              width: blob.size,
              height: blob.size,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              background: blob.color,
              opacity: blob.opacity,
              "--duration": `${blob.duration}s`,
              "--delay": `-${blob.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GoogleBlobs;
