"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/Adeep_Mohamed_Resume.pdf";
    link.download = "Adeep_Mohamed_Resume.pdf";
    link.click();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
            background: "rgba(0,0,8,0.82)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* ── Modal card ───────────────────────────────────────────────── */}
          <motion.div
            key="resume-modal-card"
            className="resume-modal-container"
            initial={{ opacity: 0, scale: 0.78, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.88,  y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(92vw, 520px)",
              padding: "36px 36px 32px",
              background: "rgba(2, 6, 22, 0.96)",
              border: "1px solid rgba(6,182,212,0.35)",
              borderRadius: 22,
              boxShadow: "0 0 80px rgba(6,182,212,0.18), 0 0 200px rgba(107,33,168,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Gradient top-border accent */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, #06b6d4, #a855f7, #06b6d4, transparent)",
            }} />

            {/* Corner brackets */}
            {[
              { top: 10, left: 10,   borderTop: "2px solid #06b6d4", borderLeft:  "2px solid #06b6d4" },
              { top: 10, right: 10,  borderTop: "2px solid #06b6d4", borderRight: "2px solid #06b6d4" },
              { bottom: 10, left: 10,  borderBottom: "2px solid #a855f7", borderLeft:  "2px solid #a855f7" },
              { bottom: 10, right: 10, borderBottom: "2px solid #a855f7", borderRight: "2px solid #a855f7" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 28, height: 28, opacity: 0.85 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                style={{ position: "absolute", ...s }}
              />
            ))}

            {/* ── Rocket icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ textAlign: "center", fontSize: 52, marginBottom: 8, lineHeight: 1 }}
            >
              🚀
            </motion.div>

            {/* ── Status tag */}
            <div style={{
              textAlign: "center",
              fontFamily: "Orbitron, monospace",
              fontSize: 9,
              letterSpacing: "0.4em",
              color: "#06b6d4",
              marginBottom: 10,
              textTransform: "uppercase",
            }}>
              ◈ RESUME INTERCEPTED ◈
            </div>

            {/* ── Name */}
            <h2 style={{
              textAlign: "center",
              fontFamily: "Orbitron, monospace",
              fontSize: "clamp(18px, 4vw, 26px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "0.05em",
              margin: "0 0 6px",
            }}>
              Adeep Mohamed P
            </h2>

            {/* ── Subtitle */}
            <p style={{
              textAlign: "center",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
              marginBottom: 24,
            }}>
              B.Tech AI &amp; Data Science · Aspiring Engineer
            </p>

            {/* ── Divider */}
            <div style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
              marginBottom: 24,
            }} />

            {/* ── Skills chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              marginBottom: 28,
            }}>
              {["Python", "React.js", "Django", "Machine Learning", "AI & IoT", "Full Stack"].map((skill) => (
                <span key={skill} style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: "rgba(6,182,212,0.1)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: 12,
                  color: "#06b6d4",
                  letterSpacing: "0.05em",
                }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* ── Download button */}
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(6,182,212,0.55)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                padding: "14px 24px",
                background: "linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(107,33,168,0.18) 100%)",
                border: "1px solid rgba(6,182,212,0.55)",
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "Orbitron, monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#06b6d4",
                boxShadow: "0 0 20px rgba(6,182,212,0.2)",
                transition: "all 0.3s ease",
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 18 }}>⬇</span>
              DOWNLOAD RESUME
            </motion.button>

            {/* ── Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.03, color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                cursor: "pointer",
                fontFamily: "Rajdhani, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.35)",
                transition: "all 0.3s ease",
              }}
            >
              CLOSE  •  ESC
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
