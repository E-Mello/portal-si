import Layout from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { type NextPageWithLayout } from "~/types/layout";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import { Separator } from "~/components/ui/separator";
import type { ReactElement } from "react";
import Image from "next/image";

const LogoUnemat =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/LogoUnemat.png?t=2023-02-22T23%3A57%3A16.417Z";

const PanelConfig: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex w-[100%] flex-col items-center justify-center bg-gradient-to-b from-[#272727a2] to-[#0e0e0f00]">
        <Image
          src={LogoUnemat}
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
