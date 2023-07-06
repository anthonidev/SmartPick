import Particles from "@/components/particles";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl dark:from-black dark:via-zinc-600/20 dark:to-black from-primary-500 via-secondary-700 to-primary-500">
      <Particles className="absolute inset-0  animate-fade-in" quantity={100} />
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1 className="z-10 text-4xl text-transparent duration-75 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        IMAGIX
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right duration-75 bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-gray-100 max-w-2xl dark:text-zinc-500 ">
          Crea imágenes profesionales en minutos. Automatiza tareas tediosas y
          ahorra tiempo con nuestra plataforma de edición de imágenes con
          inteligencia artificial. Fácil de usar para principiantes y expertos.
        </h2>
        <Link
          href="/login"
          className="inline-block px-8 py-4 mt-8 text-sm font-bold text-white uppercase transition duration-75 bg-black rounded-full shadow-md hover:bg-gray-900 dark:hover:bg-zinc-700"
        >
          Comenzar
        </Link>
      </div>
    </section>
  );
}
