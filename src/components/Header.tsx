import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import React from "react";
import { Bounded } from "./Bounded";

type Props = {};

const Header = async (props: Props) => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <header className="relative z-50">
      <nav
        aria-label="Main navigation"
        className="flex w-screen justify-center border-b-2 border-slate-400/40 bg-slate-400/20"
      >
        <ul className="flex w-full max-w-7xl justify-between py-3">
          <div>Logo</div>
          <div className="">
            {navigation.data.items.map((item) => (
              <li key={item.label}>
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
