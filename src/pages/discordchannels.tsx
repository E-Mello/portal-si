import React, { type ReactElement } from "react";

import Image from "next/image";
import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const DiscordChannels: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.discordChannels.getAll.useQuery();

  const handleButtonClick = (url: string) => {
    void router.push(url);
  };

  const discordImage =
    "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/banners-discord/discordBanner_resized.png";

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section
      className={`flex h-[100vh] w-full flex-col items-center justify-evenly bg-zinc-800 p-2 text-white`}
    >
      <Image width={500} height={500} alt="Discord Banner" src={discordImage} />
      <header className="flex flex-col gap-2 pb-2">
        <h1 className="text-3xl font-bold">
          Grupo destinado as grupos relacionados a cada materia
        </h1>
        <h3 className="text-justify">
          Com a intencao de facilitar as interacoes entre os alunos com os
          professores, abaixo estao um canal direto para cada semestre, dessa
          forma ao entrar em um grupo, voce acessara todos os outros grupos de
          cada materia daquele semestre, e assim podera interagir com os outros
          alunos e professores.
        </h3>
      </header>
      <div className="col-span-2 flex h-full w-full flex-wrap gap-6 pl-2">
        {pageData.map((data) => (
          <div key={data.id} className=" flex flex-col items-center p-4">
            <div className="flex justify-center">
              <Image
                src={data.avatarUrl}
                alt={data.name}
                width={500}
                height={500}
                className="flex h-[8vh] w-[4vw] rounded-full max-sm:w-16"
              />
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg font-medium">{data.name}</h2>
              <p className="text-sm">{data.info}</p>
              <button
                className="mt-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={() => handleButtonClick(data.link)}
              >
                Join Channel
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

DiscordChannels.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DiscordChannels;
