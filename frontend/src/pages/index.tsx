import MainLayout from "@/components/layout/MainLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactElement } from "react";

const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <h1 className="text-3xl font-extrabold text-white">
        {session?.user?.name}
      </h1>
      <button
        className="bg-gray-800 mx-auto px-10 py-5 text-white flex space-x-3 rounded-lg"
        type="button"
        onClick={() => signOut()}
      >
        Cerrar Sesión
      </button>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Dashboard | Lotemania"
      content="Content Page"
      maxWidth="w-full"
    >
      {page}
    </MainLayout>
  );
};

export default Home;
