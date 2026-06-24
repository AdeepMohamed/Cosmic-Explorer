"use client";

import { Suspense, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import GalaxyStarfield from "./three/GalaxyStarfield";
import AdvancedSun from "./three/AdvancedSun";
import AdvancedPlanet from "./three/AdvancedPlanet";
import OrbitRing from "./three/OrbitRing";
import AsteroidBelt from "./three/AsteroidBelt";
import PostProcessing from "./three/PostProcessing";
import CameraRig from "./three/CameraRig";
import FloatingRocket from "./three/FloatingRocket";
import CosmicUI from "./ui/CosmicUI";
import WelcomeBanner from "./ui/WelcomeBanner";
import AudioController from "./ui/AudioController";
import ImmersiveOverlay from "./ui/ImmersiveOverlay";
import ResumeModal from "./ui/ResumeModal";
import { PLANETS } from "@/data/planets";
import type { PlanetData } from "@/data/planets";

// Per-planet atmosphere and color configuration
const PLANET_CONFIG: Record<string, {
  type: number;
  atmoColor: THREE.Color;
  atmoIntensity: number;
  c1: THREE.Color; c2: THREE.Color; c3: THREE.Color; c4: THREE.Color;
}> = {
  about:        { type: 0, atmoColor: new THREE.Color("#4488ff"), atmoIntensity: 1.4, c1: new THREE.Color("#1a6b3c"), c2: new THREE.Color("#4488ff"), c3: new THREE.Color("#ffffff"), c4: new THREE.Color("#88aaff") },
  skills:       { type: 1, atmoColor: new THREE.Color("#8822ff"), atmoIntensity: 1.1, c1: new THREE.Color("#00ffcc"), c2: new THREE.Color("#8822ff"), c3: new THREE.Color("#ff00aa"), c4: new THREE.Color("#ffffff") },
  projects:     { type: 2, atmoColor: new THREE.Color("#0088ff"), atmoIntensity: 1.3, c1: new THREE.Color("#00ccff"), c2: new THREE.Color("#0044aa"), c3: new THREE.Color("#00ffaa"), c4: new THREE.Color("#ffffff") },
  experience:   { type: 3, atmoColor: new THREE.Color("#ff8822"), atmoIntensity: 0.9, c1: new THREE.Color("#cc6600"), c2: new THREE.Color("#ff9944"), c3: new THREE.Color("#884400"), c4: new THREE.Color("#ffcc88") },
  achievements: { type: 4, atmoColor: new THREE.Color("#ffcc00"), atmoIntensity: 1.3, c1: new THREE.Color("#ffbb00"), c2: new THREE.Color("#ff8800"), c3: new THREE.Color("#ffee88"), c4: new THREE.Color("#ffffff") },
  contact:      { type: 5, atmoColor: new THREE.Color("#ff00cc"), atmoIntensity: 1.1, c1: new THREE.Color("#cc00ff"), c2: new THREE.Color("#ff0088"), c3: new THREE.Color("#440066"), c4: new THREE.Color("#ff88ff") },
};

export default function CosmicUniverse() {
  const [activePlanet, setActivePlanet]   = useState<PlanetData | null>(null);
  const [showWelcome, setShowWelcome]     = useState(true);
  const [isFlying, setIsFlying]           = useState(false);
  const [showContent, setShowContent]     = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const orbitRef    = useRef<any>(null);
  const planetPositions = useRef<Map<string, THREE.Vector3>>(new Map());

  const handlePlanetClick = useCallback((planet: PlanetData) => {
    if (isFlying) return;
    setActivePlanet(planet);
    setShowContent(false);
    if (orbitRef.current) orbitRef.current.enabled = false;
  }, [isFlying]);

  const handleClose = useCallback(() => {
    setShowContent(false);
    setActivePlanet(null);
    if (orbitRef.current) orbitRef.current.enabled = true;
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#000008" }}>
      {/* ── 3D Canvas ─────────────────────────────────────────────────────── */}
      <Canvas
        id="cosmic-canvas"
        camera={{ position: [0, 28, 85], fov: 55, near: 0.1, far: 6000 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,  // reduced from 1.2 to prevent over-bright
        }}
        style={{ background: "#000008" }}
      >
        <Suspense fallback={null}>
          {/* Global ambient — very dim space lighting */}
          <ambientLight intensity={0.03} color="#0a1030" />

          {/* Galaxy background — spiral Milky Way */}
          <GalaxyStarfield />

          {/* Central star */}
          <AdvancedSun />

          {/* Orbital guide rings */}
          {PLANETS.map(p => (
            <OrbitRing key={`ring-${p.id}`} radius={p.orbitRadius} color={p.glowColor} />
          ))}

          {/* Asteroid belt between orbit 3 and 4 */}
          <AsteroidBelt />

          {/* Planets with PBR shaders */}
          {PLANETS.map(p => {
            const cfg = PLANET_CONFIG[p.id];
            return (
              <AdvancedPlanet
                key={p.id}
                planet={p}
                planetTypeIndex={cfg.type}
                atmosphereColor={cfg.atmoColor}
                atmosphereIntensity={cfg.atmoIntensity}
                color1={cfg.c1}
                color2={cfg.c2}
                color3={cfg.c3}
                color4={cfg.c4}
                onClick={() => handlePlanetClick(p)}
                isActive={activePlanet?.id === p.id}
                planetPositions={planetPositions}
              />
            );
          })}

          {/* Cinematic post-processing */}
          <PostProcessing />

          {/* Roaming rocket — catch it for the resume! */}
          <FloatingRocket onCatch={() => setShowResumeModal(true)} />

          {/* GSAP camera fly-to rig */}
          <CameraRig
            activePlanet={activePlanet}
            planetPositions={planetPositions}
            onArrived={() => setShowContent(true)}
            onDeparted={() => { if (orbitRef.current) orbitRef.current.enabled = true; }}
            isFlying={isFlying}
            setIsFlying={setIsFlying}
          />

          {/* Orbit controls — disabled during fly-to animation */}
          <OrbitControls
            ref={orbitRef}
            enablePan={false}
            enableZoom={!isFlying}
            minDistance={18}
            maxDistance={200}
            minPolarAngle={Math.PI / 9}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={!activePlanet && !isFlying}
            autoRotateSpeed={0.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* ── 2D UI Layer — always pointer-events:none until needed ─────────── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}>
        {/* Welcome banner */}
        <AnimatePresence mode="wait">
          {showWelcome && !activePlanet && (
            <WelcomeBanner key="welcome" onDismiss={() => setShowWelcome(false)} />
          )}
        </AnimatePresence>

        {/* Navigation HUD — slides in only after welcome dismissed */}
        <AnimatePresence>
          {!showWelcome && (
            <motion.div
              key="hud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <CosmicUI
                planets={PLANETS}
                activePlanet={activePlanet}
                onSelectPlanet={handlePlanetClick}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio mute toggle */}
        <AudioController />

        {/* Warp drive indicator */}
        <AnimatePresence>
          {isFlying && (
            <motion.div
              key="warp"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                bottom: 72,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Orbitron, monospace",
                fontSize: 10,
                letterSpacing: "0.35em",
                color: activePlanet?.glowColor ?? "#06b6d4",
                textShadow: `0 0 18px ${activePlanet?.glowColor ?? "#06b6d4"}`,
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            className="warp-indicator"
            >
              ◈ ENGAGING WARP DRIVE ◈
            </motion.div>
          )}
        </AnimatePresence>

        {/* Planet content — immersive full-screen holographic overlay */}
        <AnimatePresence mode="wait">
          {showContent && activePlanet && (
            <ImmersiveOverlay
              key={activePlanet.id}
              planet={activePlanet}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Resume download modal (triggered by catching the rocket) ─── */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
}
