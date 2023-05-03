import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import Header from "../navigation/Header";

const MainLayout: React.FC<PropsLayout> = ({
  title,
  content,
  children,
  maxWidth = "container mx-auto ",
}: PropsLayout) => {
  const { push, asPath } = useRouter();
  // const { session, loading } = useAuth(3 * 60);
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (!session && status === "unauthenticated") {
  //     push("/login");
  //   }
  //   if ((session && status === "authenticated") || asPath === "/login") {
  //     push("/");
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session]);

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // if (status === "unauthenticated") {
  //   return (
  //     <>
  //       <Link href="/login">login</Link>
  //       <p>Access Denied</p>
  //     </>
  //   );
  // }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <div className="dark:bg-gray-900 bg-white">
        <Header />
        <main className={`  h-screen overflow-y-auto  ${maxWidth}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
export default MainLayout;
