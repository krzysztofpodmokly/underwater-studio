"use client";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { View } from "@react-three/drei";

const Bubble = () => {
  return (
    <View className="pointer-events-none absolute hidden h-screen w-screen md:block">
      <Dispersion name="footer-bubble" />
    </View>
  );
};

export default Bubble;
