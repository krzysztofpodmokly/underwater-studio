import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
};

const AnimatedContent = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const isDesktop = context?.conditions?.isDesktop;

        gsap.fromTo(
          containerRef.current,
          { y: 100 },
          {
            y: `${isDesktop ? 0 : 60}`,
            ease: "power2.inOut",
            duration: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top ${isDesktop ? "80%" : "140%"}`,
              toggleActions: "play pause resume reverse",
            },
          },
        );
      },
    );

    return () => mm.revert();
  });

  return (
    <div ref={containerRef} className="relative -z-10 max-sm:-top-5 md:top-5">
      {children}
    </div>
  );
};

export default AnimatedContent;
