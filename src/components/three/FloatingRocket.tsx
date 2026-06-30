"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingRocketProps {
  onCatch: () => void;
}

// ─── Animated Engine Plume ────────────────────────────────────────────────────
function EnginePlume({ hovered }: { hovered: boolean }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const midRef   = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const sparkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.85 + Math.sin(t * 18) * 0.15;
    const pulse2 = 0.9  + Math.sin(t * 11 + 1.3) * 0.1;
    const flicker = 0.95 + Math.sin(t * 31 + 0.7) * 0.05;

    if (innerRef.current) {
      innerRef.current.scale.set(pulse, 1 + Math.sin(t * 14) * 0.12, pulse);
      (innerRef.current.material as THREE.MeshBasicMaterial).opacity =
        (hovered ? 0.95 : 0.88) * flicker;
    }
    if (midRef.current) {
      midRef.current.scale.set(pulse2, 1 + Math.sin(t * 9 + 2) * 0.15, pulse2);
      (midRef.current.material as THREE.MeshBasicMaterial).opacity =
        (hovered ? 0.65 : 0.55) * flicker;
    }
    if (outerRef.current) {
      outerRef.current.scale.set(1, 1 + Math.sin(t * 7 + 4) * 0.18, 1);
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity =
        (hovered ? 0.32 : 0.22) * flicker;
    }
    if (sparkRef.current) {
      sparkRef.current.rotation.y = t * 3.5;
      sparkRef.current.scale.setScalar(0.88 + Math.sin(t * 22) * 0.12);
      (sparkRef.current.material as THREE.MeshBasicMaterial).opacity =
        (hovered ? 0.5 : 0.3) * flicker;
    }
  });

  const innerColor = hovered ? "#ffffff" : "#aadfff";
  const midColor   = hovered ? "#ffdd44" : "#44aaff";
  const outerColor = hovered ? "#ff6600" : "#0055cc";

  return (
    <group position={[0, -0.82, 0]}>
      {/* Diamond-hot core */}
      <mesh ref={innerRef} position={[0, -0.18, 0]}>
        <coneGeometry args={[0.1, 0.52, 10]} />
        <meshBasicMaterial
          color={innerColor}
          transparent opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mid flame layer */}
      <mesh ref={midRef} position={[0, -0.32, 0]}>
        <coneGeometry args={[0.18, 0.75, 10]} />
        <meshBasicMaterial
          color={midColor}
          transparent opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer diffuse plume */}
      <mesh ref={outerRef} position={[0, -0.5, 0]}>
        <coneGeometry args={[0.28, 1.05, 10]} />
        <meshBasicMaterial
          color={outerColor}
          transparent opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spinning spark disc */}
      <mesh ref={sparkRef} position={[0, -0.04, 0]}>
        <torusGeometry args={[0.1, 0.03, 4, 12]} />
        <meshBasicMaterial
          color={hovered ? "#ffee88" : "#88ccff"}
          transparent opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Nozzle-exit shock diamond (bright ring) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.13, 0.025, 6, 16]} />
        <meshBasicMaterial
          color={hovered ? "#ffcc44" : "#88ddff"}
          transparent opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Porthole Window ──────────────────────────────────────────────────────────
