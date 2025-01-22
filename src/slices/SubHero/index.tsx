"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Scene from "./Scene";
import { View } from "@react-three/drei";

/**
 * Props for `SubHero`.
 */
export type SubHeroProps = SliceComponentProps<Content.SubHeroSlice>;

/**
 * Component for "SubHero" Slices.
 */
const SubHero = ({ slice }: SubHeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sub-hero h-screen"
    >
      <h2 className="sr-only">{slice.primary.sentence}</h2>
      <View className="h-screen w-screen">
        <Scene sentence={slice.primary.sentence} />
      </View>
    </Bounded>
  );
};

export default SubHero;
