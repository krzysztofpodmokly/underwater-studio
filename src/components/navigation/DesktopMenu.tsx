import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import React from "react";

type DesktopMenuProps = {
  navigation: Content.NavigationDocument;
};

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {navigation.data.items.map((item) => (
        <li key={item.label}>
          <PrismicNextLink field={item.link}>
            <span>{item.label}</span>
          </PrismicNextLink>
        </li>
      ))}
    </div>
  );
};

export default DesktopMenu;
