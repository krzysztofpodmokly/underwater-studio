"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useStore } from "@/hooks/useStore";
import Scene from "./Scene";
import Heading from "@/components/heading/Heading";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);

  useGSAP(
    () => {
      if (!ready) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header", {
          opacity: 0,
          scale: 3,
          ease: "power1.inOut",
          delay: 0.3,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl.fromTo(
        "body",
        {
          backgroundColor: "#001011",
        },
        {
          backgroundColor: "#093a3e",
          overwrite: "auto",
        },
        1,
      );
    },
    { dependencies: [ready] },
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <View className="pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
      </View>
      <div className="relative z-[100] grid">
        <div className="hidden place-items-center md:grid md:h-screen">
          <div className="grid auto-rows-min place-items-center text-center">
            {/* <h1 className="hero-header text-5xl font-black uppercase leading-[.8] text-slate-300 md:text-[4rem] lg:text-[6rem]">
              {asText(slice.primary.heading)}
            </h1> */}
            {/* <div className="hero-subheading mt-12 text-3xl font-semibold text-slate-400 lg:text-4xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div> */}
            {/* <div className="hero-body text-balance text-2xl font-normal text-slate-500">
              <PrismicRichText field={slice.primary.body} />
            </div> */}
            {/* <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            /> */}
          </div>
        </div>
        <div className="md:h-screen"></div>
        <div className="mx-14">
          <div className="grid h-[70vh] md:mb-0 md:h-screen md:grid-cols-2">
            <PrismicNextImage
              field={slice.primary.bubble_image}
              className="w-full rounded-xl md:hidden"
              alt=""
            />
            <div className="glass-container mx-auto mt-10 h-fit gap-4 p-3">
              {/* <h2 className="text-side-heading text-balance text-6xl font-black uppercase lg:text-8xl">
                Some title
              </h2> */}
              <Heading as="h1" size="lg">
                Where Art Meets Technology
              </Heading>
              <div className="text-side-body mt-4 max-w-fit text-balance text-center text-sm font-normal md:text-start md:text-lg lg:text-xl">
                Welcome to Underwater Studio, a creative haven where artistry
                and technology converge. We specialize in 3D modeling, website
                creation, and drone footage filming, crafting digital
                experiences that are as beautiful as they are functional. Let us
                turn your vision into a masterpiece.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
