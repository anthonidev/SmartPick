"use client";
import { useAppDispatch } from "@/context/hooks";
import { setSidebar } from "@/context/slice/config/configSlice";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

const ButtonSidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const setSidebarOpen = (open: boolean) => {
    dispatch(setSidebar(open));
  };
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default ButtonSidebar;
