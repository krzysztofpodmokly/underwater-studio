"use client";

import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Button from "@/components/button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  useGSAP(() => {
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
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {/* <View className="">
        <Scene />
      </View> */}
      <div className="relative z-[100] grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-5xl font-black uppercase leading-[.8] text-slate-300 md:text-[4rem] lg:text-[6rem]">
              {asText(slice.primary.heading)}
            </h1>
            <div className="hero-subheading mt-12 text-3xl font-semibold text-slate-400 lg:text-4xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-balance text-2xl font-normal text-slate-500">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            />
          </div>
        </div>
        <div className="relative grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            field={slice.primary.bubble_image}
            className="w-full md:hidden"
            alt=""
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
