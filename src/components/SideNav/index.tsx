import {
  HiAcademicCap,
  HiChartPie,
  HiChatAlt2,
  HiCog,
  HiHome,
  HiMenu,
  HiNewspaper,
  HiOutlineBookmark,
  HiOutlineX,
  HiPhotograph,
} from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark, unstable_createTheme } from "@clerk/themes";

import Link from "next/link";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
import { useAtom } from "jotai";

export function SideNav() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  const [isMounted, setIsMounted] = useState(false);
  const user = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   *
   *
   */

  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);

      const handleChange = (event: {
        matches: boolean | ((prevState: boolean) => boolean);
      }) => {
        setMatches(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      // Initial check
      setMatches(mediaQuery.matches);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }, [query]);

    return matches;
  }

  const isMobileScreen = useMediaQuery("(max-width: 640px)"); // Add this line

  useEffect(() => {
    if (isMobileScreen) {
      setIsActiveNav(false); // Set isActiveNav to false for mobile screens
    }
  }, [isMobileScreen, setIsActiveNav]);

  const menus = [
    {
      name: "Home",
      Link: "/",
      icon: HiHome,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Dashboard",
      Link: "/dashboard",
      icon: HiChartPie,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Informativos",
      Link: "/informatives",
      icon: HiNewspaper,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Canais Discord",
      Link: "/discordchannels",
      icon: HiChatAlt2,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Midias",
      Link: "/media",
      icon: HiPhotograph,
      haveOptions: true,
      auth: false,
    },
    ...(user && user.isSignedIn
      ? [
          {
            name: "Painel de Edição",
            Link: "/admin/",
            icon: HiCog,
            haveOptions: false,
            footer: true,
            auth: true,
          },
        ]
      : []),
  ];

  const othersLinks = [
    {
      name: "Biblioteca Virtual",
      Link: "https://ecosistema.unemat.br/login",
      icon: HiAcademicCap,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Sigaa",
      Link: "https://sigaa.unemat.br/sigaa/verTelaLogin.do;jsessionid=2AFB15EE6649F8E3DA07545D80045256.srv2inst1",
      icon: HiOutlineBookmark,
      haveOptions: false,
      auth: false,
    },
  ];

  const socialMedias = [
    {
      name: "Facebook",
      Link: "https://www.facebook.com/UnematOficial",
      icon: HiAcademicCap,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Instagram",
      Link: "https://www.instagram.com/unematoficial/",
      icon: HiOutlineBookmark,
      haveOptions: false,
      auth: false,
    },
    {
      name: "Instagram Atletica",
      Link: "https://www.instagram.com/unematoficial/",
      icon: HiOutlineBookmark,
      haveOptions: false,
      auth: false,
    },
  ];

  return (
    <aside
      className={`fixed top-0 z-50 h-[100vh] justify-end bg-zinc-800 max-sm:h-full max-sm:bg-zinc-900 ${
        isActiveNav ? "max-sm:w-52 2xl:w-72 " : "max-sm:w-14 2xl:w-[4.8rem]"
      } duration-4000 rounded-md border-zinc-100
        border-opacity-5 bg-zinc-900 bg-opacity-5 
        text-gray-100 transition-all ease-in-out`}
    >
      <div
        className={`flex justify-between py-3 pl-0 transition-all duration-500 ${
          isActiveNav
            ? "pl-4"
            : "flex-initial flex-col-reverse items-center gap-4 pl-0"
        }`}
      >
        <UserButton
          afterSignOutUrl="/login"
          appearance={{
            baseTheme: dark,
            userProfile: {
              baseTheme: dark,
            },
          }}
        />
        <span
          className={`whitespace-nowrap  text-xs transition-all ${
            isActiveNav ? "pr-5" : ""
          }`}
        >
          {isActiveNav ? (
            <HiOutlineX
              size={26}
              className="cursor-pointer  transition-all duration-500"
              onClick={() => setIsActiveNav(!isActiveNav)}
            />
          ) : (
            <HiMenu
              size={26}
              className="cursor-pointer transition-all duration-500"
              onClick={() => setIsActiveNav(!isActiveNav)}
            />
          )}
        </span>
      </div>
      <section className=" flex flex-col gap-4 pb-5 pl-2 pr-2 pt-8">
        {menus
          .filter(
            (menu) =>
              menu.Link !== "/" ||
              (menu.Link === "/" &&
                isMounted &&
                window.location.pathname !== "/")
          )
          .map((menu, i) => (
            <Link
              href={typeof menu.Link === "string" ? menu.Link : "/"}
              key={i}
              className={`group flex gap-4  rounded-md p-2 text-center text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 max-sm:w-full max-sm:items-center max-sm:hover:bg-zinc-900 ${
                isActiveNav
                  ? "w-ful"
                  : "ml-3  w-9 max-sm:ml-1 max-sm:w-8 max-sm:pl-[0.38rem]"
              }`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <p
                style={{
                  transitionDelay: `${i * 0.05}s`,
                }}
                className={`whitespace-pre duration-500 ${
                  isActiveNav
                    ? ""
                    : "translate-x-[8.4rem] overflow-hidden opacity-0"
                }`}
              >
                {menu?.name}
              </p>
              {isMounted && (
                <p
                  className={`${
                    isActiveNav ? "hidden" : ""
                  } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
        duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200 max-sm:hidden`}
                >
                  {menu?.name}
                </p>
              )}
            </Link>
          ))}
      </section>
      <hr />
      <section className="flex flex-col pb-2 pl-2 pr-2 pt-4">
        <h1 className={`pb-2 ${isActiveNav ? "pl-4" : "hidden"}`}>
          Links Uteis
        </h1>
        {othersLinks?.map((menu, i) => (
          <Link
            href={menu?.Link}
            target="_blank"
            key={i}
            className={`group flex gap-4  rounded-md p-2 text-center text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 max-sm:w-full max-sm:items-center max-sm:hover:bg-none ${
              isActiveNav
                ? "w-ful"
                : "ml-3  w-9 max-sm:ml-1 max-sm:w-8 max-sm:pl-[0.38rem]"
            }`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <p
              style={{
                transitionDelay: `${i * 0.05}s`,
              }}
              className={`whitespace-pre duration-500 ${
                isActiveNav
                  ? ""
                  : " translate-x-[7vw] overflow-hidden opacity-0"
              }`}
            >
              {menu?.name}
            </p>
            <p
              className={`${
                isActiveNav ? "hidden" : ""
              } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
              duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200 max-sm:hidden`}
            >
              {menu?.name}
            </p>
          </Link>
        ))}
      </section>
      <hr />
      <section className="flex flex-col pl-2 pr-2 pt-4">
        <h1 className={`pb-2 ${isActiveNav ? " pl-4" : "hidden"}`}>
          Redes Sociais do Curso
        </h1>
        {socialMedias?.map((menu, i) => (
          <Link
            href={menu?.Link}
            target="_blank"
            key={i}
            className={`group flex  gap-4 rounded-md p-2 text-center text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 max-sm:w-full max-sm:items-center max-sm:hover:bg-none ${
              isActiveNav
                ? "w-ful ml-2"
                : "ml-3  w-9 max-sm:ml-1 max-sm:w-8 max-sm:pl-[0.38rem]"
            }`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <p
              style={{
                transitionDelay: `${i * 0.05}s`,
              }}
              className={`whitespace-pre duration-500 ${
                isActiveNav
                  ? ""
                  : " translate-x-[7vw] overflow-hidden opacity-0"
              }`}
            >
              {menu?.name}
            </p>
            <p
              className={`${
                isActiveNav ? "hidden" : ""
              } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
              duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200 max-sm:hidden`}
            >
              {menu?.name}
            </p>
          </Link>
        ))}
      </section>
    </aside>
  );
}
