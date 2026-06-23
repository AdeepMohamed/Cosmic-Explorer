"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface OrbitRingProps {
  radius: number;
  color: string;
}

export default function OrbitRing({ radius, color }: OrbitRingProps) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [color]);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} material={mat}>
      <ringGeometry args={[radius - 0.15, radius + 0.15, 128]} />
    </mesh>
  );
}
