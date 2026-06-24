"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingRocketProps {
  onCatch: () => void;
}

// Procedural rocket geometry built from primitives
function RocketMesh({ hovered }: { hovered: boolean }) {
  const color   = hovered ? "#ffee44" : "#e0e8ff";
  const glowCol = hovered ? "#ffcc00" : "#06b6d4";

  return (
    <group>
      {/* ── Body (cylinder) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 1.1, 12]} />
        <meshStandardMaterial color={color} emissive={glowCol} emissiveIntensity={hovered ? 1.4 : 0.5} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ── Nose cone */}
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.22, 0.55, 12]} />
        <meshStandardMaterial color={color} emissive={glowCol} emissiveIntensity={hovered ? 1.2 : 0.4} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* ── Fins × 3 */}
      {[0, 120, 240].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={deg}
            position={[Math.sin(rad) * 0.28, -0.44, Math.cos(rad) * 0.28]}
            rotation={[0, -rad, 0.35]}
          >
            <boxGeometry args={[0.08, 0.38, 0.28]} />
            <meshStandardMaterial color={hovered ? "#ff8844" : "#4488cc"} emissive={glowCol} emissiveIntensity={0.4} metalness={0.4} roughness={0.4} />
          </mesh>
        );
      })}

      {/* ── Engine nozzle */}
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 0.22, 10]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Engine plume (additive glow cone) */}
      <mesh position={[0, -0.9, 0]}>
        <coneGeometry args={[0.14, 0.55, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffaa00" : "#44aaff"}
          transparent opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Point light for engine glow */}
      <pointLight
        position={[0, -1.1, 0]}
        color={hovered ? "#ffaa00" : "#44aaff"}
        intensity={hovered ? 3.5 : 1.5}
        distance={6}
      />
    </group>
  );
}

export default function FloatingRocket({ onCatch }: FloatingRocketProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Lissajous-style path constants — deterministic, no Math.random in render
  const pathParams = useMemo(() => ({
    aX: 55, aZ: 42,
    freqX: 0.28, freqZ: 0.41,
    phaseX: 0, phaseZ: 1.05,  // ~60° offset gives a figure-8 feel
    baseY: 20,
    ampY: 2.5,
    freqY: 0.19,
  }), []);

  // Smooth orientation from last frame velocity
  const prevPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.55; // overall speed scale
    const { aX, aZ, freqX, freqZ, phaseX, phaseZ, baseY, ampY, freqY } = pathParams;

    const x = Math.sin(t * freqX + phaseX) * aX;
    const z = Math.cos(t * freqZ + phaseZ) * aZ;
    const y = baseY + Math.sin(t * freqY) * ampY;

    if (groupRef.current) {
      const newPos = new THREE.Vector3(x, y, z);

      // Orient rocket along velocity direction
      const velocity = new THREE.Vector3().subVectors(newPos, prevPos.current);
      if (velocity.length() > 0.001) {
        const up = new THREE.Vector3(0, 1, 0);
        const forward = velocity.normalize();
        // Rocket "up" axis points along velocity
        const q = new THREE.Quaternion().setFromUnitVectors(up, forward);
        groupRef.current.quaternion.slerp(q, 0.06); // smooth lerp
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
      {/* Invisible larger hit area for easier clicking on mobile */}
      <mesh
        onClick={handleClick}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <sphereGeometry args={[1.6, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visible rocket */}
      <RocketMesh hovered={hovered} />

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffcc00" : "#06b6d4"}
          transparent
          opacity={hovered ? 0.18 : 0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Billboard label */}
      <Billboard position={[0, 2.4, 0]}>
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
