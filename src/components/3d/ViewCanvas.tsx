"use client";

import { Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import { Leva } from "leva";
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
        pointerEvents: "none",
        zIndex: 30,
      }}
      gl={{
        antialias: true,
      }}
    >
      {/* <Perf position="top-left" /> */}

      <Suspense fallback={null}>
        <View.Port />
        <Preload all />
      </Suspense>
      <Leva hidden />
    </Canvas>
  );
};

export default ViewCanvas;
