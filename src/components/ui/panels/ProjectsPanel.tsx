"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData } from "@/data/planets";

const PROJECTS = [
  {
    id: "resume-analyzer",
    name: "AI Resume Analyzer",
    tagline: "AI-Powered ATS Score & Resume Optimizer",
    icon: "📄",
    color: "#06b6d4",
    tags: ["React", "TypeScript", "Supabase", "Gemini API"],
    description: "An AI-powered platform that analyzes resumes, calculates Applicant Tracking System (ATS) scores, parses documents, and provides personalized improvement suggestions to help candidates land interviews.",
    features: ["ATS Score Calculation", "Personalized Section Feedback", "Key Skill & Keyword Analysis", "PDF Document Parsing", "User History & Analytics"],
    github: "https://github.com/Adeep",
    status: "Complete",
  },
  {
    id: "interview-assistant",
    name: "AI Interview Prep Assistant",
    tagline: "Intelligent Response Evaluation Engine",
    icon: "🗣️",
    color: "#10b981",
    tags: ["React", "TypeScript", "Supabase", "Gemini API"],
    description: "An intelligent interview preparation tool that generates role-specific technical and behavioral questions and evaluates candidate responses using Gemini LLM to provide performance scores.",
    features: ["Dynamic Question Generation", "Real-Time Speech Evaluation", "Constructive Feedback Loop", "Score Metrics & Analytics", "Interview Simulator Session"],
    github: "https://github.com/Adeep",
    status: "Complete",
  },
  {
    id: "medivault",
    name: "MediVault AI Health Assistant",
    tagline: "Secure Medical Records & Diagnosis Insights",
    icon: "🏥",
    color: "#3b82f6",
    tags: ["React", "Django", "PostgreSQL", "Gemini API"],
    description: "A secure medical records healthcare platform featuring AI-powered document summarization, medical report analysis, diagnostic insights, and a query-based personal health assistant.",
    features: ["AI Diagnostic Summarization", "Secure Document Repository", "Role-Based Medical Views", "Medical Report Insights", "Interactive Health Chatbot"],
    github: "https://github.com/Adeep",
    status: "Complete",
  },
  {
    id: "campus-assistant",
    name: "AI Smart Campus Assistant",
    tagline: "Connected Campus Support Chatbot",
    icon: "🏫",
    color: "#f59e0b",
    tags: ["React", "TypeScript", "Supabase", "Gemini API"],
    description: "An AI-driven campus assistant that provides academic information, event schedules, university resources, and direct student support through an intuitive chatbot interface.",
    features: ["Smart Campus Q&A Bot", "Event Tracking & Calendars", "Academic Advisor Links", "Campus Map Navigator", "Notifications & Announcements"],
    github: "https://github.com/Adeep",
    status: "Complete",
  },
  {
    id: "expense-tracker",
    name: "AI Financial Expense Tracker",
    tagline: "Smart Budgeting & Expense Advisor",
    icon: "💰",
    color: "#ec4899",
    tags: ["React", "TypeScript", "Supabase", "Gemini API"],
    description: "A personal finance management system that tracks spending patterns, visualizes budgets, and provides custom AI-based budgeting advice and savings recommendations.",
    features: ["Automated Spending Classifier", "AI Saving Advisor", "Financial Goal Trackers", "Interactive Budget Charts", "Anomaly Spending Alerts"],
    github: "https://github.com/Adeep",
    status: "Complete",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Live": "#10b981",
  "Prototype": "#f59e0b",
  "Research": "#3b82f6",
  "In Progress": "#a855f7",
  "Complete": "#06b6d4",
  "Active": "#ec4899",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProjectsPanel({ planet }: { planet: PlanetData }) {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        Five research stations floating in orbit — each representing a mission to build intelligent web apps using React, Python, and the Gemini API.
      </motion.p>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                onClick={() => setSelected(project)}
                data-hover
                whileHover={{ y: -4, boxShadow: `0 8px 30px ${project.color}25` }}
                style={{
                  padding: "16px 18px",
                  cursor: "pointer",
                  borderColor: `${project.color}20`,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow top */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                  opacity: 0.7,
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{project.icon}</span>
                  <span style={{
                    padding: "2px 8px",
                    background: `${STATUS_COLORS[project.status]}15`,
                    border: `1px solid ${STATUS_COLORS[project.status]}40`,
                    borderRadius: 20,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 10,
                    color: STATUS_COLORS[project.status],
                    letterSpacing: "0.1em",
                  }}>
                    {project.status}
                  </span>
                </div>

                <h4 style={{
                  fontFamily: "Orbitron, monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}>
                  {project.name}
                </h4>
                <p style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: 11,
                  color: project.color,
                  marginBottom: 10,
                  letterSpacing: "0.05em",
                }}>
                  {project.tagline}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{
                      padding: "2px 7px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 4,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.45)",
                    }}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", padding: "2px 4px" }}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 10, fontFamily: "Orbitron, monospace", fontSize: 9, color: project.color, opacity: 0.7 }}>
                  CLICK TO ENTER →
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            {/* Back button */}
            <button
              onClick={() => setSelected(null)}
              data-hover
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                background: "transparent",
                border: "none",
                color: selected.color,
                cursor: "pointer",
                fontFamily: "Orbitron, monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
              }}
            >
              ← BACK TO PROJECTS
            </button>

            {/* Project detail */}
            <div className="glass-card" style={{ padding: "22px 24px", borderColor: `${selected.color}30`, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{selected.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: 18, color: "#fff", marginBottom: 4 }}>
                    {selected.name}
                  </h3>
                  <p style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13, color: selected.color, letterSpacing: "0.1em" }}>
                    {selected.tagline}
                  </p>
                </div>
              </div>
              <p style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                marginBottom: 18,
              }}>
                {selected.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: selected.color, letterSpacing: "0.2em", marginBottom: 10 }}>
                  KEY FEATURES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.features.map((f) => (
                    <span key={f} style={{
                      padding: "5px 12px",
                      background: `${selected.color}12`,
                      border: `1px solid ${selected.color}30`,
                      borderRadius: 6,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.7)",
                    }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: selected.color, letterSpacing: "0.2em", marginBottom: 10 }}>
                  TECH STACK
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selected.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 4,
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  style={{
                    padding: "10px 20px",
                    background: `${selected.color}18`,
                    border: `1px solid ${selected.color}40`,
                    borderRadius: 8,
                    color: selected.color,
                    fontFamily: "Orbitron, monospace",
                    fontSize: 10,
                    cursor: "pointer",
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    transition: "all 0.3s ease",
                  }}
                >
                  ⭐ GITHUB
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
