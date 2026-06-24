"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData } from "@/data/planets";
import AboutPanel from "./panels/AboutPanel";
import SkillsPanel from "./panels/SkillsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import AchievementsPanel from "./panels/AchievementsPanel";
import ContactPanel from "./panels/ContactPanel";
import { useEffect } from "react";

interface ImmersiveOverlayProps {
  planet: PlanetData;
  onClose: () => void;
}

const PANEL_MAP: Record<string, React.ComponentType<any>> = {
  about:        AboutPanel,
  skills:       SkillsPanel,
  projects:     ProjectsPanel,
  experience:   ExperiencePanel,
  achievements: AchievementsPanel,
  contact:      ContactPanel,
};

export default function ImmersiveOverlay({ planet, onClose }: ImmersiveOverlayProps) {
  const Panel = PANEL_MAP[planet.id];
  // Scan line is animated entirely with CSS — no React state, no re-renders

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      {/* Cinematic atmosphere entry backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${planet.glowColor}18 0%, rgba(0,0,5,0.88) 70%)`,
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Atmospheric entry lines — cinematic effect */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Corner brackets */}
        {[
          { top: 20, left: 20, borderTop: `2px solid ${planet.glowColor}`, borderLeft: `2px solid ${planet.glowColor}` },
          { top: 20, right: 20, borderTop: `2px solid ${planet.glowColor}`, borderRight: `2px solid ${planet.glowColor}` },
          { bottom: 20, left: 20, borderBottom: `2px solid ${planet.glowColor}`, borderLeft: `2px solid ${planet.glowColor}` },
          { bottom: 20, right: 20, borderBottom: `2px solid ${planet.glowColor}`, borderRight: `2px solid ${planet.glowColor}` },
        ].map((style, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: 48, height: 48, opacity: 0.8 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            style={{ position: "absolute", ...style }}
          />
        ))}

        {/* Scan line — CSS-only animation, zero React re-renders */}
        <div className="scan-line-animated" style={{
          position: "absolute",
          left: 0, right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${planet.glowColor}40, transparent)`,
          pointerEvents: "none",
        }} />

        {/* Top scan bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${planet.glowColor}, transparent)`,
            transformOrigin: "left",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${planet.glowColor}, transparent)`,
            transformOrigin: "right",
          }}
        />
      </motion.div>

      {/* Main holographic panel */}
      <motion.div
        key="overlay"
        className="overlay-panel-container"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ type: "spring", damping: 28, stiffness: 200 }}
        style={{
          position: "relative",
          width: "min(92vw, 920px)",
          maxHeight: "88vh",
          zIndex: 10,
          pointerEvents: "all",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Holographic outer border glow */}
        <div style={{
          position: "absolute",
          inset: -2,
          borderRadius: 22,
          background: `linear-gradient(135deg, ${planet.glowColor}60, transparent 50%, ${planet.glowColor}30)`,
          zIndex: -1,
          filter: "blur(3px)",
        }} />

        <div style={{
          background: "rgba(2, 6, 22, 0.92)",
          backdropFilter: "blur(40px)",
          borderRadius: 20,
          border: `1px solid ${planet.glowColor}35`,
          boxShadow: `0 0 80px ${planet.glowColor}20, 0 0 200px ${planet.glowColor}08, inset 0 1px 0 rgba(255,255,255,0.06)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "88vh",
        }}>
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div
            className="overlay-header"
            style={{
              padding: "20px 28px 16px",
              borderBottom: `1px solid ${planet.glowColor}20`,
              background: `linear-gradient(135deg, rgba(2,6,22,0.95) 0%, rgba(6,12,40,0.8) 100%)`,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Planet icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, ${planet.color}ff, ${planet.emissive})`,
                  border: `2px solid ${planet.glowColor}60`,
                  boxShadow: `0 0 24px ${planet.glowColor}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {planet.icon}
              </motion.div>

              <div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, letterSpacing: "0.35em", color: `${planet.glowColor}cc`, marginBottom: 4, textTransform: "uppercase" }}>
                  ◈ {planet.name} — ATMOSPHERIC SCAN COMPLETE
                </div>
                <h2 style={{
                  fontFamily: "Orbitron, monospace",
                  fontSize: "clamp(16px, 2.8vw, 24px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "0.06em",
                  margin: 0,
                }}>
                  {planet.label}
                </h2>
              </div>
            </div>

            {/* HUD info + close */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                className="overlay-header-hud"
                style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: `${planet.glowColor}70`, textAlign: "right", lineHeight: 1.9 }}
              >
                <div>ORBIT: {planet.orbitRadius} AU</div>
                <div style={{ color: planet.glowColor }}>● LANDED</div>
              </div>
              <motion.button
                onClick={onClose}
                data-hover
                whileHover={{ scale: 1.1, borderColor: planet.glowColor }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: `1px solid ${planet.glowColor}50`,
                  background: `${planet.glowColor}12`,
                  color: planet.glowColor,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  boxShadow: `0 0 12px ${planet.glowColor}20`,
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
                title="Leave planet (ESC)"
              >
                ✕
              </motion.button>
            </div>
          </div>

          {/* Color accent line */}
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${planet.glowColor}, transparent)`, flexShrink: 0 }} />

          {/* ── Scrollable content ─────────────────────────────────────────── */}
          <div
            className="overlay-content"
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "24px 28px 28px",
              scrollbarWidth: "thin",
              scrollbarColor: `${planet.glowColor}40 transparent`,
            }}
          >
            {Panel && <Panel planet={planet} />}
          </div>

          {/* Bottom status bar */}
          <div style={{
            padding: "10px 28px",
            borderTop: `1px solid ${planet.glowColor}15`,
            display: "flex",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: `${planet.glowColor}50`, letterSpacing: "0.2em" }}>
              COSMIC EXPLORER v2.0 — ADEEP UNIVERSE
            </span>
            <span style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: `${planet.glowColor}50`, letterSpacing: "0.2em" }}>
              ESC TO DEPART
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
