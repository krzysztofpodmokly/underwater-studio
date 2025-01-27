import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
  center?: boolean;
  children: React.ReactNode;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
  center,
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "text-balance bg-gradient-to-b from-[#fe9000] to-yellow-200 bg-clip-text pb-3 font-bold leading-tight tracking-tight text-transparent",
        size === "xl" && "text-7xl md:text-9xl",
        size === "lg" && "text-6xl max-sm:text-3xl md:text-8xl",
        size === "md" && "text-5xl md:text-6xl",
        size === "sm" && "text-3xl md:text-4xl",
        center && "text-center",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
