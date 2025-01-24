"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, View } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const ViewCanvas = () => {
  return (
    <Canvas
      camera={{ fov: 30 }}
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        // left: "50%",
        // transform: "translateX(-50%)",
        overflow: "hidden",
        width: "100vw",
        // pointerEvents: "none",
        zIndex: 30,
      }}
      gl={{
        antialias: true,
      }}
      // shadows
    >
      {/* <Perf position="top-left" /> */}

      <Suspense fallback={null}>
        <View.Port />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
