"use client";

import { motion } from "framer-motion";
import type { PlanetData } from "@/data/planets";

const EXPERIENCES = [
  {
    id: "pantech",
    org: "Pantech eLearning Pvt. Ltd.",
    role: "Full Stack Web Development Intern",
    duration: "May 2025 – Jun 2025",
    type: "Internship",
    color: "#f59e0b",
    icon: "💻",
    points: [
      "Built full-stack features, collaborating in an agile team environment.",
      "Contributed to a major project that included secure role-based authentication and full CRUD workflows.",
    ],
  },
  {
    id: "cecri-iot",
    org: "CSIR-CECRI, Karaikudi",
    role: "AI-Integrated IoT Intern",
    duration: "June 2025",
    type: "Research Internship",
    color: "#06b6d4",
    icon: "🔌",
    points: [
      "Worked on AI-integrated IoT solutions involving sensor data collection, monitoring, and real-time analytics.",
      "Explored ESP32-based systems, data visualization, and AI-driven insights for intelligent automation.",
      "Gained hands-on experience in IoT architecture, embedded systems, and applied Artificial Intelligence.",
    ],
  },
  {
    id: "vedant",
    org: "Vedant IT Solution Pvt. Ltd.",
    role: "AI in Data Analytics Intern",
    duration: "May 2025 – Jun 2025",
    type: "Internship",
    color: "#a855f7",
    icon: "📊",
    points: [
      "Performed detailed data analysis and visualization using Python and modern analytics libraries.",
      "Worked on data preprocessing, exploratory data analysis (EDA), and generating key business insights from datasets.",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "National AI Olympiad Merit", issuer: "National AI Olympiad", year: "2025", color: "#4285f4", icon: "🏆" },
  { name: "AI using Microcontrollers", issuer: "CSIR-CECRI", year: "2026", color: "#34a853", icon: "⚡" },
  { name: "Universal Human Values", issuer: "AICTE", year: "2025", color: "#ff6b35", icon: "🤝" },
  { name: "Full Stack Web Dev", issuer: "Pantech eLearning", year: "2025", color: "#9c27b0", icon: "🌐" },
  { name: "AI-Integrated IoT Research", issuer: "CSIR-CECRI", year: "2025", color: "#e91e63", icon: "🔌" },
  { name: "AI in Data Analytics", issuer: "Vedant IT Solution", year: "2025", color: "#ff9800", icon: "📊" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ExperiencePanel({ planet }: { planet: PlanetData }) {
  return (
    <div>
      {/* Experience */}
      <div style={{ marginBottom: 28 }}>
        <SectionTitle title="Work Experience" color="#f59e0b" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="glass-card"
              style={{ padding: "18px 20px", borderLeft: `3px solid ${exp.color}50` }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: `${exp.color}15`,
                  border: `1px solid ${exp.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}>
                  {exp.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 2 }}>
                    <h4 style={{ fontFamily: "Orbitron, monospace", fontSize: 12, color: "#fff", fontWeight: 700 }}>
                      {exp.role}
                    </h4>
                    <span style={{
                      padding: "2px 10px",
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}30`,
                      borderRadius: 20,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 10,
                      color: exp.color,
                    }}>
                      {exp.type}
                    </span>
                  </div>
                  <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: exp.color, marginBottom: 2 }}>
                    {exp.org}
                  </div>
                  <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", marginBottom: 12, letterSpacing: "0.1em" }}>
                    {exp.duration}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: exp.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>◈</span>
                        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div style={{ marginBottom: 28 }}>
        <SectionTitle title="Certifications" color="#f59e0b" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card"
              style={{ padding: "12px 14px" }}
              whileHover={{ y: -3, borderColor: `${cert.color}40` }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: `${cert.color}15`,
                  border: `1px solid ${cert.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {cert.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginBottom: 2 }}>
                    {cert.name}
                  </div>
                  <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10, color: cert.color }}>
                    {cert.issuer} · {cert.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workshops */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <SectionTitle title="Workshops & Training" color="#f59e0b" />
        <div className="glass-card" style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "5-day Skill Development: AI using Microcontrollers (CSIR-CECRI)",
              "6-day Workshop: Universal Human Values (AICTE)",
              "Hackspora 2K25 National Hackathon Committee",
              "தீர்வு'athon 2025 Idea Pitch Hackathon Participant",
            ].map((w) => (
              <span key={w} style={{
                padding: "5px 12px",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 6,
                fontFamily: "Rajdhani, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
              }}>
                🎯 {w}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 3, height: 16, background: color, borderRadius: 2 }} />
      <h3 style={{
        fontFamily: "Orbitron, monospace",
        fontSize: 10,
        fontWeight: 700,
        color,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}>
        {title}
      </h3>
    </div>
  );
}
