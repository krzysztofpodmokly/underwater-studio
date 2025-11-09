"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import Heading from "@/components/heading/Heading";

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
      title: "Website Creation",
      wide: false,
      body: "We design websites that are not just functional but also works of art, tailored to your unique brand.",
      image:
        "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "3D Modeling",
      wide: true,
      body: "Create immersive, lifelike 3D models for architecture, gaming, or product design",
      image:
        "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Drone Footage Filming",
      wide: true,
      body: "Add a cinematic touch to your projects with our stunning drone footage, perfect for storytelling.",
      image:
        "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Creative Storytelling",
      wide: false,
      body: "We help you craft compelling narratives that resonate with your audience, blending visuals and emotion.",
      image:
        "https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sub-hero relative mb-24 md:mb-96 md:mt-72 md:h-screen"
      centered
      id="services"
    >
      <Heading as="h2" size="lg" center className="max-sm:mt-48">
        My Offer
      </Heading>
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        Let me show you what can I do for you
      </div>

      <div className="z-[100] mt-16 grid max-w-[95rem] grid-rows-[auto,auto,auto] gap-14 max-md:w-[90%] md:grid-cols-3">
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
            <div
              className={`h-36 w-auto bg-cover bg-center`}
              style={{
                backgroundImage: `url(${box.image})`,
              }}
            />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default SubHero;
