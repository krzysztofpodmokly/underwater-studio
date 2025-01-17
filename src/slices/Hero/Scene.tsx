"use client";

import { Environment, Text } from "@react-three/drei";

import Dispersion from "@/components/3d/Dispersion";

type Props = {};

const Scene = (props: Props) => {
  return (
    <>
      <Environment preset="city" />
      <Text>Underwater studio</Text>
      <Dispersion />
    </>
  );
};

export default Scene;
