"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
};

const MagneticIcon = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(ref.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const mouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = event;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x);
      yTo(y);
    };

    const mouseLeave = () => {
      if (!ref.current) return;

      xTo(0);
      yTo(0);
    };

    ref.current.addEventListener("mousemove", mouseMove);
    ref.current.addEventListener("mouseleave", mouseLeave);

    return () => {
      ref.current?.removeEventListener("mousemove", mouseMove);
      ref.current?.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-20 w-20 items-center justify-center text-6xl hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default MagneticIcon;
