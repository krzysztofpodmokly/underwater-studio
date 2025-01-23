import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
};

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  centered,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp className={clsx("px-4 md:px-6", className)} {...restProps}>
      <div
        className={clsx(
          "mx-auto flex h-full w-full max-w-7xl flex-col",
          centered ? "items-center" : null,
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
