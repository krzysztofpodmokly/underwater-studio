"use client";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Logo from "@/components/logo/Logo";
import clsx from "clsx";
import DesktopMenu from "@/components/navigation/DesktopMenu";

type Props = {
  navigation: Content.NavigationDocument;
};

const Navigation = ({ navigation }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="relative z-50">
      <ul className="flex flex-col justify-between px-4 py-2 md:m-4 md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Logo />
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
            "fixed inset-0 z-50 flex flex-col items-end gap-4 bg-green-950 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
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
          {navigation.data.items.map((item) => (
            <li key={item.label}>
              <PrismicNextLink field={item.link}>{item.label}</PrismicNextLink>
            </li>
          ))}
        </div>
        <DesktopMenu navigation={navigation} />
      </ul>
    </nav>
  );
};

export default Navigation;
