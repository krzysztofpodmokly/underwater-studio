"use client";

import { useProgress } from "@react-three/drei";
import clsx from "clsx";

import Logo from "@/components/logo/Logo";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#001011] font-sans text-4xl text-white transition-opacity duration-1000 sm:text-5xl md:text-8xl",
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
      <p className="mt-16 w-full text-center text-[#fe9000]">LOADING...</p>
    </div>
  );
};

export default Loader;

Loader.displayName = "Loader";
