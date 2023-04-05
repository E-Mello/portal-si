import Image from "next/image";
import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "~/components/ProtectedRoute";
import type { ReactElement } from "react";

const LogoUnemat =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/LogoUnemat.png?t=2023-02-22T23%3A57%3A16.417Z";

const AuthenticatedHome: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#272727a2] to-[#0e0e0f00]">
        <Image
          src={LogoUnemat}
          width={500}
          height={300}
          alt=""
          className={`opacity-10`}
        />
      </div>
    </ProtectedRoute>
  );
};

AuthenticatedHome.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedHome;
