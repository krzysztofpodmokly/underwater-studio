import { Content } from "@prismicio/client";
import clsx from "clsx";
import Link from "next/link";

type DesktopMenuProps = {
  navigation: Content.NavigationDocument;
};

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {navigation.data.items.map((item, index) => (
        <li
          key={item.label}
          className={clsx(
            "transition-colors duration-150 hover:text-[#fe9000]",
            index < navigation.data.items.length - 1 && "mr-20",
          )}
        >
          <Link href={`#${item.link.text}`}>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default DesktopMenu;
