import {
  FaStackOverflow,
  FaLinkedin,
  FaSquareInstagram,
  FaGithub,
} from "react-icons/fa6";
import {} from "react-icons/fa";
import { createClient } from "@/prismicio";
import React from "react";

import { Bounded } from "../Bounded";
import MagneticIcon from "./MagneticIcon";
import Logo from "@/components/logo/Logo";
import Bubble from "./3d/Bubble";
import Link from "next/link";

const Footer = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  const filteredNav = navigation.data.items.filter(
    ({ label }) => label !== "Contact",
  );

  return (
    <Bounded
      as="footer"
      className="footer relative h-screen bg-[#001011]"
      centered
      id="footer"
    >
      <div className="background-gradient absolute inset-0 z-50 max-h-screen" />
      <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
      <Bubble />
      <div className="z-50 flex h-full w-full flex-col items-center justify-center">
        <div className="flex gap-10">
          <Link href="https://stackoverflow.com/users/11566541/krzysztof-podmok%c5%82y">
            <MagneticIcon>
              <FaStackOverflow />
            </MagneticIcon>
          </Link>

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
          <ul className="flex items-center justify-evenly gap-1">
            {filteredNav.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li className="transition-colors duration-150 hover:text-[#fe9000]">
                  <Link href={`#${link.text}`}>
                    <span>{label}</span>
                  </Link>
                </li>
                {index < filteredNav.length - 1 && (
                  <span
                    className="mx-2 text-3xl leading-3 md:mx-8"
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
