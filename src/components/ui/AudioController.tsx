"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioController() {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying((p) => !p);
    // Howler integration can be wired here
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      onClick={toggle}
      data-hover
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: "absolute",
        top: 22,
        right: 22,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(6,18,50,0.7)",
        border: `1px solid ${playing ? "rgba(6,182,212,0.6)" : "rgba(6,182,212,0.2)"}`,
        color: playing ? "#06b6d4" : "rgba(6,182,212,0.4)",
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        boxShadow: playing ? "0 0 20px rgba(6,182,212,0.3)" : "none",
        transition: "all 0.3s ease",
        pointerEvents: "all",
        zIndex: 30,
      }}
      title={playing ? "Mute" : "Enable Sound"}
    >
      {playing ? "🔊" : "🔇"}
    </motion.button>
  );
}
