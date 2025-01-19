import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter"
    >
      Logo
    </Link>
  );
};

export default Logo;
