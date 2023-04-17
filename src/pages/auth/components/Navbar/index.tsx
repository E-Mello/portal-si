import {
  HiAcademicCap,
  HiChartPie,
  HiChatAlt2,
  HiHome,
  HiMenu,
  HiNewspaper,
  HiOutlineX,
  HiPhotograph,
  HiPencil,
  HiOutlineIdentification,
  HiDatabase,
} from "react-icons/hi";

import React, { type ReactElement } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark, unstable_createTheme } from "@clerk/themes";

import Link from "next/link";
import ProtectedRoute from "~/components/ProtectedRoute";
import { Separator } from "~/components/ui/separator";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function Navbar() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  const user = useUser();
  function changeStateBtn() {
    setIsActiveNav(!isActiveNav);
  }

  const menu01 = [
    {
      name: "Titulos da Pagina",
      Link: "/dashboardpage/dashboardtitles",
      icon: HiPencil,
    },
    {
      name: "Imagens da Pagina",
      Link: "/dashboardpage/dashboardimage",
      icon: HiPhotograph,
    },
    {
      name: "Cards da Pagina",
      Link: "/dashboardpage/dashboardcardinfo",
      icon: HiOutlineIdentification,
    },
  ];

  const menu02 = [
    {
      name: "Titulos da Pagina",
      Link: "/docentspage/docentstitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/docentspage/docentsdata",
      icon: HiDatabase,
    },
  ];

  const menu03 = [
    {
      name: "Titulos da Pagina",
      Link: "/collegiatepage/collegiatetitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/collegiatepage/collegiatedata",
      icon: HiDatabase,
    },
  ];

  const menu04 = [
    {
      name: "Titulos da Pagina",
      Link: "/schedulepage/scheduletitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/schedulepage/scheduledata",
      icon: HiDatabase,
    },
  ];

  const menu05 = [
    {
      name: "Titulos da Pagina",
      Link: "/schedulepage/scheduletitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/schedulepage/scheduledata",
      icon: HiDatabase,
    },
  ];

  const menu06 = [
    {
      name: "Titulos da Pagina",
      Link: "/faculticorepage/coretitles",
      icon: HiPencil,
    },
  ];

  const menu07 = [
    {
      name: "Titulos da Pagina",
      Link: "/professionalprofilepage/profiletitles",
      icon: HiPencil,
    },
  ];

  const menu08 = [
    {
      name: "Titulos da Pagina",
      Link: "/coursepurposepage/purposetitles",
      icon: HiPencil,
    },
  ];

  const menu09 = [
    {
      name: "Titulos da Pagina",
      Link: "/aboutcoursepage/abouttitles",
      icon: HiPencil,
    },
  ];

  const menu10 = [
    {
      name: "Titulos da Pagina",
      Link: "/schedulepage/scheduletitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/schedulepage/scheduledata",
      icon: HiDatabase,
    },
  ];

  const menu11 = [
    {
      name: "Titulos da Pagina",
      Link: "/schedulepage/scheduletitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/schedulepage/scheduledata",
      icon: HiDatabase,
    },
  ];

  const menu12 = [
    {
      name: "Titulos da Pagina",
      Link: "/schedulepage/scheduletitles",
      icon: HiPencil,
    },
    {
      name: "Dados da Pagina",
      Link: "/schedulepage/scheduledata",
      icon: HiDatabase,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-[100vh] justify-end ${
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
      <div className="relative mt-[3vh] flex flex-col gap-4">
        <Accordion type="single" collapsible className="w-[13vw]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="no-underline">
              Edicoes do Dashboard
            </AccordionTrigger>
            <AccordionContent className="no-underline">
              {menu01?.map((menu, i) => (
                <Link
                  href={`/auth/components/content/${menu?.Link}`}
                  key={i}
                  className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i * 0.05}s`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !isActiveNav &&
                      "translate-x-[7vw] overflow-hidden opacity-0"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <span
                    className={` ${
                      isActiveNav && "hidden"
                    } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                  >
                    {menu?.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Docents Page</AccordionTrigger>
            <AccordionContent>
              {menu02?.map((menu, i) => (
                <Link
                  href={`/auth/components/content/${menu?.Link}`}
                  key={i}
                  className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i * 0.05}s`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !isActiveNav &&
                      "translate-x-[7vw] overflow-hidden opacity-0"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <span
                    className={` ${
                      isActiveNav && "hidden"
                    } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                  >
                    {menu?.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Colegiado do Curso</AccordionTrigger>
            <AccordionContent>
              {menu03?.map((menu, i) => (
                <Link
                  href={`/auth/components/content/${menu?.Link}`}
                  key={i}
                  className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i * 0.05}s`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !isActiveNav &&
                      "translate-x-[7vw] overflow-hidden opacity-0"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <span
                    className={` ${
                      isActiveNav && "hidden"
                    } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                  >
                    {menu?.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Pagina de Horario</AccordionTrigger>
            <AccordionContent>
              {menu04?.map((menu, i) => (
                <Link
                  href={`/auth/components/content/${menu?.Link}`}
                  key={i}
                  className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i * 0.05}s`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !isActiveNav &&
                      "translate-x-[7vw] overflow-hidden opacity-0"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <span
                    className={` ${
                      isActiveNav && "hidden"
                    } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                  >
                    {menu?.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Pagina 05</AccordionTrigger>
            <AccordionContent>
              {menu05?.map((menu, i) => (
                <Link
                  href={`/auth/components/content/${menu?.Link}`}
                  key={i}
                  className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i * 0.05}s`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !isActiveNav &&
                      "translate-x-[7vw] overflow-hidden opacity-0"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <span
                    className={` ${
                      isActiveNav && "hidden"
                    } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                  >
                    {menu?.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
