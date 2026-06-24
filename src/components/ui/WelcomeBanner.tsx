"use client";

import { motion } from "framer-motion";

interface WelcomeBannerProps {
  onDismiss: () => void;
}

export default function WelcomeBanner({ onDismiss }: WelcomeBannerProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 50,
        pointerEvents: "all",
        maxWidth: 600,
        width: "90vw",
      }}
    >
      {/* Outer ring decoration */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        border: "2px solid rgba(6,182,212,0.4)",
        margin: "0 auto 30px",
        position: "relative",
        animation: "spin-slow 10s linear infinite",
      }}>
        <div style={{
          position: "absolute",
          inset: 12,
          borderRadius: "50%",
          border: "1px solid rgba(168,85,247,0.4)",
          animation: "spin-slow 6s linear infinite reverse",
        }} />
        <div style={{
          position: "absolute",
          inset: 30,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(107,33,168,0.4) 100%)",
          boxShadow: "0 0 40px rgba(6,182,212,0.5)",
          animation: "pulse-glow 2s ease-in-out infinite, spin-slow 10s linear infinite reverse",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: 24 }}>🚀</span>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: "Orbitron, monospace",
          fontSize: "clamp(18px, 3.5vw, 32px)",
          fontWeight: 900,
          letterSpacing: "0.2em",
          background: "linear-gradient(135deg, #06b6d4, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 12,
          lineHeight: 1.3,
        }}
      >
        WELCOME EXPLORER
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "clamp(13px, 2vw, 16px)",
          color: "rgba(255,255,255,0.7)",
          marginBottom: 8,
          lineHeight: 1.6,
        }}
      >
        Begin your journey through{" "}
        <span style={{ color: "#06b6d4", fontWeight: 600 }}>Adeep&apos;s Universe</span>.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: 13,
          color: "rgba(6,182,212,0.6)",
          letterSpacing: "0.15em",
          marginBottom: 36,
        }}
      >
        AI & DATA SCIENCE ENGINEER  •  FULL STACK DEVELOPER  •  AI INNOVATOR
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
      >
        <motion.button
          onClick={onDismiss}
          data-hover
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "13px 36px",
            background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(107,33,168,0.2))",
            border: "1px solid rgba(6,182,212,0.5)",
            borderRadius: 50,
            color: "#06b6d4",
            fontFamily: "Orbitron, monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(6,182,212,0.2)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
        >
          ENTER UNIVERSE →
        </motion.button>
      </motion.div>

      {/* Scan lines effect */}
      <div style={{
        position: "absolute",
        inset: -20,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.015) 2px, rgba(6,182,212,0.015) 4px)",
        pointerEvents: "none",
        borderRadius: 20,
      }} />
    </motion.div>
  );
}
