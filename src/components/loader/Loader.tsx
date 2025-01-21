"use client";

import { useProgress } from "@react-three/drei";
import clsx from "clsx";

import Logo from "@/components/logo/Logo";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div
      className={clsx(
        "absolute inset-0 bg-slate-800 font-sans text-[15vw] text-white transition-opacity duration-1000",
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Logo />
      <p className="w-full text-green-300">LOADING...</p>
    </div>
  );
};

export default Loader;

Loader.displayName = "Loader";
