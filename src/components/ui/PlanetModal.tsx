"use client";

import { motion } from "framer-motion";
import type { PlanetData } from "@/data/planets";
import AboutPanel from "./panels/AboutPanel";
import SkillsPanel from "./panels/SkillsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import AchievementsPanel from "./panels/AchievementsPanel";
import ContactPanel from "./panels/ContactPanel";

interface PlanetModalProps {
  planet: PlanetData;
  onClose: () => void;
}

const PANEL_MAP: Record<string, React.ComponentType<any>> = {
  about: AboutPanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  achievements: AchievementsPanel,
  contact: ContactPanel,
};

export default function PlanetModal({ planet, onClose }: PlanetModalProps) {
  const Panel = PANEL_MAP[planet.id];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,8,0.75)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
          pointerEvents: "all",
        }}
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="planet-modal"
        style={{ zIndex: 100, pointerEvents: "all" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="glass-card-intense"
          style={{ overflow: "hidden", position: "relative" }}
        >
          {/* Header */}
          <div style={{
            padding: "22px 28px 16px",
            borderBottom: `1px solid ${planet.glowColor}30`,
            background: `linear-gradient(135deg, rgba(6,18,50,0.9) 0%, rgba(6,18,50,0.7) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Planet indicator */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.emissive})`,
                boxShadow: `0 0 20px ${planet.glowColor}60`,
                border: `2px solid ${planet.glowColor}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}>
                {planet.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: "Orbitron, monospace",
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: planet.glowColor,
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}>
                  ◈ {planet.name}
                </div>
                <h2 style={{
                  fontFamily: "Orbitron, monospace",
                  fontSize: "clamp(14px, 2.5vw, 20px)",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}>
                  {planet.label}
                </h2>
              </div>
            </div>

            {/* Decorative scan + Close */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                fontFamily: "Orbitron, monospace",
                fontSize: 9,
                color: `${planet.glowColor}80`,
                textAlign: "right",
                letterSpacing: "0.1em",
              }}>
                <div>SCAN COMPLETE</div>
                <div style={{ color: planet.glowColor }}>● ACTIVE</div>
              </div>
              <button
                onClick={onClose}
                className="close-btn"
                data-hover
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Glow accent bar */}
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${planet.glowColor}, transparent)`,
            opacity: 0.6,
          }} />

          {/* Content */}
          <div style={{ padding: "24px 28px 28px", overflowY: "auto", maxHeight: "70vh" }}>
            {Panel && <Panel planet={planet} />}
          </div>
        </div>
      </motion.div>
    </>
  );
}
