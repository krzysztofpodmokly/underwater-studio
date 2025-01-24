"use client";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { View } from "@react-three/drei";

const Bubble = () => {
  return (
    <View className="pointer-events-none absolute h-screen w-screen">
      <Dispersion />
    </View>
  );
};

export default Bubble;
