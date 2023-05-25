import Login from "@/components/login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                className="h-11"
                src="/icons/logo.svg"
                alt="Lotemania logo"
                width={44}
                height={44}
              />

              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Iniciar sesión o crear una cuenta
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                No eres miembro todavía?{" "}
                <span className="font-semibold text-indigo-600 ">
                  Empieza gratis por 30 días
                </span>
              </p>
            </div>
            <Login />
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            width={1500}
            height={1000}
            src="/images/loginbanner.avif"
            alt="lotemania dashboard"
          />
        </div>
      </div>
    </>
  );
}
