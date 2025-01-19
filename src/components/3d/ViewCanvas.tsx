"use client";

import { Canvas } from "@react-three/fiber";
// import Dispersion from "./Dispersion";
import {
  Environment,
  Float,
  OrbitControls,
  Text,
  View,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Dispersion from "./Dispersion";
import Background from "./Background";

const ViewCanvas = () => {
  return (
    <Canvas
      // camera={{ position: [-3, 0, 6] }}
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        // left: "50%",
        // transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      gl={{
        antialias: true,
      }}
      shadows
    >
      {/* <Perf position="top-left" /> */}
      {/* <color attach="background" args={["blue"]} /> */}

      {/* <OrbitControls /> */}

      <Float
        speed={1}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[1, 3]}
      >
        <Dispersion />
      </Float>
      <Environment preset="city" />
      <Background />

      {/* <Suspense fallback={null}>
        <View.Port />
      </Suspense> */}
    </Canvas>
  );
};

export default ViewCanvas;
