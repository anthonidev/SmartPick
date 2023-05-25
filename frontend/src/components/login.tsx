"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { LoadingDots } from "./shared/icons";

export default function Login() {
  const [signInClickedGo, setSignInClickedGo] = useState(false);
  const [signInClickedFa, setSignInClickedFa] = useState(false);

  return (
    <div className="flex flex-col space-y-4  px-4 py-8 md:px-16">
      <button
        disabled={signInClickedGo}
        className={`${
          signInClickedGo
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border border-gray-200 bg-white text-black hover:bg-gray-50"
        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
        onClick={() => {
          setSignInClickedGo(true);
          signIn("google");
        }}
      >
        {signInClickedGo ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <Image
              height={20}
              width={30}
              src="/images/googlelogo.png"
              alt="google logo"
            />
            <p>
              Inicia sesión con <span className="font-bold">Google</span>
            </p>
          </>
        )}
      </button>
      <button
        disabled={signInClickedFa}
        className={`${
          signInClickedFa
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border border-gray-200 bg-white text-black hover:bg-gray-50"
        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
        onClick={() => {
          setSignInClickedFa(true);
          signIn("facebook");
        }}
      >
        {signInClickedFa ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <Image
              height={20}
              width={30}
              src="/images/facebooklogo.png"
              alt="google logo"
            />
            <p>
              Inicia sesión con <span className="font-bold">Facebook</span>
            </p>
          </>
        )}
      </button>
    </div>
  );
}
