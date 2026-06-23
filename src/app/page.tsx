"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

// Always mount the canvas — never unmount it to avoid WebGL context flash
const CosmicUniverse = dynamic(() => import("@/components/CosmicUniverse"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "fading" | "ready">("loading");

  useEffect(() => {
    // Let the canvas silently pre-load in background; show loading screen for ~3.5s
    const fadeTimer = setTimeout(() => setPhase("fading"), 3400);
    const readyTimer = setTimeout(() => setPhase("ready"), 4200);
    return () => { clearTimeout(fadeTimer); clearTimeout(readyTimer); };
  }, []);

  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#000008" }}>

      {/* 3D canvas always mounted so WebGL context never resets */}
      <div style={{
        position: "fixed", inset: 0,
        opacity: phase === "loading" ? 0 : 1,
        transition: "opacity 1.2s ease",
        pointerEvents: phase === "loading" ? "none" : "all",
        zIndex: 0,
      }}>
        <CosmicUniverse />
      </div>

      {/* Loading screen fades out smoothly */}
      <div style={{
        position: "fixed", inset: 0,
        opacity: phase === "fading" ? 0 : phase === "loading" ? 1 : 0,
        transition: "opacity 0.9s ease",
        pointerEvents: phase !== "loading" ? "none" : "all",
        zIndex: 9999,
      }}>
        {phase !== "ready" && <LoadingScreen />}
      </div>
    </main>
  );
}
