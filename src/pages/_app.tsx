import "../styles/globals.css";

import type { AppPropsWithLayout } from "../types/layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { api } from "../utils/api";

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
