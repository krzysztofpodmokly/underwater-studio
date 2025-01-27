"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import clsx from "clsx";

import Heading from "@/components/heading/Heading";
import Scene from "./Scene";

/**
 * Props for `SubHero`.
 */
export type SubHeroProps = SliceComponentProps<Content.SubHeroSlice>;

/**
 * Component for "SubHero" Slices.
 */
const SubHero = ({ slice }: SubHeroProps): JSX.Element => {
  const bentoBox = [
    {
      title: "Title 1",
      wide: true,
      body: "Some description for Title 1",
      image:
        "https://images.unsplash.com/photo-1734808215019-5e37cae896b4?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Title 2",
      wide: false,
      body: "Some description for Title 2",
      image:
        "https://images.unsplash.com/photo-1734808215019-5e37cae896b4?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Title 3",
      wide: false,
      body: "Some description for Title 3",
      image:
        "https://images.unsplash.com/photo-1734808215019-5e37cae896b4?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Title 4",
      wide: true,
      body: "Some description for Title 4",
      image:
        "https://images.unsplash.com/photo-1734808215019-5e37cae896b4?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sub-hero relative mb-24 mt-16 md:mb-52 md:mt-72 md:h-screen"
      centered
    >
      <Heading as="h2" size="lg" center>
        Heading 2
      </Heading>
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        Some random description
      </div>

      <div className="z-[100] mt-16 grid max-w-[95rem] grid-rows-[auto,auto,auto] gap-14 md:grid-cols-3">
        {bentoBox.map((box) => (
          <div
            key={box.title}
            className={clsx(
              "glass-container relative row-span-3 grid grid-rows-subgrid gap-6 rounded-lg bg-gradient-to-b from-teal-950 to-teal-900 p-4",
              box.wide ? "md:col-span-2" : "md:col-span-1",
            )}
          >
            <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
            <h3 className="text-2xl">{box.title}</h3>
            <div className="max-w-md text-balance">{box.body}</div>
            <img src={box.image} className="max-h-36 w-auto" alt="" />
          </div>
        ))}
      </div>
      <View className="pointer-events-none absolute top-60 -z-[100] hidden h-screen w-screen md:block">
        <Scene />
      </View>
    </Bounded>
  );
};

export default SubHero;
