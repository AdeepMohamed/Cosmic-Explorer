"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShootingStar {
  id: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  speed: number;
  trail: THREE.Vector3[];
  active: boolean;
}

export default function ShootingStars() {
  const stars = useRef<ShootingStar[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const linesRef = useRef<(THREE.Line | null)[]>([]);

  const createStar = useCallback((): ShootingStar => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 80;
    const height = Math.random() * 60 - 20;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      height + 20,
      Math.sin(angle) * radius - 50
    );
    const endAngle = angle + Math.PI + (Math.random() - 0.5) * 0.8;
    const end = new THREE.Vector3(
      Math.cos(endAngle) * (radius * 0.6),
      height - 15,
      Math.sin(endAngle) * (radius * 0.6) - 50
    );
    return {
      id: nextId.current++,
      start,
      end,
      progress: 0,
      speed: Math.random() * 0.8 + 0.5,
      trail: [],
      active: true,
    };
  }, []);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    // Spawn new shooting stars randomly
    if (now - lastSpawn.current > 3 + Math.random() * 5) {
      if (stars.current.filter(s => s.active).length < 3) {
        stars.current = [...stars.current.filter(s => s.active), createStar()];
        lastSpawn.current = now;
      }
    }

    // Update each star
    stars.current.forEach((star) => {
      if (!star.active) return;
      star.progress += delta * star.speed;
      if (star.progress >= 1) {
        star.active = false;
        return;
      }
      const pos = star.start.clone().lerp(star.end, star.progress);
      star.trail.push(pos.clone());
      if (star.trail.length > 20) star.trail.shift();
    });

    // Update line geometries
    stars.current = stars.current.filter(s => s.active || s.trail.length > 0);
  });

  return null; // Three.js lines handled imperatively above; 
  // For simplicity, we use a particle-based approach below
}

// Simpler shooting stars with particles
export function ShootingStarsParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const starData = useRef<{ pos: THREE.Vector3; vel: THREE.Vector3; life: number; maxLife: number }[]>([]);
  const lastSpawn = useRef(0);

  const geometry = new THREE.BufferGeometry();
  const MAX_STARS = 50;
  const positions = new Float32Array(MAX_STARS * 3);
  const alphas = new Float32Array(MAX_STARS);
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;

    if (now - lastSpawn.current > 2 + Math.random() * 4 && starData.current.length < 5) {
      const angle = Math.random() * Math.PI * 2;
      const r = 80 + Math.random() * 60;
      starData.current.push({
        pos: new THREE.Vector3(Math.cos(angle) * r, 20 + Math.random() * 40, Math.sin(angle) * r - 80),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          -15 - Math.random() * 20,
          (Math.random() - 0.5) * 60
        ),
        life: 0,
        maxLife: 0.8 + Math.random() * 0.5,
      });
      lastSpawn.current = now;
    }

    starData.current = starData.current.filter(s => s.life < s.maxLife);
    starData.current.forEach(s => { s.life += delta; s.pos.addScaledVector(s.vel, delta); });
  });

  return null;
}
