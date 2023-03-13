import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";
import { JwtUtils, UrlUtils } from "@/constants/Utils";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
            console.log("RESPONSE", response.data);

            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            };

            return token;
          } catch (error) {
            return token;
          }
        } else if (account?.provider === "facebook") {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/social/login/facebook/`,
              {
                access_token: account.access_token,
                id_token: account.id_token,
              }
            );
            const { access_token, refresh_token } = response.data;
            console.log("RESPONSE", response.data);

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
          console.log("REFRESH OLD", token.accessToken);
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
export default NextAuth(authOptions);
