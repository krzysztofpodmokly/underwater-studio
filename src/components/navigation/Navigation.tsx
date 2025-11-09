"use client";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdArrowBack, MdClose, MdMenu } from "react-icons/md";

import DesktopMenu from "@/components/navigation/DesktopMenu";

type Props = {
  navigation: Content.NavigationDocument;
};

const Navigation = ({ navigation }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleScrollIntoView = (target: string) => {
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const isHomepage = pathname === "/";

  const filteredNav = isHomepage
    ? [...navigation.data.items.filter((item) => item.label !== "Home")]
    : [
        ...navigation.data.items.filter(
          (item) => item.label !== "Services" && item.label !== "Projects",
        ),
      ];

  return (
    <nav aria-label="Main navigation" className="relative z-[1001]">
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
            {filteredNav.map(({ label, link }) => (
              <li key={label} className="my-10 text-3xl">
                {label !== "Home" ? (
                  <PrismicNextLink
                    field={link}
                    onClick={() => {
                      if (!isFilled.keyText(link.text)) return;
                      handleScrollIntoView(`#${link.text}`);
                    }}
                    className="my-10 text-3xl transition-colors duration-150 hover:text-[#fe9000]"
                  >
                    {label}
                  </PrismicNextLink>
                ) : (
                  <Link
                    href={"/"}
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="my-10 text-3xl transition-colors duration-150 hover:text-[#fe9000]"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </div>
        </div>
        <DesktopMenu navigation={filteredNav} />
      </ul>
    </nav>
  );
};

export default Navigation;
