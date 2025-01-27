import clsx from "clsx";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className={clsx("text-xl font-extrabold tracking-tighter", className)}
    >
      {/* <SvgIcon /> */}
      Logo
    </Link>
  );
};

export default Logo;

import * as React from "react";
