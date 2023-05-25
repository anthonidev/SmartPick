import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function DashboardMain() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!session.accessToken) {
    return null;
  }
  return <>Main PAge</>;
}
