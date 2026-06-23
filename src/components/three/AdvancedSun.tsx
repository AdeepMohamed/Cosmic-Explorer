"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { sunFragmentShader, sunVertexShader, coronaFragmentShader, coronaVertexShader } from "@/shaders/galaxy";

export default function AdvancedSun() {
  const sunMatRef    = useRef<THREE.ShaderMaterial>(null);
  const coronaMatRef = useRef<THREE.ShaderMaterial>(null);
  const outerMatRef  = useRef<THREE.ShaderMaterial>(null);
  const flare1Ref    = useRef<THREE.Mesh>(null);
  const flare2Ref    = useRef<THREE.Mesh>(null);
  const groupRef     = useRef<THREE.Group>(null);

  // ── Materials ─────────────────────────────────────────────────────────────
  const sunMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   sunVertexShader,
    fragmentShader: sunFragmentShader,
    uniforms: { time: { value: 0 } },
  }), []);

  const coronaMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   coronaVertexShader,
    fragmentShader: coronaFragmentShader,
    uniforms: { time: { value: 0 }, coronaColor: { value: new THREE.Color("#ff8830") } },
    transparent: true,
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), []);

  const outerGlowMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   coronaVertexShader,
    fragmentShader: coronaFragmentShader,
    uniforms: { time: { value: 0 }, coronaColor: { value: new THREE.Color("#cc3300") } },
    transparent: true,
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  }), []);

  // ── Smaller, tighter flare arcs ───────────────────────────────────────────
  const flareGeo1 = useMemo(() => new THREE.TorusGeometry(6.8, 0.18, 8, 80, Math.PI * 0.52), []);
  const flareGeo2 = useMemo(() => new THREE.TorusGeometry(7.4, 0.14, 8, 80, Math.PI * 0.40), []);

  const flareMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff7020",
    transparent: true,
    opacity: 0.55,
    blending:   THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sunMatRef.current)   sunMatRef.current.uniforms.time.value   = t;
    if (coronaMatRef.current) coronaMatRef.current.uniforms.time.value = t;
    if (outerMatRef.current)  outerMatRef.current.uniforms.time.value  = t;

    if (flare1Ref.current) {
      flare1Ref.current.rotation.z = t * 0.22;
      flare1Ref.current.rotation.x = Math.sin(t * 0.16) * 0.35;
      flare1Ref.current.scale.setScalar(0.85 + Math.sin(t * 1.4) * 0.14);
    }
    if (flare2Ref.current) {
      flare2Ref.current.rotation.z = -t * 0.18;
      flare2Ref.current.rotation.y = Math.sin(t * 0.22) * 0.45;
      flare2Ref.current.scale.setScalar(0.78 + Math.sin(t * 1.1 + 1.0) * 0.18);
    }
    if (groupRef.current) groupRef.current.rotation.y += 0.0004;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Far outer haze — very subtle */}
      <mesh>
        <sphereGeometry args={[9.5, 32, 32]} />
        <primitive object={outerGlowMaterial} ref={outerMatRef} attach="material" />
      </mesh>

      {/* Corona */}
      <mesh>
        <sphereGeometry args={[6.5, 48, 48]} />
        <primitive object={coronaMaterial} ref={coronaMatRef} attach="material" />
      </mesh>

      {/* Solar flare arcs */}
      <mesh ref={flare1Ref} geometry={flareGeo1} material={flareMat} />
      <mesh ref={flare2Ref} geometry={flareGeo2} material={flareMat} />

      {/* Sun surface — reduced from 8.5 to 5.2 */}
      <mesh castShadow>
        <sphereGeometry args={[5.2, 128, 128]} />
        <primitive object={sunMaterial} ref={sunMatRef} attach="material" />
      </mesh>

      {/* Equatorial ring — subtle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 6.8, 128]} />
        <meshBasicMaterial
          color="#ff8822"
          transparent opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lights — toned down significantly */}
      <pointLight intensity={5} color="#fff5c0" distance={400} decay={1.5} />
      <pointLight intensity={2} color="#ff8800" distance={160} decay={2.2} />

      {/* Labels */}
      <Billboard position={[0, 7.8, 0]}>
        <Text fontSize={0.95} color="#ffd070" anchorX="center" anchorY="middle" outlineWidth={0.06} outlineColor="#000">
          ✦ ADEEP CORE ✦
        </Text>
      </Billboard>
      <Billboard position={[0, 6.5, 0]}>
        <Text fontSize={0.52} color="#ffaa40" anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#000">
          AI & Full Stack Engineer
        </Text>
      </Billboard>
    </group>
  );
}
