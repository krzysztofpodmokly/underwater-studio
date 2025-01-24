import {
  FaStackOverflow,
  FaLinkedin,
  FaSquareInstagram,
  FaGithub,
} from "react-icons/fa6";
import {} from "react-icons/fa";
import MagneticIcon from "./MagneticIcon";
import { Bounded } from "../Bounded";
import { createClient } from "@/prismicio";
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { PrismicNextLink } from "@prismicio/next";
import { View } from "@react-three/drei";
// import Bubble from "./3d/Bubble";
import React from "react";
import Dispersion from "../3d/disperion/Dispersion";
import Bubble from "./3d/Bubble";

type Props = {};

const Footer = async (props: Props) => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded
      as="footer"
      className="relative h-screen bg-[#001011] text-white"
      centered
    >
      <div className="background-gradient absolute inset-0 z-50 max-h-screen" />
      <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
      <Bubble />
      <div className="z-50 flex h-full w-full flex-col items-center justify-center">
        <div className="flex gap-10">
          <MagneticIcon>
            <FaStackOverflow />
          </MagneticIcon>

          <MagneticIcon>
            <FaLinkedin />
          </MagneticIcon>

          <MagneticIcon>
            <FaSquareInstagram />
          </MagneticIcon>
          <MagneticIcon>
            <FaGithub />
          </MagneticIcon>
        </div>
        <div className="relative top-40 flex w-full flex-col justify-between md:flex-row">
          <div className="order-1 flex items-center md:-order-1">
            <Logo />
            <span className="mx-8 text-3xl leading-3" aria-hidden={true}>
              |
            </span>
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()} Underwaterstudio
            </p>
          </div>
          <ul className="flex items-center justify-between gap-1">
            {navigation.data.items.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    field={link}
                    className="transition-colors duration-150 hover:text-[#fe9000]"
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < navigation.data.items.length - 1 && (
                  <span
                    className="mx-2 text-3xl leading-3 text-white md:mx-8"
                    aria-hidden={true}
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </Bounded>
  );
};

export default Footer;

{
  /* <div className="mt-10 flex w-full flex-col items-center justify-between">
<div className="navigation w-full" aria-label="Footer Navigation">
  <ul className="flex items-center justify-between gap-1">
    {navigation.data.items.map(({ link, label }, index) => (
      <React.Fragment key={label}>
        <li>
          <PrismicNextLink
            field={link}
            className="transition-colors duration-150 hover:text-[#97c8eb]"
          >
            {label}
          </PrismicNextLink>
        </li>
        {index < navigation.data.items.length - 1 && (
          <span className="text-3xl leading-3 text-white">|</span>
        )}
      </React.Fragment>
    ))}
  </ul>
</div>
<div className="mt-12 flex w-full flex-col items-center justify-between gap-x-4 sm:flex-row">
  <Logo />
  <span className="text-3xl leading-3" aria-hidden={true}>
    |
  </span>
  <p className="text-sm text-slate-300">
    © {new Date().getFullYear()} Underwaterstudio
  </p>
</div>
</div> */
}
