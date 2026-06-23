"use client";

import { motion } from "framer-motion";
import type { PlanetData } from "@/data/planets";

const SKILLS = {
  "Programming": [
    { name: "Python", level: 92, icon: "🐍" },
    { name: "Java", level: 82, icon: "☕" },
    { name: "JavaScript", level: 85, icon: "⚡" },
    { name: "HTML / CSS", level: 90, icon: "🌐" },
    { name: "C", level: 75, icon: "🔧" },
  ],
  "Frameworks & Libs": [
    { name: "React.js", level: 88, icon: "⚛️" },
    { name: "Django", level: 85, icon: "🎸" },
    { name: "Flask", level: 80, icon: "🌶️" },
    { name: "Bootstrap", level: 85, icon: "🎨" },
    { name: "Django REST Framework", level: 82, icon: "🔌" },
  ],
  "Databases": [
    { name: "MySQL", level: 86, icon: "🗄️" },
    { name: "PostgreSQL", level: 80, icon: "🐘" },
    { name: "SQL", level: 88, icon: "📊" },
    { name: "Supabase", level: 83, icon: "⚡" },
  ],
  "AI / ML": [
    { name: "Machine Learning", level: 86, icon: "🤖" },
    { name: "Data Analysis & Visuals", level: 89, icon: "📊" },
    { name: "Artificial Intelligence", level: 85, icon: "🧠" },
    { name: "AI-Integrated IoT", level: 87, icon: "🔌" },
    { name: "Exploratory Data Analysis", level: 88, icon: "🔍" },
  ],
  "Tools & Platforms": [
    { name: "Git & GitHub", level: 88, icon: "🐙" },
    { name: "VS Code", level: 92, icon: "💻" },
    { name: "Firebase", level: 80, icon: "🔥" },
    { name: "Microsoft Excel", level: 85, icon: "📊" },
    { name: "Jupyter Notebook", level: 88, icon: "📓" },
    { name: "Antigravity", level: 84, icon: "🌌" },
  ]
};

const ACCENT = "#a855f7";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SkillsPanel({ planet }: { planet: PlanetData }) {
  return (
    <div>
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <p style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
        }}>
          A specialized skill set combining Artificial Intelligence, Data Science, and Full Stack Web Development to build next-generation intelligent platforms.
        </p>
      </motion.div>

      {Object.entries(SKILLS).map(([category, skills], ci) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.12 }}
          style={{ marginBottom: 24 }}
        >
          {/* Category header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 3, height: 16, background: ACCENT, borderRadius: 2 }} />
            <h3 style={{
              fontFamily: "Orbitron, monospace",
              fontSize: 10,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}>
              {category}
            </h3>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 10,
          }}>
            {skills.map((skill, si) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: ci * 0.12 + si * 0.06 }}
                className="glass-card"
                style={{ padding: "12px 14px" }}
                whileHover={{ borderColor: `${ACCENT}50`, scale: 1.02 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 14 }}>{skill.icon}</span>
                    <span style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                    }}>
                      {skill.name}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "Orbitron, monospace",
                    fontSize: 9,
                    color: ACCENT,
                  }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3 + ci * 0.1 + si * 0.05, duration: 1.2, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)`,
                      boxShadow: "0 0 6px #a855f7",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Certifications teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card"
        style={{ padding: "14px 18px", borderLeft: `3px solid ${ACCENT}50` }}
      >
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: 10, color: ACCENT, marginBottom: 8, letterSpacing: "0.2em" }}>
          ◈ TRAINING & CREDENTIALS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            "National AI Olympiad 2025 (Advanced)",
            "Universal Human Values (AICTE)",
            "AI using Microcontrollers (CSIR-CECRI)",
            "Full Stack Web Dev (Pantech)",
            "AI-Integrated IoT (CSIR-CECRI)",
            "Data Analytics (Vedant IT)"
          ].map((cert) => (
            <span key={cert} style={{
              padding: "4px 10px",
              background: "rgba(168,85,247,0.1)",
              border: "1px solid rgba(168,85,247,0.25)",
              borderRadius: 20,
              fontFamily: "Rajdhani, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.65)",
            }}>
              🏅 {cert}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
