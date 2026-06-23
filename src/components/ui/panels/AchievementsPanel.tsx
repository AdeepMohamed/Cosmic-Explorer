"use client";

import { motion } from "framer-motion";
import type { PlanetData } from "@/data/planets";

const ACHIEVEMENTS = [
  {
    title: "National AI Olympiad 2025",
    category: "Olympiad",
    icon: "🏆",
    color: "#fbbf24",
    desc: "Achieved Certificate of Merit in the National AI Olympiad 2025 (Advanced) with an outstanding All India Rank 16.",
    year: "2025",
  },
  {
    title: "World Environment Day Poster",
    category: "1st Prize",
    icon: "🎨",
    color: "#10b981",
    desc: "Won 1st Prize in the poster presentation competition on 'Social Justice & Equality' organized at Karpagam Academy of Higher Education.",
    year: "2026",
  },
  {
    title: "Math Feast 2025 Quiz",
    category: "3rd Prize",
    icon: "🧠",
    color: "#3b82f6",
    desc: "Secured 3rd Prize in the Math Feast 2025 Quiz Competition organized by the Department of Science & Humanities, KAHE.",
    year: "2025",
  },
  {
    title: "Hackspora 2K25",
    category: "Organizer",
    icon: "⚡",
    color: "#ec4899",
    desc: "Organizing Committee Member of the AiQubit Association, coordinating a 24-hour national level hackathon with multi-stage reviews.",
    year: "2025",
  },
  {
    title: "তீர்வு'athon 2025 Pitching",
    category: "Hackathon",
    icon: "🏍️",
    color: "#8b5cf6",
    desc: "Presented 'Smart Helmet Security System', an AI-based rider safety solution utilizing helmet detection and face recognition at PSG College.",
    year: "2025",
  },
  {
    title: "Entrepreneurship Poster Presentation",
    category: "3rd Prize",
    icon: "💡",
    color: "#f59e0b",
    desc: "Won 3rd Prize in the Poster Presentation at the Workshop on Entrepreneurship & Innovation as a Career Opportunity, KAHE.",
    year: "2024",
  },
];

const STATS = [
  { label: "Hackathons", value: "2", icon: "⚡" },
  { label: "Awards Won", value: "4", icon: "🏆" },
  { label: "Olympiad Rank", value: "16", icon: "🎓" },
  { label: "AI Projects", value: "5", icon: "🚀" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AchievementsPanel({ planet }: { planet: PlanetData }) {
  return (
    <div>
      {/* Trophy stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ padding: "14px 10px", textAlign: "center" }}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
            <div style={{
              fontFamily: "Orbitron, monospace",
              fontSize: 20,
              fontWeight: 800,
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 3,
            }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement cards */}
      <SectionTitle title="Hall of Achievements" color="#fbbf24" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {ACHIEVEMENTS.map((ach, i) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card"
            style={{
              padding: "16px 18px",
              position: "relative",
              overflow: "hidden",
              borderColor: `${ach.color}25`,
            }}
            whileHover={{ y: -3, boxShadow: `0 8px 25px ${ach.color}20` }}
          >
            {/* Beam effect */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)`,
            }} />

            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${ach.color}15`,
                border: `1px solid ${ach.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}>
                {ach.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: "Orbitron, monospace", fontSize: 10, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                  {ach.title}
                </h4>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{
                    padding: "1px 8px",
                    background: `${ach.color}12`,
                    border: `1px solid ${ach.color}25`,
                    borderRadius: 20,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 9,
                    color: ach.color,
                    letterSpacing: "0.1em",
                  }}>
                    {ach.category}
                  </span>
                  <span style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                    {ach.year}
                  </span>
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
            }}>
              {ach.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Academic milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ marginTop: 22 }}
      >
        <SectionTitle title="Extracurricular & Societies" color="#fbbf24" />
        <div className="glass-card" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Member, ISTE Student Chapter - Karpagam Academy (First year - present). Led technical events, coordinated workshops, and managed outreach.", icon: "🏛️" },
              { label: "Member, AiQubit Association (Second year - present). Selected through a competitive process to represent AI & DS batch in advanced tech.", icon: "⚛️" },
              { label: "Language Skills: Tamil (Native) & English (Professional Working Proficiency)", icon: "🗣️" },
              { label: "Passionate about Drawing, Coding, Football, and constant Skill Acquisition", icon: "⚽" },
            ].map((m) => (
              <div key={m.label} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {m.label}
                </span>
              </div>
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
      <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: 10, fontWeight: 700, color, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {title}
      </h3>
    </div>
  );
}
