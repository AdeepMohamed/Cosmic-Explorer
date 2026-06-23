"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { PLANETS } from "@/data/planets";
import type { PlanetData } from "@/data/planets";
import Sun from "./Sun";
import Planet from "./Planet";
import OrbitRing from "./OrbitRing";
import CosmicDust from "./CosmicDust";

interface SolarSystemProps {
  onPlanetClick: (planet: PlanetData) => void;
  activePlanet: PlanetData | null;
}

export default function SolarSystem({ onPlanetClick, activePlanet }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Cosmic dust particles */}
      <CosmicDust />

      {/* Central Sun */}
      <Sun />

      {/* Orbit rings */}
      {PLANETS.map((planet) => (
        <OrbitRing key={`orbit-${planet.id}`} radius={planet.orbitRadius} color={planet.glowColor} />
      ))}

      {/* Planets */}
      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={() => onPlanetClick(planet)}
          isActive={activePlanet?.id === planet.id}
        />
      ))}
    </group>
  );
}
