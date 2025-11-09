"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

import "./loader.styles.css";

const Loader = () => {
  const { active, progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const letters = "Bubbling".split("");
  const LETTER_DELAY_MS = 150;

  useEffect(() => {
    if (!active && progress === 100) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 100);
      return () => clearTimeout(hideTimeout);
    } else if (active) {
      setIsVisible(true);
    }
  }, [active, progress]);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#001011] font-sans text-4xl text-[#fe9000] transition-opacity duration-1000 lg:text-9xl ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative mt-16 flex gap-1">
        <div className="pointer-events-none absolute top-0 z-50 h-3 w-full bg-gradient-to-b from-[#001011] to-transparent lg:h-12" />

        {letters.map((char, index) => (
          <div
            key={index}
            className="relative inline-block h-[1em] overflow-hidden"
          >
            <div
              className="spinning-wheel"
              style={{ animationDelay: `${index * LETTER_DELAY_MS}ms` }}
            >
              <div className="wheel-item">{char}</div>
              <div
                className="wheel-item"
                style={{ animationDelay: `${index * LETTER_DELAY_MS}ms` }}
              >
                {char}
              </div>
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute bottom-0 z-50 h-3 w-full bg-gradient-to-t from-[#001011] to-transparent lg:h-12" />
      </div>
    </div>
  );
};

export default Loader;
