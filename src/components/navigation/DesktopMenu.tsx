import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type DesktopMenuProps = {
  navigation: Content.NavigationDocument;
};

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  const scrollIntoView = () => {
    document.querySelector(".projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {navigation.data.items.map((item, index) => (
        <li
          key={item.label}
          className={clsx(index < navigation.data.items.length - 1 && "mr-20")}
        >
          {/* <button onClick={scrollIntoView}>Hello</button> */}
          <PrismicNextLink field={item.link}>
            <span>{item.label}</span>
          </PrismicNextLink>
        </li>
      ))}
    </div>
  );
};

export default DesktopMenu;
