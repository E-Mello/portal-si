import {
  HiAcademicCap,
  HiChartPie,
  HiChatAlt2,
  HiCog,
  HiHome,
  HiMenu,
  HiNewspaper,
  HiOutlineX,
  HiPhotograph,
} from "react-icons/hi";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark, unstable_createTheme } from "@clerk/themes";

import { AuthMenuItem } from "../AuthMenuItem";
import { Avatar } from "../Avatar";
import { IconBase } from "react-icons/lib";
import Link from "next/link";
import React from "react";
import { cn } from "../../utils/cn";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

interface MyLoadedClerk {
  clerk: any;
}

export function SideNav() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);

  function changeStateBtn() {
    setIsActiveNav(!isActiveNav);
  }

  const menus = [
    {
      name: "Home",
      linkAuthenticated: "/auth/pages/authindex",
      linkPublic: "/",
      icon: HiHome,
      haveOptions: false,
    },
    {
      name: "Dashboard",
      linkAuthenticated: "/auth/pages/authdashboard",
      linkPublic: "/dashboard",
      icon: HiChartPie,
      haveOptions: false,
    },
    {
      name: "TCC's Feitos",
      linkAuthenticated: "/auth/pages/authtcc",
      linkPublic: "/tcc",
      icon: HiAcademicCap,
      haveOptions: false,
    },
    {
      name: "Canais Discord",
      linkAuthenticated: "/auth/pages/authdiscordchannels",
      linkPublic: "/discordchannels",
      icon: HiChatAlt2,
      haveOptions: false,
      margin: true,
    },
    {
      name: "Midias",
      linkAuthenticated: "/auth/pages/authmedia",
      linkPublic: "/media",
      icon: HiPhotograph,
      haveOptions: true,
    },
    {
      name: "Informativos",
      linkAuthenticated: "/auth/pages/authinformatives",
      linkPublic: "/informatives",
      icon: HiNewspaper,
      haveOptions: false,
      margin: true,
    },
    {
      name: "Configuracao",
      linkAuthenticated: "/auth/pages/authindex",
      linkPublic: "/",
      icon: HiCog,
      haveOptions: false,
      footer: true,
    },
  ];
  return (
    <aside
      className={`fixed left-0 top-0 z-50 min-h-screen justify-end ${
        isActiveNav ? "w-[15vw] " : "w-[4vw]"
      } duration-4000 rounded-md border-2 border-zinc-100
        border-opacity-5 bg-[#0e0e0e] bg-opacity-5 px-4
        text-gray-100 transition-all ease-in-out`}
    >
      <div
        className={` flex justify-between py-3 transition-all duration-500 ${
          isActiveNav ? "" : "flex-initial flex-col-reverse items-center gap-4"
        }`}
      >
        <UserButton
          afterSignOutUrl="/login"
          appearance={{
            baseTheme: unstable_createTheme({
              layout: {},
              variables: {
                colorBackground: "#4D455D",
                colorText: "#fff",
                colorDanger: "#ff0000",
                colorSuccess: "#00ff00",
                fontWeight: { bold: 900 },
              },
            }),
            userProfile: {
              baseTheme: dark,
            },
          }}
        />
        <span className={`whitespace-nowrap text-xs transition-all`}></span>
        {isActiveNav ? (
          <HiOutlineX
            size={26}
            className="cursor-pointer transition-all duration-500"
            onClick={() => setIsActiveNav(!isActiveNav)}
          />
        ) : (
          <HiMenu
            size={26}
            className="cursor-pointer transition-all duration-500"
            onClick={() => setIsActiveNav(!isActiveNav)}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 py-4">
        {menus.map((menu, i) => (
          <AuthMenuItem key={i} menu={menu} delay={1} i={0} />
        ))}
      </div>
    </aside>
  );
}
