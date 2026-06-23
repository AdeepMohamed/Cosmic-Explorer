"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1200;

export default function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const asteroidData = useMemo(() => {
    const data: { angle: number; speed: number; radius: number; y: number; rotX: number; rotZ: number; scale: THREE.Vector3 }[] = [];
    for (let i = 0; i < COUNT; i++) {
      // Belt between orbit 3 and 4 (radius 68–74)
      const t = Math.random();
      data.push({
        angle: Math.random() * Math.PI * 2,
        speed: (0.06 + Math.random() * 0.05) * (Math.random() < 0.5 ? 1 : -1) * 0.015,
        radius: 66 + t * 10 + (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 3,
        rotX: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        scale: new THREE.Vector3(
          0.1 + Math.random() * 0.55,
          0.08 + Math.random() * 0.4,
          0.1 + Math.random() * 0.5,
        ),
      });
    }
    return data;
  }, []);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.28, 0.25, 0.22),
    roughness: 0.95,
    metalness: 0.1,
  }), []);

  const geometry = useMemo(() => {
    // Irregular asteroid via ico-sphere with perturbation
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const noise = 0.75 + Math.random() * 0.5;
      pos.setXYZ(i, pos.getX(i) * noise, pos.getY(i) * noise, pos.getZ(i) * noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      const d = asteroidData[i];
      d.angle += d.speed * delta;
      d.rotX  += delta * 0.3;
      d.rotZ  += delta * 0.2;

      dummy.position.set(
        Math.cos(d.angle) * d.radius,
        d.y,
        Math.sin(d.angle) * d.radius,
      );
      dummy.rotation.set(d.rotX, 0, d.rotZ);
      dummy.scale.copy(d.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, COUNT]} castShadow>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </instancedMesh>
  );
}
