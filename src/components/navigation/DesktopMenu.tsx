import clsx from "clsx";
import Link from "next/link";

import {
  NavigationDocumentDataItemsItem,
  Simplify,
} from "../../../prismicio-types";

type DesktopMenuProps = {
  navigation: Simplify<NavigationDocumentDataItemsItem>[];
};

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {navigation.map(({ label, link }, index) => (
        <li
          key={label}
          className={clsx(
            "transition-colors duration-150 hover:text-[#fe9000]",
            index < navigation.length - 1 && "mr-20",
          )}
        >
          {
            <Link
              href={label === "Home" ? "/" : `#${link.text}`}
              className="my-10 transition-colors duration-150 hover:text-[#fe9000]"
            >
              <span>{label}</span>
            </Link>
          }
        </li>
      ))}
    </div>
  );
};

export default DesktopMenu;
