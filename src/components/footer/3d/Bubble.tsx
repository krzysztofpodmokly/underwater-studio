"use client";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { View } from "@react-three/drei";

type Props = {};

const Bubble = (props: Props) => {
  return (
    <View className="pointer-events-none absolute top-0 h-screen w-screen">
      <Dispersion />
    </View>
  );
};

export default Bubble;
