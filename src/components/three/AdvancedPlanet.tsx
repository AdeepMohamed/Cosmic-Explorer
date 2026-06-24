"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { planetVertexShader, planetFragmentShader, atmosphereVertexShader, atmosphereFragmentShader } from "@/shaders/planet";
import type { PlanetData } from "@/data/planets";

interface AdvancedPlanetProps {
  planet: PlanetData;
  planetTypeIndex: number;
  atmosphereColor: THREE.Color;
  atmosphereIntensity?: number;
  color1?: THREE.Color;
  color2?: THREE.Color;
  color3?: THREE.Color;
  color4?: THREE.Color;
  onClick: () => void;
  isActive: boolean;
  planetPositions?: React.MutableRefObject<Map<string, THREE.Vector3>>;
}

const SUN_POSITION = new THREE.Vector3(0, 0, 0);

export default function AdvancedPlanet({
  planet,
  planetTypeIndex,
  atmosphereColor,
  atmosphereIntensity = 1.2,
  color1 = new THREE.Color("#06b6d4"),
  color2 = new THREE.Color("#a855f7"),
  color3 = new THREE.Color("#ec4899"),
  color4 = new THREE.Color("#ffffff"),
  onClick,
  isActive,
  planetPositions,
}: AdvancedPlanetProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const meshRef   = useRef<THREE.Mesh>(null);
  const atmoRef   = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);
  const planetMatRef = useRef<THREE.ShaderMaterial>(null);
  const atmoMatRef   = useRef<THREE.ShaderMaterial>(null);

  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(planet.orbitRadius * 12.34);

  // ── Planet surface material ───────────────────────────────────────────────
  const planetMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   planetVertexShader,
    fragmentShader: planetFragmentShader,
    uniforms: {
      time:        { value: 0 },
      planetType:  { value: planetTypeIndex },
      sunPosition: { value: SUN_POSITION },
      uColor1:     { value: color1 },
      uColor2:     { value: color2 },
      uColor3:     { value: color3 },
      uColor4:     { value: color4 },
    },
  }), [planetTypeIndex]);

  // ── Atmosphere material ───────────────────────────────────────────────────
  const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
      atmosphereColor:     { value: atmosphereColor },
      atmosphereIntensity: { value: atmosphereIntensity },
      sunPosition:         { value: SUN_POSITION },
    },
    transparent: true,
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), [atmosphereColor, atmosphereIntensity]);

  // ── Outer glow (hovered / active) ────────────────────────────────────────
  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: planet.glowColor,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [planet.glowColor]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Orbital motion
    angleRef.current += delta * planet.speed * 0.1;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * planet.orbitRadius;
      groupRef.current.position.z = Math.sin(angleRef.current) * planet.orbitRadius;
      if (planetPositions) {
        planetPositions.current.set(planet.id, groupRef.current.position.clone());
      }
    }

    // Planet self-rotation
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.18;

    // Animate planet shader
    if (planetMatRef.current) planetMatRef.current.uniforms.time.value = t;

    // Pulse glow
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.4 * planet.speed) * 0.12;
      glowRef.current.scale.setScalar(hovered || isActive ? pulse * 1.5 : pulse * 1.0);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        hovered || isActive ? 0.35 : 0.08;
    }
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  const atmoScale = 1.065 + (hovered || isActive ? 0.02 : 0);
  const glowScale = 1.8;

  return (
    <group ref={groupRef}>
      {/* Outer selection glow */}
      <mesh ref={glowRef} scale={glowScale}>
        <sphereGeometry args={[planet.size, 24, 24]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmoRef} scale={atmoScale}>
        <sphereGeometry args={[planet.size, 48, 48]} />
        <primitive object={atmosphereMaterial} ref={atmoMatRef} attach="material" />
      </mesh>

      {/* Planet surface */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[planet.size, 64, 64]} />
        <primitive object={planetMaterial} ref={planetMatRef} attach="material" />
      </mesh>

      {/* Hover/active energy ring */}
      {(hovered || isActive) && (
        <mesh rotation={[Math.PI * 0.45, 0, 0]}>
          <torusGeometry args={[planet.size * 1.35, 0.06, 8, 64]} />
          <meshBasicMaterial
            color={planet.glowColor}
            transparent opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Active scan ring */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.size * 1.6, planet.size * 1.65, 64]} />
          <meshBasicMaterial
            color={planet.glowColor}
            transparent opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Billboard label */}
      <Billboard position={[0, planet.size + 2.2, 0]}>
        <Text
          fontSize={0.72}
          color={planet.glowColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {planet.icon} {planet.label}
        </Text>
      </Billboard>

      {hovered && (
        <Billboard position={[0, planet.size + 3.7, 0]}>
          <Text
            fontSize={0.42}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
            outlineWidth={0.04}
            outlineColor="#000000"
          >
            {planet.description}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
