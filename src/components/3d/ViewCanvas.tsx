"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const ViewCanvas = () => {
  return (
    <Canvas
      // camera={{ position: [-3, 0, 6] }}
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        // pointerEvents: "none",
        zIndex: 30,
      }}
      gl={{
        antialias: true,
      }}
      shadows
    >
      <Perf position="top-left" />

      <Suspense fallback={null}>
        <View.Port />
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
