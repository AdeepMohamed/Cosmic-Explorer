"use client";

import { useEffect, useState, useMemo } from "react";

interface Star {
  left: string; top: string;
  width: string; height: string;
  opacity: number;
  duration: string; delay: string;
}

// Generate stars — runs only on client, never on server
function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    width:    `${Math.random() * 2 + 0.5}px`,
    height:   `${Math.random() * 2 + 0.5}px`,
    opacity:  Math.random() * 0.8 + 0.2,
    duration: `${Math.random() * 3 + 1}s`,
    delay:    `${Math.random() * 3}s`,
  }));
}

const PHASES = [
  "Initializing Cosmic Engine...",
  "Rendering Galaxy Clusters...",
  "Calibrating Orbital Mechanics...",
  "Loading Stellar Data...",
  "Entering the Universe...",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [stars, setStars]       = useState<Star[]>([]);

  // Stars generated only on client — eliminates hydration mismatch
  useEffect(() => {
    setStars(makeStars(120));
  }, []);

  // Progress ticker
  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(id); return 100; }
        return Math.min(p + Math.random() * 4 + 1, 100);
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[Math.min(Math.floor((progress / 100) * (PHASES.length - 1)), PHASES.length - 1)];

  return (
    <div className="loading-screen" style={{ zIndex: 9999 }}>
      {/* Stars — only rendered after client mount */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.left, top: s.top,
              width: s.width, height: s.height,
              borderRadius: "50%",
              background: "white",
              opacity: s.opacity,
              animation: `flicker ${s.duration} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Central logo */}
      <div style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
        {/* Outer ring */}
        <div style={{
          width: "180px", height: "180px",
          borderRadius: "50%",
          border: "2px solid rgba(6,182,212,0.3)",
          position: "relative",
          margin: "0 auto 40px",
          animation: "spin-slow 8s linear infinite",
        }}>
          {/* Inner ring */}
          <div style={{
            position: "absolute", inset: 15,
            borderRadius: "50%",
            border: "1px solid rgba(168,85,247,0.4)",
            animation: "spin-slow 5s linear infinite reverse",
          }} />

          {/* Core */}
          <div style={{
            position: "absolute", inset: 35,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(107,33,168,0.6) 50%, transparent 100%)",
            boxShadow: "0 0 60px rgba(6,182,212,0.5), 0 0 120px rgba(107,33,168,0.3)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "spin-slow 8s linear infinite reverse",
            }}>
              <span style={{ fontFamily: "Orbitron, monospace", fontSize: 28, fontWeight: 900, color: "#06b6d4", lineHeight: 1 }}>
                CE
              </span>
            </div>
          </div>

          {/* Orbit dots — deterministic, no Math.random() */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div key={deg} style={{
              position: "absolute",
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: deg % 120 === 0 ? "#06b6d4" : "#a855f7",
              boxShadow: `0 0 8px ${deg % 120 === 0 ? "#06b6d4" : "#a855f7"}`,
              top:  `${(50 - 47 * Math.cos((deg * Math.PI) / 180)).toFixed(4)}%`,
              left: `${(50 + 47 * Math.sin((deg * Math.PI) / 180)).toFixed(4)}%`,
              transform: "translate(-50%, -50%)",
            }} />
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "Orbitron, monospace",
          fontSize: "clamp(20px, 4vw, 36px)",
          fontWeight: 900,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #06b6d4, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 8,
        }}>
          COSMIC EXPLORER
        </h1>

        <p style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: 14,
          letterSpacing: "0.5em",
          color: "rgba(6,182,212,0.7)",
          textTransform: "uppercase",
          marginBottom: 50,
        }}>
          Adeep&apos;s Universe
        </p>

        {/* Progress bar */}
        <div style={{ width: "320px", margin: "0 auto" }}>
          <div style={{
            background: "rgba(6,182,212,0.1)",
            borderRadius: 4, height: "3px",
            overflow: "hidden",
            border: "1px solid rgba(6,182,212,0.2)",
          }}>
            <div style={{
              height: "100%",
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
              borderRadius: 4,
              boxShadow: "0 0 10px #06b6d4",
              transition: "width 0.3s ease",
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <p style={{
              fontFamily: "Orbitron, monospace", fontSize: 10,
              color: "rgba(6,182,212,0.6)", letterSpacing: "0.15em",
            }}>
              {phase}
            </p>
            <p style={{ fontFamily: "Orbitron, monospace", fontSize: 10, color: "#06b6d4" }}>
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
