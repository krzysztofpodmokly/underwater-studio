import { FaLinkedin, FaSquareInstagram, FaGithub } from "react-icons/fa6";
import { createClient } from "@/prismicio";
import React from "react";
import Link from "next/link";

import Logo from "@/components/logo/Logo";

import { Bounded } from "../Bounded";
import MagneticIcon from "./MagneticIcon";
import Bubble from "./3d/Bubble";
import FooterNav from "./FooterNav";

const Footer = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <Bounded
      as="footer"
      className="footer relative h-screen bg-[#001011]"
      centered
      id="contact"
    >
      <div className="background-gradient absolute inset-0 z-50 max-h-screen" />
      <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
      <Bubble />
      <div className="z-50 flex h-full w-full flex-col items-center justify-center">
        <div className="flex gap-10">
          <Link href="https://www.linkedin.com/in/krzysztof-podmokly-144069177/">
            <MagneticIcon>
              <FaLinkedin />
            </MagneticIcon>
          </Link>
          <Link href="https://www.instagram.com/_underwater_studio_/">
            <MagneticIcon>
              <FaSquareInstagram />
            </MagneticIcon>
          </Link>
          <Link href="https://github.com/krzysztofpodmokly">
            <MagneticIcon>
              <FaGithub />
            </MagneticIcon>
          </Link>
        </div>
        <div className="relative top-40 flex w-full flex-col justify-between md:flex-row">
          <div className="order-1 mt-12 flex flex-col items-center justify-center md:-order-1 md:flex-row">
            <Logo className="order-1 max-md:mt-10 md:-order-1" />
            <span
              className="mx-8 hidden text-3xl leading-3 md:block"
              aria-hidden={true}
            >
              |
            </span>
            <div className="ml-8 text-sm text-slate-300 max-md:text-center md:ml-0">
              <p>© {new Date().getFullYear()} Underwater Studio</p>
              <p className="my-1 text-balance">krzysztof.podmokly@gmail.com</p>
              <p>+48 728 532 307</p>
            </div>
          </div>
          <FooterNav navigation={navigation.data.items} />
        </div>
      </div>
    </Bounded>
  );
};

export default Footer;
