import { HiHome, HiMenu, HiOutlineX, HiPencil } from "react-icons/hi";

import Link from "next/link";
import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function Navbar() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);

  const menuEdit = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: HiPencil,
    },
    {
      name: "Atividades complementares",
      link: "/additionalactivities",
      icon: HiPencil,
    },
    {
      name: "Docentes do curso",
      link: "/docents",
      icon: HiPencil,
    },
    {
      name: "Sobre o curso",
      link: "/aboutcourse",
      icon: HiPencil,
    },
    {
      name: "Proposito do curso",
      link: "/coursepurpose",
      icon: HiPencil,
    },
    {
      name: "Perfil profissional",
      link: "/jobprofile",
      icon: HiPencil,
    },
    {
      name: "Nucleo docente",
      link: "/facultycore",
      icon: HiPencil,
    },
    {
      name: "Horario de aulas",
      link: "/schedule",
      icon: HiPencil,
    },
    {
      name: "Colegiado do curso",
      link: "/colegiatte",
      icon: HiPencil,
    },
    {
      name: "Ementas e bibliografias",
      link: "/syllabuses-and-bibliographies",
      icon: HiPencil,
    },
    {
      name: "Equivalencias de disciplinas",
      link: "/equivalencesubjects",
      icon: HiPencil,
    },
    {
      name: "Grade Curricular",
      link: "/curriculumsubjects",
      icon: HiPencil,
    },
    {
      name: "Rol de Disciplinas Eletivas",
      link: "/electivesubjects",
      icon: HiPencil,
    },
    {
      name: "Eventos",
      link: "/events",
      icon: HiPencil,
    },
    {
      name: "Grupo de Computacao Aplicada",
      link: "/gca",
      icon: HiPencil,
    },
    {
      name: "Projetos do Curso",
      link: "/projects",
      icon: HiPencil,
    },
    {
      name: "Artigos Publicados",
      link: "/articles",
      icon: HiPencil,
    },
    {
      name: "Tcc's Publicados",
      link: "/tcc",
      icon: HiPencil,
    },
    {
      name: "Canais do discord",
      link: "/discordchannels",
      icon: HiPencil,
    },
    {
      name: "Informativos",
      link: "/informatives",
      icon: HiPencil,
    },
    {
      name: "Guarda religiosa",
      link: "/religiousguard",
      icon: HiPencil,
    },
    {
      name: "Estagio Supervisionado",
      link: "/supervisedinternship",
      icon: HiPencil,
    },
    {
      name: "Regulamentacoes do TCC",
      link: "/tccinternalstandards",
      icon: HiPencil,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-full justify-end bg-zinc-800 ${
        isActiveNav ? "w-[15vw] " : "w-[4vw]"
      } duration-4000 rounded-md border-2 border-zinc-100
        border-opacity-5 bg-[#0e0e0e] bg-opacity-5 px-4
        text-gray-100 transition-all ease-in-out`}
    >
      <div
        className={` flex justify-between py-3 transition-all duration-500 ${
          isActiveNav
            ? "pl-1"
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
      <div className="flex h-full flex-col gap-4 overscroll-none">
        <Link
          href={"/"}
          className={`group flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 `}
        >
          <div>{React.createElement(HiHome, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `${0.05}s`,
            }}
            className={`whitespace-pre duration-500 ${
              isActiveNav ? "" : "translate-x-[7vw] overflow-hidden  opacity-0"
            }`}
          >
            Home
          </h2>
          <span
            className={`${
              isActiveNav ? "hidden" : ""
            } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
              duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
          >
            Home
          </span>
        </Link>
        <hr />
        <ScrollArea className={`h-full`}>
          <div className="h-[100vh]">
            {menuEdit?.map((menu, i) => (
              <Link
                href={`/admin${menu?.link}`}
                key={i}
                className={`group flex items-center gap-3 rounded-md  p-2 pt-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    isActiveNav
                      ? ""
                      : "translate-x-[7vw] overflow-hidden opacity-0"
                  }`}
                >
                  {menu?.name}
                </h2>
                <span
                  className={`${
                    isActiveNav ? "hidden" : ""
                  } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
                >
                  {menu?.name}
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
