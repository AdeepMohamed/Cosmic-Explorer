"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import type { PlanetData } from "@/data/planets";

interface PlanetProps {
  planet: PlanetData;
  onClick: () => void;
  isActive: boolean;
}

export default function Planet({ planet, onClick, isActive }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(planet.orbitRadius * 12.34);

  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(planet.glowColor),
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [planet.glowColor]);

  const atmosphereMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(planet.glowColor),
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [planet.glowColor]);

  useFrame((_, delta) => {
    // Orbital motion
    angleRef.current += delta * planet.speed * 0.1;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * planet.orbitRadius;
      groupRef.current.position.z = Math.sin(angleRef.current) * planet.orbitRadius;
    }
    // Planet self-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.001 * planet.speed) * 0.15;
      glowRef.current.scale.setScalar(hovered || isActive ? pulse * 1.4 : pulse);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = hovered || isActive ? 0.35 : 0.15;
    }
    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Atmosphere glow outer */}
      <mesh scale={1.8}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <primitive object={atmosphereMat} />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef} scale={1.4}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <primitive object={glowMat} />
      </mesh>

      {/* Main planet */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        castShadow
      >
        <sphereGeometry args={[planet.size, 48, 48]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={hovered || isActive ? 1.2 : 0.6}
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Energy ring for active/hovered */}
      {(hovered || isActive) && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.size * 1.5, planet.size * 1.7, 64]} />
          <meshBasicMaterial
            color={planet.glowColor}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Billboard label */}
      <Billboard position={[0, planet.size + 1.8, 0]}>
        <Text
          fontSize={0.7}
          color={planet.glowColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="black"
        >
          {planet.icon} {planet.label}
        </Text>
      </Billboard>
      {hovered && (
        <Billboard position={[0, planet.size + 3.2, 0]}>
          <Text
            fontSize={0.45}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
            outlineWidth={0.03}
            outlineColor="black"
          >
            {planet.description}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
