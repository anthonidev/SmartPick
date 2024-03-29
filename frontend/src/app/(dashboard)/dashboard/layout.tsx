import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MobileSidebar from "@/components/client/mobile-sidebar";
import NavigationSidebar from "@/components/client/navigation-sidebar";
import Theme from "@/components/common/Theme";
import Navbar from "@/components/server/Navbar";
import { Providers } from "@/context/provider";
import { AuthContext } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { getServerSession } from "next-auth";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

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
    <AuthContext>
      <Providers>
        <ThemeProvider attribute="class" enableSystem={false}>
          <MobileSidebar />
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col ">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto items-center bg-white dark:bg-osc px-2 pb-4 border-r dark:border-0 ">
              <div className="flex h-24 shrink-0 items-center">
                <Image
                  className="h-20 w-20"
                  alt="Lotemania dashboard"
                  src="/icons/logo.svg"
                  priority={true}
                  width={200}
                  height={200}
                />
              </div>
              <nav className="flex flex-1 flex-col ">
                <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
                  <li>
                    <NavigationSidebar />
                  </li>
                  <li className="mt-auto">
                    <Theme />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="lg:pl-60 ml-5 pr-5 pt-5 bg-gray-50 dark:bg-gray-900 ">
            <Navbar session={session} />

            <main
              className="py-8 bg-gray-50 dark:bg-gray-900"
              style={{ minHeight: "calc(100vh - 6.28rem)" }}
            >
              {children}
            </main>
          </div>
          <ToastProvider />
        </ThemeProvider>
      </Providers>
    </AuthContext>
  );
}
