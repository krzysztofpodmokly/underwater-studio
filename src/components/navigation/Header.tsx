import { createClient } from "@/prismicio";
import React from "react";
import Navigation from "./Navigation";

const Header = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <header className="z-50 mx-auto max-w-7xl md:sticky">
      <Navigation navigation={navigation} />
    </header>
  );
};

export default Header;
