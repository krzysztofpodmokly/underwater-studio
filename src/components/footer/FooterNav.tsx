"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationDocumentDataItemsItem,
  Simplify,
} from "../../../prismicio-types";

type Props = {
  navigation: Simplify<NavigationDocumentDataItemsItem>[];
};

const FooterNav = ({ navigation }: Props) => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const filteredNav = navigation
    .filter(({ label }) =>
      isHomepage ? label !== "Contact" : label === "Home",
    )
    .map((el) => {
      if (el.label === "Home") {
        return {
          ...el,
          link: {
            ...el.link,
            text: isHomepage ? "#home" : "/",
          },
        };
      }

      if (el.label && ["Services", "Projects"].includes(el.label)) {
        return {
          ...el,
          link: {
            ...el.link,
            text: isHomepage ? `#${el.link.text}` : `/${el.link.text}`,
          },
        };
      }

      return el;
    });

  return (
    <ul className="flex items-center justify-evenly gap-1">
      {filteredNav.map(({ link, label }, index) => {
        return (
          <React.Fragment key={label}>
            <li className="transition-colors duration-150 hover:text-[#fe9000]">
              {link.text && (
                <Link href={link.text}>
                  <span>{label}</span>
                </Link>
              )}
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
        );
      })}
    </ul>
  );
};

export default FooterNav;
