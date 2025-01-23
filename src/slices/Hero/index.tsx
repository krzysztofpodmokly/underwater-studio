"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/button/Button";
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
  const ready = useStore((state) => state.ready);

  useGSAP(
    () => {
      if (!ready) return;

      const introTl = gsap.timeline();
      // gsap.set("body", { backgroundColor: "#fff" });

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
      <View className="ffpointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
      </View>
      <div className="relative z-[100] grid">
        <div className="grid h-screen place-items-center">
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
        <div className="h-screen"></div>
        <Bounded>
          <div className="grid h-screen items-center gap-4 md:grid-cols-2">
            <PrismicNextImage
              field={slice.primary.bubble_image}
              className="w-full md:hidden"
              alt=""
            />
            <div className="glass-container mt-16 grid w-fit">
              <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
                Some title
              </h2>
              <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                pellentesque, nisl sit amet finibus pellentesque, sem orci
                luctus ante, vel mollis justo turpis ac nulla. Ut aliquam felis
                vel felis dictum, non commodo dolor auctor. Pellentesque vitae
                lectus sit amet tellus faucibus semper tincidunt sed ex. Duis
                purus leo, aliquam ac venenatis eu, sagittis ut turpis. Aliquam
                vitae semper massa. Praesent imperdiet placerat ante, vitae
                cursus quam accumsan sit amet. Nam nec finibus magna. Sed eget
                nunc in lectus sollicitudin porta. Aenean quis lacus et mi
                molestie auctor et ut nisl. Aliquam vestibulum dolor id cursus
                imperdiet. Integer quis libero nulla. Etiam posuere, lectus sit
                amet viverra vulputate, ligula sapien ullamcorper dolor, at
                dictum urna neque quis erat. Praesent venenatis sapien sed
                consectetur rhoncus. Integer sit amet ligula tortor. Ut sit amet
                sagittis elit, eget ultricies purus. Donec eu urna non sem
                pellentesque tempus ac a eros. Vivamus luctus diam vitae
                facilisis dignissim. Aenean interdum, justo sit amet sagittis
                ultrices, magna ipsum porta purus, tristique finibus metus
                libero ac ipsum. Pellentesque in sapien libero. Suspendisse
                condimentum facilisis ligula, et luctus nisl ullamcorper vitae.
              </div>
            </div>
          </div>
        </Bounded>
      </div>
    </section>
  );
};

export default Hero;
