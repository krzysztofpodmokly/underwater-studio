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
  return (
    isHomepage && (
      <ul className="flex items-center justify-evenly gap-1">
        {navigation.map(({ link, label }, index) => (
          <React.Fragment key={label}>
            <li className="transition-colors duration-150 hover:text-[#fe9000]">
              <Link href={`#${link.text}`}>
                <span>{label}</span>
              </Link>
            </li>
            {index < navigation.length - 1 && (
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
    )
  );
};

export default FooterNav;
