"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.5}
      />
      <Vignette
        eskil={false}
        offset={0.32}
        darkness={0.48}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
