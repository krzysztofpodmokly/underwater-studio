"use client";

import Dispersion from "@/components/3d/disperion/Dispersion";
import { View } from "@react-three/drei";

const Bubble = () => {
  return (
    <View className="pointer-events-none absolute bottom-48 block h-screen w-screen md:bottom-0">
      <Dispersion name="footer-bubble" />
    </View>
  );
};

export default Bubble;
