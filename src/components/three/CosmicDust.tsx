"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CosmicDust() {
  const meshRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const dustColors = [
      new THREE.Color("#06b6d4"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#f59e0b"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 110;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 20;

      const col = dustColors[Math.floor(Math.random() * dustColors.length)];
      const intensity = Math.random() * 0.5 + 0.1;
      colors[i * 3] = col.r * intensity;
      colors[i * 3 + 1] = col.g * intensity;
      colors[i * 3 + 2] = col.b * intensity;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}
