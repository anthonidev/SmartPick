import LotemaniaSVG from "@/assets/svg/lotemania";
import MainLayout from "@/components/layout/MainLayout";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { ReactElement } from "react";
import { motion } from "framer-motion";
type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blob bg-no-repeat bg-cover">
      <motion.div
        //time to animate
        transition={{ duration: 0.8 }}
        initial={{ x: -100, scale: 0.5 }}
        animate={{
          x: 0,
          y: -100,
          scale: 1,
          rotate: 0,
        }}
        className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center justify-center border p-10 rounded-2xl space-y-4 mx-4 "
      >
        {/* <Image src={logoLotemania} alt="lotemania dashboard" width={1000} /> */}
        <h1 className="text-3xl font-extrabold text-white">Iniciar Sesión</h1>
        <LotemaniaSVG />
        <div className="flex flex-col justify-center items-center space-y-4">
          <button
            onClick={() => signIn("google")}
            type="button"
            className="bg-gray-800  px-10 py-5 w-full text-white flex space-x-3 rounded-lg"
          >
            <Image
              height={20}
              width={30}
              src="/images/googlelogo.png"
              alt="google logo"
            />
            <span> Continuar con Google</span>
          </button>

          <button
            onClick={() => signIn("facebook")}
            type="button"
            className="bg-gray-800  px-10 py-5 w-full text-white flex space-x-3 rounded-lg"
          >
            <Image
              height={20}
              width={30}
              src="/images/facebooklogo.png"
              alt="facebook logo"
            />
            <span> Continuar con Facebook</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title="Ingresar | Lotemania | Dashboard"
      content="Iniciar Session en Belnmont"
      maxWidth="w-full  "
    >
      {page}
    </MainLayout>
  );
};

export default Login;
