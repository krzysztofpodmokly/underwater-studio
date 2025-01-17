"use client";

import { Canvas } from "@react-three/fiber";
// import Dispersion from "./Dispersion";
import { Environment, OrbitControls, Text, View } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const Scene = () => {
  return (
    <Canvas
      // camera={{ position: [-3, 0, 6] }}
      dpr={[1, 2]}
      style={{
        position: "fixed",
        top: 0,
        // left: "50%",
        // transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* <Perf position="top-left" /> */}
      {/* <color attach="background" args={["blue"]} /> */}

      {/* <OrbitControls /> */}
      {/* <Text position={[0, 0, -3]} color={"red"}>
        Underwater Studio
      </Text>
      <Dispersion /> */}
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
