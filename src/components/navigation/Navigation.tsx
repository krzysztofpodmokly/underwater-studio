"use client";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import React, { useState } from "react";
import { MdMenu, MdClose, MdArrowBack } from "react-icons/md";
import clsx from "clsx";

import DesktopMenu from "@/components/navigation/DesktopMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  navigation: Content.NavigationDocument;
};

const Navigation = ({ navigation }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="relative z-[1000]">
      <ul className="flex flex-col justify-between px-4 py-2 md:m-4 md:flex-row md:items-center">
        <div
          className={clsx(
            "flex items-center",
            pathname === "/" ? "justify-end" : "justify-between",
          )}
        >
          {pathname !== "/" && (
            <Link href="/">
              <span className="text:sm ml-auto flex items-center gap-2 font-medium md:ml-0 md:text-xl">
                <MdArrowBack />
              </span>
            </Link>
          )}
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-white md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>
        <div
          className={clsx(
            "fixed inset-0 z-[1000] flex flex-col items-end gap-4 bg-[#093a3e] pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-expanded={open}
            aria-label="Close menu"
            className="fixed right-4 top-3 block p-2 text-2xl text-white md:hidden"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          <div className="flex h-full w-full flex-col items-center justify-center">
            {navigation.data.items.map((item) => (
              <li key={item.label} className="my-10 text-3xl">
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </div>
        </div>
        <DesktopMenu navigation={navigation} />
      </ul>
    </nav>
  );
};

export default Navigation;
