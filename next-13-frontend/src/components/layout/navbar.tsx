"use client";

import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import Theme from "./theme";

const navigation = [
  { name: "Remove bg", href: "/remove-bg" },
  { name: "Filter", href: "/filter" },
  { name: "Optimize", href: "#" },
  { name: "Resize", href: "#" },
  { name: "Layers", href: "#" },
  { name: "Face detection", href: "#" },
];

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/icons/logosolo.svg"
              alt="Lotemania Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="text-white">Imagix</p>
          </Link>
          {session && (
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              {navigation.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`inline-flex items-center border-b-2 dark:text-gray-300 text-white${
                    "1" === item.href
                      ? " border-indigo-500 px-1 pt-1 text-sm font-medium "
                      : " border-transparent px-1 pt-1 text-sm font-medium  hover:border-gray-300 "
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center items-center">
            <Theme />

            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
