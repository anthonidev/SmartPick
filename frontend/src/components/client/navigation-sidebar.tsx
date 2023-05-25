"use client";

import { navigation } from "@/lib/data/navigation";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const NavigationSidebar = ({}: Props) => {
  const segment = useSelectedLayoutSegment();

  return (
    <ul role="list" className="-mx-2 space-y-1 ">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={`/dashboard/${item.href == undefined ? "" : item.href}`}
            className={classNames(
              item.href == segment
                ? "bg-indigo-700 text-white"
                : "text-gray-500 hover:text-white hover:bg-indigo-700 ",
              "group flex gap-x-3 rounded-md px-8 py-2 text-sm leading-6 "
            )}
          >
            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationSidebar;
