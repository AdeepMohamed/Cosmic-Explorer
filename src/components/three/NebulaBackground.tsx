"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const createNebula = (count: number, color: string, spread: number, offsetX = 0, offsetY = 0, offsetZ = -200) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const col = new THREE.Color(color);

  for (let i = 0; i < count; i++) {
    const r = Math.random() * spread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = offsetX + r * Math.sin(phi) * Math.cos(theta) * 1.5;
    positions[i * 3 + 1] = offsetY + r * Math.sin(phi) * Math.sin(theta) * 0.4;
    positions[i * 3 + 2] = offsetZ + r * Math.cos(phi);

    const intensity = Math.random() * 0.6 + 0.1;
    colors[i * 3] = col.r * intensity;
    colors[i * 3 + 1] = col.g * intensity;
    colors[i * 3 + 2] = col.b * intensity;

    sizes[i] = Math.random() * 6 + 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  return geometry;
};

export default function NebulaBackground() {
  const nebula1Ref = useRef<THREE.Points>(null);
  const nebula2Ref = useRef<THREE.Points>(null);
  const nebula3Ref = useRef<THREE.Points>(null);

  const nebula1Geo = useMemo(() => createNebula(2000, "#7c3aed", 180, -120, 30, -300), []);
  const nebula2Geo = useMemo(() => createNebula(1500, "#06b6d4", 140, 150, -20, -250), []);
  const nebula3Geo = useMemo(() => createNebula(1800, "#ec4899", 160, 0, 60, -350), []);

  const nebulaMaterial = (opacity: number) =>
    new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

  const mat1 = useMemo(() => new THREE.PointsMaterial({ size: 1.2, vertexColors: true, transparent: true, opacity: 0.28, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const mat2 = useMemo(() => new THREE.PointsMaterial({ size: 1.0, vertexColors: true, transparent: true, opacity: 0.22, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const mat3 = useMemo(() => new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true, opacity: 0.18, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);

  useFrame((_, delta) => {
    if (nebula1Ref.current) nebula1Ref.current.rotation.y += delta * 0.008;
    if (nebula2Ref.current) nebula2Ref.current.rotation.y -= delta * 0.006;
    if (nebula3Ref.current) nebula3Ref.current.rotation.x += delta * 0.004;
  });

  return (
    <>
      <points ref={nebula1Ref} geometry={nebula1Geo} material={mat1} />
      <points ref={nebula2Ref} geometry={nebula2Geo} material={mat2} />
      <points ref={nebula3Ref} geometry={nebula3Geo} material={mat3} />
    </>
  );
}
