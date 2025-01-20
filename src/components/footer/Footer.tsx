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
import Bubble from "./3d/Bubble";

type Props = {};

const Footer = async (props: Props) => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded
      as="footer"
      className="relative h-screen flex-col items-center bg-[#001011] text-white"
    >
      <div className="background-gradient absolute inset-0 z-50 max-h-screen" />
      <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />

      <div className="z-[51] flex h-full flex-col items-center justify-center">
        <div className="mb-10 flex gap-10">
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
        <div className="mt-10 flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-x-4 sm:flex-row">
            <Logo />
            <span
              className="text-5xl font-extralight leading-[0]"
              aria-hidden={true}
            >
              |
            </span>
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()} Underwaterstudio
            </p>
          </div>
          <div className="navigation" aria-label="Footer Navigation">
            <ul className="flex items-center gap-1">
              {navigation.data.items.map(({ link, label }, index) => (
                <>
                  <li key={label}>
                    <PrismicNextLink
                      field={link}
                      className="transition-colors duration-150 hover:text-[#97c8eb]"
                    >
                      {label}
                    </PrismicNextLink>
                  </li>
                  {index < navigation.data.items.length - 1 && (
                    <span className="text-5xl font-thin leading-[0] text-slate-400">
                      |
                    </span>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Bubble />
    </Bounded>
  );
};

export default Footer;
