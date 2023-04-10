import { type AppType } from "next/app";

import { api } from "~/utils/api";
import type { AppPropsWithLayout } from "../types/layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import "~/styles/globals.css";

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      <title>WebSite Unemat</title>
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
