import React, { type ReactElement } from "react";

import Image from "next/image";
import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import { useRouter } from "next/router";

const DiscordChannelsAdmin: NextPageWithLayout = () => {
  const router = useRouter();

  const handleButtonClick = (url: string) => {
    void router.push(url);
  };

  const discordImage =
    "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/banners-discord/discordBanner_resized.png";

  const discGroups = [
    {
      name: "Coordenadoria",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1984-Macintosh.png?t=2023-02-22T03%3A04%3A49.454Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 1",
    },
    {
      name: "Primeiro Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1989-MacintoshIIci.png?t=2023-02-22T03%3A12%3A12.781Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 2",
    },
    {
      name: "Segundo Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1989-MacintoshIIfx.png?t=2023-02-22T03%3A12%3A23.622Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 3",
    },
    {
      name: "Terceiro Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1993-MacintoshCentris.png?t=2023-02-22T03%3A12%3A31.348Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 4",
    },
    {
      name: "Quarto Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1993-MacintoshTV.png?t=2023-02-22T03%3A12%3A45.006Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 5",
    },
    {
      name: "Quinto Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/2002-iMac.png?t=2023-02-22T03%3A13%3A03.049Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 6",
    },
    {
      name: "Sexto Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/2007-NovoIMac.png?t=2023-02-22T03%3A13%3A14.031Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 7",
    },
    {
      name: "Setimo Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/iMacPatterns.png?t=2023-02-22T03%3A13%3A55.700Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 8",
    },
    {
      name: "Oitavo Semestre",
      link: "https://discord.gg/rT7X5Sjh85",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/Pc-2023.png?t=2023-02-22T03%3A15%3A39.891Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 9",
    },
  ];

  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-evenly bg-zinc-800 p-2 text-white`}
    >
      <Image width={500} height={500} alt="Discord Banner" src={discordImage} />
      <header className="flex flex-col gap-2 pb-2">
        <h1>Grupo destinado as grupos relacionados a cada materia</h1>
        <h3 className="">
          Com a intencao de facilitar as interacoes entre os alunos com os
          professores, abaixo estao um canal direto para cada semestre, dessa
          forma ao entrar em um grupo, voce acessara todos os outros grupos de
          cada materia daquele semestre, e assim podera interagir com os outros
          alunos e professores.
        </h3>
      </header>
      <div className="col-span-2 flex h-full w-full flex-wrap gap-6 pl-2">
        {discGroups.map((group, index) => (
          <div key={index} className=" flex flex-col items-center p-4">
            <div className="flex justify-center">
              <Image
                src={group.avatarUrl}
                alt={group.name}
                width={500}
                height={500}
                className="flex h-[8vh] w-[4vw] rounded-full"
              />
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg font-medium">{group.name}</h2>
              <p className="text-sm font-medium">{group.Professor}</p>
              <p className="text-sm">{group.notices}</p>
              <button
                className="mt-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={() => handleButtonClick(group.link)}
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

DiscordChannelsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DiscordChannelsAdmin;
