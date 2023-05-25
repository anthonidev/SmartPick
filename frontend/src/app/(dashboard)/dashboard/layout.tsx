import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MobileSidebar from "@/components/client/mobile-sidebar";
import NavigationSidebar from "@/components/client/navigation-sidebar";
import Navbar from "@/components/server/Navbar";
import { Providers } from "@/context/provider";
import { ToastProvider } from "@/providers/toast-provider";
import { getServerSession } from "next-auth";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!session.accessToken) {
    return null;
  }

  return (
    <Providers>
      <MobileSidebar />

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col ">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto items-center bg-white px-2 pb-4 border-r ">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              className="h-14 w-auto"
              alt="Lotemania dashboard"
              src="/icons/logo.svg"
              priority={true}
              width={400}
              height={400}
            />
          </div>
          <nav className="flex flex-1 flex-col ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
              <li>
                <NavigationSidebar />
              </li>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                        {team.initial}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:pl-60 ml-5 pr-5 pt-5 bg-gray-50 ">
        <Navbar session={session} />

        <main
          className="py-8 bg-gray-50"
          style={{ minHeight: "calc(100vh - 6.28rem)" }}
        >
          {children}
        </main>
      </div>
      <ToastProvider />
    </Providers>
  );
}
