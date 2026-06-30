"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData } from "@/data/planets";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ContactPanel({ planet }: { planet: PlanetData }) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [satellite, setSatellite] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSatellite(true);
      setTimeout(() => {
        setSatellite(false);
        setSent(true);
      }, 1800);
    }, 1000);
  };

  const LINKS = [
    { label: "Email", value: "adeepmohamed78@gmail.com", icon: "📧", color: "#06b6d4", href: "mailto:adeepmohamed78@gmail.com" },
    { label: "Phone", value: "+91 8220905244", icon: "📞", color: "#10b981", href: "tel:+918220905244" },
    { label: "GitHub", value: "github.com/AdeepMohamed", icon: "⭐", color: "#a855f7", href: "https://github.com/AdeepMohamed" },
    { label: "Location", value: "Tuticorin, TN", icon: "📍", color: "#f59e0b", href: "https://maps.google.com/?q=Tuticorin,Tamil+Nadu" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(6,18,50,0.6)",
    border: "1px solid rgba(6,182,212,0.2)",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <div>
      {/* Contact links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 28 }}
      >
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            data-hover
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              cursor: "pointer",
              borderColor: `${link.color}20`,
              transition: "all 0.3s ease",
            }}
            whileHover={{ y: -3, boxShadow: `0 8px 25px ${link.color}20` }}
          >
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: `${link.color}15`,
              border: `1px solid ${link.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>
              {link.icon}
            </div>
            <div>
              <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: link.color, letterSpacing: "0.15em", marginBottom: 2 }}>
                {link.label}
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>
                {link.value}
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Message form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <SectionTitle title="Send a Transmission" color="#ec4899" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: "40px 28px", textAlign: "center" }}
            >
              <div style={{ fontSize: 56, marginBottom: 16 }}>🛸</div>
              <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: 16, color: "#10b981", marginBottom: 8 }}>
                MESSAGE TRANSMITTED!
              </h3>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                Your satellite is en route through the cosmos. Adeep will respond shortly.
              </p>
              <motion.button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                data-hover
                whileHover={{ scale: 1.05 }}
                style={{ marginTop: 20, padding: "10px 24px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, color: "#10b981", fontFamily: "Orbitron, monospace", fontSize: 10, cursor: "pointer", letterSpacing: "0.15em" }}
              >
                SEND ANOTHER
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card"
              style={{ padding: "20px 22px" }}
            >
              {/* Satellite launch animation */}
              <AnimatePresence>
                {satellite && (
                  <motion.div
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ x: 200, y: -300, scale: 0.1, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                    style={{ position: "absolute", fontSize: 28, zIndex: 200, pointerEvents: "none" }}
                  >
                    🛸
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "#ec4899", letterSpacing: "0.2em", display: "block", marginBottom: 6 }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Explorer Name"
                    style={inputStyle}
                    data-hover
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "#ec4899", letterSpacing: "0.2em", display: "block", marginBottom: 6 }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="explorer@galaxy.com"
                    style={inputStyle}
                    data-hover
                  />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "#ec4899", letterSpacing: "0.2em", display: "block", marginBottom: 6 }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  placeholder="Mission briefing..."
                  style={inputStyle}
                  data-hover
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "#ec4899", letterSpacing: "0.2em", display: "block", marginBottom: 6 }}>
                  MESSAGE
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  placeholder="Transmit your message across the cosmos..."
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  data-hover
                />
              </div>
              <motion.button
                type="submit"
                data-hover
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: sending
                    ? "rgba(6,182,212,0.1)"
                    : "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(107,33,168,0.2))",
                  border: "1px solid rgba(236,72,153,0.4)",
                  borderRadius: 10,
                  color: sending ? "rgba(255,255,255,0.4)" : "#fff",
                  fontFamily: "Orbitron, monospace",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  cursor: sending ? "not-allowed" : "pointer",
                  boxShadow: "0 0 20px rgba(236,72,153,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {sending ? "TRANSMITTING..." : "🛸 LAUNCH TRANSMISSION"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: 16, textAlign: "center" }}
      >
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
          <span style={{ color: "#10b981" }}>●</span> AVAILABLE FOR OPPORTUNITIES · OPEN TO COLLABORATION
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
