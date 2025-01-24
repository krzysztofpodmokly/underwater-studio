import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
};

const AnimatedContent = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: 100 },
      {
        y: 0,
        ease: "power2.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 45%",
          toggleActions: "play pause resume reverse",
          markers: true,
        },
      },
    );
  });

  return (
    <div ref={containerRef} className="relative top-5 -z-10">
      {children}
    </div>
  );
};

export default AnimatedContent;
