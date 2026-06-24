"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.42}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.32}
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