function Porthole({ position, hovered }: { position: [number, number, number]; hovered: boolean }) {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (glowRef.current) {
      const t = state.clock.elapsedTime;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 + Math.sin(t * 2.5) * 0.15;
    }
  });
  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.085, 0.022, 8, 20]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Glass pane */}
      <mesh ref={glowRef} position={[0, 0, 0.005]}>
        <circleGeometry args={[0.063, 20]} />
        <meshBasicMaterial
          color={hovered ? "#ffffaa" : "#44aaff"}
          transparent opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Interior reflection highlight */}
      <mesh position={[-0.022, 0.022, 0.01]}>
        <circleGeometry args={[0.018, 10]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Main Rocket Mesh ─────────────────────────────────────────────────────────
function RocketMesh({ hovered }: { hovered: boolean }) {
  const bodyColor  = hovered ? "#ddeeff" : "#c8d8f0";
  const accentColor = hovered ? "#ff7733" : "#cc3300";
  const metalColor  = "#7a8fa0";
  const darkMetal   = "#2a3540";

  return (
    <group>

      {/* ── Nose cone (ogive-like: stacked cones) */}
      <mesh position={[0, 1.12, 0]}>
        <coneGeometry args={[0.19, 0.28, 16]} />
        <meshStandardMaterial color={bodyColor} metalness={0.45} roughness={0.28}
          emissive={hovered ? "#334466" : "#111a28"} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <coneGeometry args={[0.235, 0.28, 16]} />
        <meshStandardMaterial color={bodyColor} metalness={0.42} roughness={0.30} />
      </mesh>

      {/* ── Nose tip cap */}
      <mesh position={[0, 1.27, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.1}
          emissive="#aaddff" emissiveIntensity={hovered ? 0.5 : 0.15} />
      </mesh>

      {/* ── Upper body */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.235, 0.245, 0.72, 20]} />
        <meshStandardMaterial color={bodyColor} metalness={0.48} roughness={0.25}
          emissive={hovered ? "#112244" : "#050d15"} emissiveIntensity={0.5} />
      </mesh>

      {/* ── Red accent stripe (band ring) */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.252, 0.252, 0.08, 20]} />
        <meshStandardMaterial color={accentColor} metalness={0.55} roughness={0.2}
          emissive={accentColor} emissiveIntensity={hovered ? 0.7 : 0.3} />
      </mesh>

      {/* ── Lower body */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.255, 0.28, 0.68, 20]} />
        <meshStandardMaterial color={bodyColor} metalness={0.48} roughness={0.28} />
      </mesh>

      {/* ── Second accent stripe */}
      <mesh position={[0, -0.64, 0]}>
        <cylinderGeometry args={[0.268, 0.268, 0.05, 20]} />
        <meshStandardMaterial color={accentColor} metalness={0.55} roughness={0.2}
          emissive={accentColor} emissiveIntensity={hovered ? 0.5 : 0.2} />
      </mesh>

      {/* ── Thruster collar */}
      <mesh position={[0, -0.73, 0]}>
        <cylinderGeometry args={[0.28, 0.31, 0.1, 20]} />
        <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.15} />
      </mesh>

      {/* ── Engine nozzle bell */}
      <mesh position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.155, 0.24, 0.26, 16, 1, true]} />
        <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.12}
          side={THREE.DoubleSide} />
      </mesh>

      {/* ── Nozzle inner heat ring */}
      <mesh position={[0, -0.99, 0]}>
        <torusGeometry args={[0.155, 0.018, 6, 16]} />
        <meshBasicMaterial color={hovered ? "#ff8800" : "#ff4400"}
          transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ── Porthole windows × 2 */}
      <Porthole position={[0.237, 0.25, 0]} hovered={hovered} />
      <Porthole position={[-0.237, 0.25, 0]} hovered={hovered} />

      {/* ── Delta fins × 4 */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.sin(rad) * 0.29;
        const z = Math.cos(rad) * 0.29;
        return (
          <group key={deg} position={[x, -0.5, z]} rotation={[0, -rad, 0]}>
            {/* Main fin panel */}
            <mesh position={[0.16, 0, 0]} rotation={[0, 0, -0.22]}>
              <boxGeometry args={[0.32, 0.52, 0.028]} />
              <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.3}
                emissive={hovered ? "#112244" : "#050d15"} emissiveIntensity={0.4} />
            </mesh>
            {/* Accent strip on fin */}
            <mesh position={[0.195, 0.05, 0]} rotation={[0, 0, -0.22]}>
              <boxGeometry args={[0.05, 0.42, 0.032]} />
              <meshStandardMaterial color={accentColor} metalness={0.55} roughness={0.25}
                emissive={accentColor} emissiveIntensity={hovered ? 0.5 : 0.2} />
            </mesh>
          </group>
        );
      })}

      {/* ── Engine plume */}
      <EnginePlume hovered={hovered} />

      {/* ── Engine point light */}
      <pointLight
        position={[0, -1.4, 0]}
        color={hovered ? "#ff8800" : "#4488ff"}
        intensity={hovered ? 5 : 2.2}
        distance={8}
      />

      {/* ── Subtle rim light from below (mimics ground bounce) */}
      <pointLight
        position={[0, -2.2, 0]}
        color={hovered ? "#ff4400" : "#0033aa"}
        intensity={hovered ? 1.8 : 0.8}
        distance={5}
      />
    </group>
  );
}

// ─── Floating Rocket (wrapper + motion) ──────────────────────────────────────
export default function FloatingRocket({ onCatch }: FloatingRocketProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Lissajous-style path constants — deterministic, no Math.random in render
  const pathParams = useMemo(() => ({
    aX: 55, aZ: 42,
    freqX: 0.28, freqZ: 0.41,
    phaseX: 0, phaseZ: 1.05,
    baseY: 20,
    ampY: 2.5,
    freqY: 0.19,
  }), []);

  const prevPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.55;
    const { aX, aZ, freqX, freqZ, phaseX, phaseZ, baseY, ampY, freqY } = pathParams;

    const x = Math.sin(t * freqX + phaseX) * aX;
    const z = Math.cos(t * freqZ + phaseZ) * aZ;
    const y = baseY + Math.sin(t * freqY) * ampY;

    if (groupRef.current) {
      const newPos = new THREE.Vector3(x, y, z);
      const velocity = new THREE.Vector3().subVectors(newPos, prevPos.current);

      if (velocity.length() > 0.001) {
        const forward = velocity.normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          forward
        );
        groupRef.current.quaternion.slerp(q, 0.06);
      }

      groupRef.current.position.copy(newPos);
      prevPos.current.copy(newPos);
    }
  });

  const handleEnter = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    onCatch();
  }, [onCatch]);

  return (
    <group ref={groupRef}>
      {/* Invisible larger hit area for easier clicking */}
      <mesh onClick={handleClick} onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
        <sphereGeometry args={[1.8, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visible rocket */}
      <RocketMesh hovered={hovered} />

      {/* Outer aura glow */}
      <mesh>
        <sphereGeometry args={[1.4, 10, 10]} />
        <meshBasicMaterial
          color={hovered ? "#ff8800" : "#0066cc"}
          transparent
          opacity={hovered ? 0.14 : 0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Billboard label */}
      <Billboard position={[0, 2.8, 0]}>
        <Text
          fontSize={hovered ? 0.62 : 0.52}
          color={hovered ? "#ffee44" : "#06b6d4"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          🚀 CATCH ME
        </Text>
        {hovered && (
          <Text
            fontSize={0.36}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#000000"
            position={[0, -0.72, 0]}
          >
            Click to grab my resume!
          </Text>
        )}
      </Billboard>
    </group>
  );
}
