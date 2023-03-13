import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { store } from "../context/store";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          {getLayout(
            <>
              <Component {...pageProps} />
            </>
          )}
          <ToastContainer autoClose={4000} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
