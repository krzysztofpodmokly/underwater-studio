"use client";

import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "@/components/heading/Heading";
import { useStore } from "@/hooks/useStore";
import Scene from "./Scene";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  // const isDesktop = useMediaQuery("(min-width: 768px)", true);
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
        <div className="hidden place-items-center md:grid md:h-screen"></div>
        <div className="md:h-screen"></div>
        <div className="mx-14">
          <div className="md:mb-0 md:h-screen md:grid-cols-2">
            <PrismicNextImage
              field={slice.primary.bubble_image}
              className="w-full rounded-xl md:hidden"
              alt=""
            />
            <div className="glass-container mx-auto mt-10 flex justify-center gap-4 p-3">
              <div className="px-96">
                <Heading as="h1" size="lg" center>
                  Where Art Meets Technology
                </Heading>
                <p className="mt-4 max-w-fit text-balance text-justify text-sm font-normal md:text-lg lg:text-xl">
                  Welcome to Underwater Studio, a creative haven where artistry
                  and technology converge. We specialize in 3D modeling, website
                  creation, and drone footage filming, crafting digital
                  experiences that are as beautiful as they are functional. Let
                  us turn your vision into a masterpiece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
