"use client";

import { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { PlanetData } from "@/data/planets";

interface CameraRigProps {
  activePlanet: PlanetData | null;
  planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>>;
  onArrived: () => void;
  onDeparted: () => void;
  isFlying: boolean;
  setIsFlying: (v: boolean) => void;
}

const HOME_POS    = new THREE.Vector3(0, 28, 85);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

export default function CameraRig({
  activePlanet,
  planetPositions,
  onArrived,
  onDeparted,
  isFlying,
  setIsFlying,
}: CameraRigProps) {
  const { camera } = useThree();
  const lookTarget  = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const prevPlanet  = useRef<string | null>(null);

  useEffect(() => {
    if (activePlanet && activePlanet.id !== prevPlanet.current) {
      prevPlanet.current = activePlanet.id;
      const planetPos = planetPositions.current.get(activePlanet.id);
      if (!planetPos) return;

      const dist  = activePlanet.size * 3.8;
      const angle = Math.atan2(planetPos.z, planetPos.x);
      const targetCamPos = new THREE.Vector3(
        planetPos.x + Math.cos(angle + 0.4) * dist,
        planetPos.y + dist * 0.35,
        planetPos.z + Math.sin(angle + 0.4) * dist,
      );

      isAnimating.current = true;
      setIsFlying(true);

      // Kill any running tweens on these objects
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(lookTarget.current);

      gsap.to(camera.position, {
        x: targetCamPos.x,
        y: targetCamPos.y,
        z: targetCamPos.z,
        duration: 2.8,
        ease: "power3.inOut",
        onComplete: () => {
          isAnimating.current = false;
          setIsFlying(false);
          onArrived();
        },
      });

      gsap.to(lookTarget.current, {
        x: planetPos.x,
        y: planetPos.y,
        z: planetPos.z,
        duration: 2.8,
        ease: "power3.inOut",
      });

    } else if (!activePlanet && prevPlanet.current !== null) {
      prevPlanet.current = null;
      isAnimating.current = true;
      setIsFlying(true);

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(lookTarget.current);

      gsap.to(camera.position, {
        x: HOME_POS.x,
        y: HOME_POS.y,
        z: HOME_POS.z,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
          setIsFlying(false);
          onDeparted();
        },
      });
      gsap.to(lookTarget.current, {
        x: HOME_TARGET.x,
        y: HOME_TARGET.y,
        z: HOME_TARGET.z,
        duration: 2.5,
        ease: "power2.inOut",
      });
    }
  }, [activePlanet]);

  useFrame(() => {
    if (isAnimating.current) {
      camera.lookAt(lookTarget.current);
    }
  });

  return null;
}
