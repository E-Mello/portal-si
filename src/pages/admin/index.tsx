import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import type { ReactElement } from "react";
import Image from "next/image";

const LogoUnematSupabase =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/LogoUnemat.png?t=2023-02-22T23%3A57%3A16.417Z";

const PanelConfig: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col items-center justify-center bg-zinc-800">
        <Image
          src={LogoUnematSupabase}
          alt=""
          width={500}
          height={500}
          className={`opacity-10`}
        />
      </div>
    </ProtectedRoute>
  );
};

PanelConfig.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PanelConfig;
