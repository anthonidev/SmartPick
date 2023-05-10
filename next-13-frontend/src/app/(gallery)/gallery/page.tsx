import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      Page Gallery
    </div>
  );
}
