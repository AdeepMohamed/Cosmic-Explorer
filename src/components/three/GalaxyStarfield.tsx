"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { galaxyVertexShader, galaxyFragmentShader } from "@/shaders/galaxy";

export default function GalaxyStarfield() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, material } = useMemo(() => {
    const STAR_COUNT = 70000;
    const positions = new Float32Array(STAR_COUNT * 3);
    const aColor    = new Float32Array(STAR_COUNT * 3);
    const aSize     = new Float32Array(STAR_COUNT);
    const aTwinkle  = new Float32Array(STAR_COUNT);

    // Spectral star color palette
    const spectralColors = [
      [0.68, 0.78, 1.0],  // O — blue-white
      [0.80, 0.88, 1.0],  // B — blue-white
      [1.0,  1.0,  1.0],  // A — white
      [1.0,  0.98, 0.90], // F — pale yellow
      [1.0,  0.92, 0.60], // G — yellow (sun-like)
      [1.0,  0.72, 0.38], // K — orange
      [1.0,  0.48, 0.28], // M — red
    ];
    const weights = [0.01, 0.07, 0.13, 0.18, 0.35, 0.18, 0.08];

    function pickColor(): number[] {
      const r = Math.random(); let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (r < sum) return spectralColors[i];
      }
      return spectralColors[4];
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      const bucket = Math.random();
      let x = 0, y = 0, z = 0;

      if (bucket < 0.10) {
        // Galactic core — dense ellipsoid
        const r = Math.pow(Math.random(), 1.5) * 100;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(ph) * Math.cos(th);
        y = r * Math.sin(ph) * Math.sin(th) * 0.15;
        z = r * Math.cos(ph) - 380;
      } else if (bucket < 0.72) {
        // Spiral arms — 4 arms with logarithmic spiral
        const arm = Math.floor(Math.random() * 4);
        const t   = Math.pow(Math.random(), 0.55) * 5.8;
        const ang = t * 1.05 + arm * Math.PI * 0.5;
        const rad = t * 55 + Math.random() * 25;
        const spread = (1 - t / 5.8) * 16 + 3;
        x = Math.cos(ang) * rad + (Math.random() - 0.5) * spread;
        y = (Math.random() - 0.5) * spread * 0.18;
        z = Math.sin(ang) * rad - 380 + (Math.random() - 0.5) * spread;
      } else {
        // Halo / sparse background field
        const r   = 180 + Math.random() * 550;
        const th  = Math.random() * Math.PI * 2;
        const ph  = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(ph) * Math.cos(th);
        y = r * Math.sin(ph) * Math.sin(th) * 0.22;
        z = r * Math.cos(ph) - 380;
      }

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const col = pickColor();
      const dCore = Math.sqrt(x * x + (z + 380) * (z + 380));
      const brighten = Math.max(0, 1 - dCore / 220) * 0.25;
      aColor[i * 3]     = Math.min(1, col[0] + brighten);
      aColor[i * 3 + 1] = Math.min(1, col[1] + brighten * 0.7);
      aColor[i * 3 + 2] = Math.min(1, col[2] + brighten * 0.3);

      aSize[i]    = 0.3 + Math.random() * 1.5;
      aTwinkle[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor",   new THREE.BufferAttribute(aColor,    3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(aSize,     1));
    geo.setAttribute("aTwinkle", new THREE.BufferAttribute(aTwinkle,  1));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        time:       { value: 0 },
        pixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  // Animate time uniform for twinkling
  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} />;
}
