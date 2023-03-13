import { Session } from "next-auth";
import { useEffect } from "react";
import useSwr, { mutate } from "swr";

const sessionUrl = "/api/auth/session";

async function fetchSession(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch session from ${url}`);
  }

  const session: Session = await response.json();
  // const status : "loading" | "authenticated" | "unauthenticated" = await response.status;
  console.log("session", session);

  if (!session || Object.keys(session).length === 0) {
    return null;
  }

  return session;
}

export function useAuth(refreshInterval?: number) {
  const { data, error } = useSwr(sessionUrl, fetchSession, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    const intervalId = setInterval(
      () => mutate(sessionUrl),
      (refreshInterval || 20) * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  return {
    session: data,
    loading: typeof data === "undefined" && typeof error === "undefined",
  };
}
