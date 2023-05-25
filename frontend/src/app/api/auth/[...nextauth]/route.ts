import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

namespace JwtUtils {
  export const isJwtExpired = (token: string) => {
    // offset by 60 seconds, so we will check if the token is "almost expired".
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (
      decoded !== null &&
      decoded !== undefined &&
      typeof decoded === "object"
    ) {
      if (decoded["exp"]) {
        const adjustedExpiry = decoded["exp"];

        if (adjustedExpiry < currentTime) {
          console.log("Token expired");
          return true;
        }

        console.log("Token has not expired yet");
        return false;
      }
    }

    console.log('Token["exp"] does not exist');
    return true;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account?.provider === "google") {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/social/login/google/`,
              {
                access_token: account.access_token,
                id_token: account.id_token,
              }
            );

            const { access_token, refresh_token } = response.data;

            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            };

            return token;
          } catch (error) {
            return token;
          }
        }
      }

      if (JwtUtils.isJwtExpired(token.accessToken as string)) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh/`,
            {
              refresh: token.refreshToken,
            }
          );
          const { access, refresh } = response.data;

          if (access && refresh) {
            token = {
              ...token,
              accessToken: access,
              refreshToken: refresh,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
            };

            return token;
          }
        } catch (error) {
          return {
            ...token,
            exp: 0,
          };
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken as string;
      return { ...session };
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
