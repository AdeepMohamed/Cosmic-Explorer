"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const flare1Ref = useRef<THREE.Mesh>(null);
  const flare2Ref = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const coronaMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffa040"),
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffdd80"),
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
      sunRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.001;
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      coronaRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const pulse2 = 1 + Math.sin(t * 0.8 + 1) * 0.08;
      glowRef.current.scale.setScalar(pulse2);
    }
    if (flare1Ref.current) {
      flare1Ref.current.rotation.z = t * 0.5;
      flare1Ref.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.2);
    }
    if (flare2Ref.current) {
      flare2Ref.current.rotation.z = -t * 0.3;
      flare2Ref.current.scale.setScalar(0.7 + Math.sin(t * 1.5 + 1) * 0.25);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[18, 32, 32]} />
        <primitive object={glowMat} />
      </mesh>

      {/* Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[13, 32, 32]} />
        <primitive object={coronaMat} />
      </mesh>

      {/* Solar flares */}
      <mesh ref={flare1Ref} rotation={[0, 0, 0]}>
        <torusGeometry args={[10.5, 0.3, 8, 60, Math.PI * 0.4]} />
        <meshBasicMaterial color="#ff8020" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={flare2Ref}>
        <torusGeometry args={[11, 0.2, 8, 60, Math.PI * 0.3]} />
        <meshBasicMaterial color="#ff4000" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Main sun body */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial
          color="#ff9900"
          emissive="#ff6600"
          emissiveIntensity={2.5}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Sun energy ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9, 10.5, 64]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Billboard label */}
      <Billboard position={[0, 11, 0]}>
        <Text
          fontSize={1.2}
          color="#ffd080"
          anchorX="center"
          anchorY="middle"
          font={undefined}
          outlineWidth={0.05}
          outlineColor="#ff8800"
        >
          ✦ ADEEP CORE ✦
        </Text>
      </Billboard>
      <Billboard position={[0, 9.2, 0]}>
        <Text
          fontSize={0.65}
          color="#ffaa40"
          anchorX="center"
          anchorY="middle"
        >
          AI & Full Stack Engineer
        </Text>
      </Billboard>
    </group>
  );
}
