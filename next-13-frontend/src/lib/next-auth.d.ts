import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: User;
  }
  interface SessionOptions {
    jwt: boolean;
  }

  interface User {
    id: string;
    username: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
