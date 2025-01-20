"use client";

import { Bounded } from "@/components/Bounded";
import Heading from "@/components/heading/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useRef } from "react";
import { MdCircle } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Props for `TechStack`.
 */
export type TechStackProps = SliceComponentProps<Content.TechStackSlice>;

/**
 * Component for "TechStack" Slices.
 */
const TechStack = ({ slice }: TechStackProps): JSX.Element => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 4,
      },
    });

    tl.fromTo(
      ".technology-row",
      {
        x: (index) =>
          index % 2 === 0
            ? gsap.utils.random(600, 400)
            : gsap.utils.random(-600, -400),
      },
      {
        x: (index) =>
          index % 2 === 0
            ? gsap.utils.random(-600, -400)
            : gsap.utils.random(600, 400),
        ease: "power1.inOut",
      },
    );
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={containerRef}
    >
      <Bounded as="div">
        <Heading size="xl" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.technologies.map(({ name, color }) => (
        <div
          key={name}
          aria-label={name || undefined}
          className="technology-row mb-8 flex items-center justify-center gap-6 text-slate-500"
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 6 && color ? color : "inherit",
                }}
              >
                {name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
          {name}
        </div>
      ))}
    </section>
  );
};

export default TechStack;
