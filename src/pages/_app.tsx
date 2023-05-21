import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";

import type { AppPropsWithLayout } from "../types/layout";
import { ClerkProvider } from "@clerk/nextjs";
// import { type AppType } from "next/app";
import { ToastContainer } from "react-toastify";
import { api } from "~/utils/api";

//function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      <title>WebSite Unemat</title>
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
