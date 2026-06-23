"use client";

import { motion } from "framer-motion";
import type { PlanetData } from "@/data/planets";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AboutPanel({ planet }: { planet: PlanetData }) {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
  });

  return (
    <div>
      {/* Hero section */}
      <motion.div {...fadeUp(0)} style={{ display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        {/* Avatar */}
        <div style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #1a6b3c, #0a3d22)`,
          border: "3px solid #22c55e50",
          boxShadow: "0 0 30px #22c55e30",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
          flexShrink: 0,
        }}>
          👨‍💻
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{
            fontFamily: "Orbitron, monospace",
            fontSize: "clamp(18px, 2.5vw, 26px)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: 4,
          }}>
            Adeep Mohamed P
          </h3>
          <div style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: 14,
            color: "#22c55e",
            letterSpacing: "0.2em",
            marginBottom: 14,
          }}>
            AI & DATA SCIENCE ENGINEER
          </div>
          <p style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
          }}>
            Dedicated B.Tech Artificial Intelligence and Data Science student with internship experience in AI-Integrated IoT, Data Analytics, and Full Stack Development. Proficient in Python, Java, web technologies, and database management, with strong problem-solving and communication skills. Eager to contribute technical expertise and grow in a challenging professional environment.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.15)} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 12,
        marginBottom: 28,
      }}>
        {[
          { label: "Projects", value: "5", icon: "🚀" },
          { label: "CGPA", value: "7.8", icon: "📈" },
          { label: "Internships", value: "3", icon: "💼" },
          { label: "Year", value: "3rd Yr", icon: "🎓" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card" style={{ padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontFamily: "Orbitron, monospace", fontSize: 18, fontWeight: 700, color: "#22c55e" }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Education */}
      <motion.div {...fadeUp(0.25)} style={{ marginBottom: 28 }}>
        <SectionTitle title="Education" color="#22c55e" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* B.Tech */}
          <div className="glass-card" style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>🏛️</div>
              <div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: 12, color: "#22c55e", marginBottom: 3 }}>
                  B.Tech Artificial Intelligence and Data Science
                </div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                  Karpagam Academy of Higher Education
                </div>
                <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                  2024 – 2028  •  CGPA: 7.8
                </div>
              </div>
            </div>
          </div>

          {/* Schooling */}
          <div className="glass-card" style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>🏫</div>
              <div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: 12, color: "#22c55e", marginBottom: 3 }}>
                  Higher Secondary Certificate (XII) & Secondary School Leaving Certificate (X)
                </div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                  Star Matriculation Higher Secondary School, Tuticorin
                </div>
                <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                  HSC: 74.5% (2024)  •  SSLC: 73% (2022)
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div {...fadeUp(0.35)}>
        <SectionTitle title="Interests & Passions" color="#22c55e" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 12,
        }}>
          {[
            { name: "Drawing", icon: "🎨", desc: "Creative art & sketches" },
            { name: "Coding", icon: "💻", desc: "Building algorithms" },
            { name: "Learning", icon: "🧠", desc: "Exploring new tech" },
            { name: "Football", icon: "⚽", desc: "Sports & active fitness" },
          ].map((interest) => (
            <div key={interest.name} className="glass-card" style={{ padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{interest.icon}</div>
              <div style={{ fontFamily: "Orbitron, monospace", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                {interest.name}
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
                {interest.desc}
              </div>
            </div>
          ))}
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
        fontSize: 11,
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
