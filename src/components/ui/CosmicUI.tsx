"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PLANETS } from "@/data/planets";
import type { PlanetData } from "@/data/planets";

interface CosmicUIProps {
  planets: PlanetData[];
  activePlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData) => void;
}

export default function CosmicUI({ planets, activePlanet, onSelectPlanet }: CosmicUIProps) {
  return (
    <>
      {/* Top HUD */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        padding: "20px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: "none",
        zIndex: 20,
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ pointerEvents: "all" }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(107,33,168,0.6) 100%)",
              border: "2px solid rgba(6,182,212,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(6,182,212,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}>
              <span style={{ fontFamily: "Orbitron, monospace", fontSize: 13, fontWeight: 900, color: "#fff" }}>CE</span>
            </div>
            <div>
              <div style={{ fontFamily: "Orbitron, monospace", fontSize: 12, letterSpacing: "0.2em", color: "#06b6d4" }}>
                COSMIC EXPLORER
              </div>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                Adeep&apos;s Universe
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status */}
        <motion.div
          className="hud-status"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: "Orbitron, monospace",
            fontSize: 10,
            color: "rgba(6,182,212,0.6)",
            letterSpacing: "0.2em",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#06b6d4", marginBottom: 2 }}>● SYSTEM ONLINE</div>
          <div style={{ color: "rgba(255,255,255,0.3)" }}>6 PLANETS DETECTED</div>
        </motion.div>

        {/* Coordinates */}
        <motion.div
          className="hud-coordinates"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "Orbitron, monospace",
            fontSize: 9,
            color: "rgba(6,182,212,0.5)",
            textAlign: "right",
            lineHeight: 1.8,
          }}
        >
          <div>LAT: 23.4°N  LON: 180.0°W</div>
          <div>ALT: 80,000 AU</div>
          <div style={{ color: "rgba(168,85,247,0.6)" }}>SECTOR: ADEEP-7</div>
        </motion.div>
      </div>

      {/* Left nav — Planet list */}
      <motion.div
        className="left-nav-dock"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "all",
          zIndex: 20,
        }}
      >
        {planets.map((planet, i) => (
          <motion.button
            key={planet.id}
            className="left-nav-button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            onClick={() => onSelectPlanet(planet)}
            data-hover
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              background: activePlanet?.id === planet.id
                ? `rgba(6,18,50,0.9)`
                : "rgba(6,18,50,0.5)",
              border: `1px solid ${activePlanet?.id === planet.id ? planet.glowColor : "rgba(6,182,212,0.15)"}`,
              borderRadius: 10,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: activePlanet?.id === planet.id
                ? `0 0 20px ${planet.glowColor}40`
                : "none",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{ x: 4, scale: 1.02 }}
          >
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: planet.glowColor,
              boxShadow: `0 0 8px ${planet.glowColor}`,
              flexShrink: 0,
            }} />
            <div style={{ textAlign: "left" }}>
              <div
                className="left-nav-label"
                style={{
                  fontFamily: "Orbitron, monospace",
                  fontSize: 9,
                  color: planet.glowColor,
                  letterSpacing: "0.1em",
                }}
              >{planet.label}</div>
              <div
                className="left-nav-sublabel"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                }}
              >{planet.name}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom HUD bar */}
      <motion.div
        className="bottom-hud-instructions"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "Orbitron, monospace",
          fontSize: 10,
          color: "rgba(6,182,212,0.5)",
          letterSpacing: "0.25em",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <span className="desktop-hint">DRAG TO ORBIT  •  SCROLL TO ZOOM  •  CLICK PLANET TO EXPLORE</span>
        <span className="mobile-hint">TAP PLANET TO EXPLORE  •  PINCH TO ZOOM  •  🚀 FIND THE ROCKET!</span>
      </motion.div>

      {/* Active planet indicator */}
      <AnimatePresence>
        {activePlanet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Orbitron, monospace",
              fontSize: 11,
              color: activePlanet.glowColor,
              letterSpacing: "0.3em",
              textShadow: `0 0 15px ${activePlanet.glowColor}`,
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            ◈ LOCKED ON: {activePlanet.name.toUpperCase()} ◈
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
