"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import {
  ArrowLeftOnRectangleIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            {/* <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link> */}
            <Link
              href="/gallery"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 text-gray-900"
            >
              <PhotoIcon className="h-4 w-4" />
              <p className="text-sm">Galeria</p>
            </Link>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 text-gray-900"
              onClick={() => signOut()}
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
      >
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </div>
      </Popover>
    </div>
  );
}
