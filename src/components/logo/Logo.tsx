import clsx from "clsx";
import Link from "next/link";
import SvgIcon from "./SvgIcon";

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
      <SvgIcon />
    </Link>
  );
};

export default Logo;
