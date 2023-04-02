import React, { ReactElement, useEffect, useState } from "react";

import { HeaderPage } from "../components/HeaderPage";
import Image from "next/image";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../types/layout";
import { Separator } from "../components/ui/separator";
import { cn } from "../utils/cn";
import supabase from "../utils/createClient";
import { useRouter } from "next/router";

// import supabase from "../utils/createClient";

const DiscordChannels: NextPageWithLayout = () => {
  const router = useRouter();

  const handleButtonClick = (url: string) => {
    router.push(url);
  };

  const discGroups = [
    {
      name: "Coordenadoria",
      link: "https://discord.com/invite/group1",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1984-Macintosh.png?t=2023-02-22T03%3A04%3A49.454Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 1",
    },
    {
      name: "Primeiro Semestre",
      link: "https://discord.com/invite/group2",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1989-MacintoshIIci.png?t=2023-02-22T03%3A12%3A12.781Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 2",
    },
    {
      name: "Segundo Semestre",
      link: "https://discord.com/invite/group3",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1989-MacintoshIIfx.png?t=2023-02-22T03%3A12%3A23.622Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 3",
    },
    {
      name: "Terceiro Semestre",
      link: "https://discord.com/invite/group4",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1993-MacintoshCentris.png?t=2023-02-22T03%3A12%3A31.348Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 4",
    },
    {
      name: "Quarto Semestre",
      link: "https://discord.com/invite/group5",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/1993-MacintoshTV.png?t=2023-02-22T03%3A12%3A45.006Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 5",
    },
    {
      name: "Quinto Semestre",
      link: "https://discord.com/invite/group5",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/2002-iMac.png?t=2023-02-22T03%3A13%3A03.049Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 6",
    },
    {
      name: "Sexto Semestre",
      link: "https://discord.com/invite/group5",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/2007-NovoIMac.png?t=2023-02-22T03%3A13%3A14.031Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 7",
    },
    {
      name: "Setimo Semestre",
      link: "https://discord.com/invite/group5",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/iMacPatterns.png?t=2023-02-22T03%3A13%3A55.700Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 8",
    },
    {
      name: "Oitavo Semestre",
      link: "https://discord.com/invite/group5",
      avatarUrl:
        "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/discord.groups.images/Pc-2023.png?t=2023-02-22T03%3A15%3A39.891Z",
      notices: "lore ipsum dolor sit amet consectetur adipisicing elit",
      Professor: "Professor 9",
    },
  ];

  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-between text-white`}
    >
      <HeaderPage
        src01={
          "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/banners-discord/discordBanner_resized.png?t=2023-02-22T00%3A03%3A30.635Z"
        }
        classNameImg="flex h-[calc(34.33476394849785vh)] w-[100%] object-cover"
        nIMG={1}
      />
      <Separator
        className={cn("bg-gradient-to-b from-zinc-900 to-[#0e0e0f00]")}
      />
      <main className="flex h-full w-full flex-col gap-4 pl-10">
        <section className="flex flex-col gap-1">
          <h1>Grupo destinado as grupos relacionados a cada materia</h1>
          <h3>
            Com a intencao de facilitar as interacoes entre os alunos com os
            professores, abaixo estao um canal direto para cada semestre, dessa
            forma ao entrar em um grupo, voce acessara todos os outros grupos de
            cada materia daquele semestre, e assim podera interagir com os
            outros alunos e professores.
          </h3>
        </section>
        <section className="flex flex-wrap gap-6 pl-2">
          {discGroups.map((group, index) => (
            <div
              key={index}
              className="mx-5 my-5 flex h-[10vh] w-[35vw] flex-col items-center justify-between"
            >
              <div className="relative flex h-[27.467811158798284vh] w-full justify-between gap-4">
                <Image
                  src={group.avatarUrl}
                  layout="fill"
                  alt={group.name}
                  objectFit="cover"
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
        </section>
      </main>
    </section>
  );
};

DiscordChannels.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DiscordChannels;
