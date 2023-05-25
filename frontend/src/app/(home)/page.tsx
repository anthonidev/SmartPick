import LinkDashboard from "@/components/login-linl";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Image
            className="h-11"
            src="/icons/logo.svg"
            alt="Lotemania logo"
            width={44}
            height={44}
          />

          <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
            Lotemania Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sube tus lotes para que los usuarios puedan verlos y comprarlos.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <LinkDashboard />
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <Image
          className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          src="/images/banner.avif"
          alt="lotemania dashboard"
          width={1500}
          height={1000}
        />
      </div>
    </div>
  );
}
