"use client";

import { Canvas } from "@react-three/fiber";
import Dispersion from "./Dispersion";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { Perf } from "r3f-perf";

const Scene = () => {
  return (
    <Canvas camera={{ position: [-3, 0, 6] }} dpr={[1, 2]}>
      <Perf position="top-left" />
      <color attach="background" args={["black"]} />
      <Environment preset="city" />
      <OrbitControls />
      <Text position={[0, 0, -3]} color={"red"}>
        Underwater Studio
      </Text>
      <Dispersion />
    </Canvas>
  );
};

export default Scene;
