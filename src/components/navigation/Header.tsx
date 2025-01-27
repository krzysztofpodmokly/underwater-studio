import { createClient } from "@/prismicio";
import React from "react";

import Navigation from "./Navigation";

const Header = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <header className="inset-0 z-[1000] mx-auto max-w-7xl md:absolute">
      <Navigation navigation={navigation} />
    </header>
  );
};

export default Header;
