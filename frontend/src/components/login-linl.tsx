"use client";
import Link from "next/link";
import { useState } from "react";
import { LoadingDots } from "./shared/icons";

type Props = {};

const LinkDashboard = (props: Props) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <>
      {signInClicked ? (
        <LoadingDots color="#808080" />
      ) : (
        <Link
          href="/login"
          onClick={() => {
            setSignInClicked(true);
          }}
          className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-tertiary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ingresar
        </Link>
      )}
    </>
  );
};

export default LinkDashboard;
