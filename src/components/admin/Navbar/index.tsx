import { HiHome, HiMenu, HiOutlineX, HiPencil } from "react-icons/hi";
import { dark, unstable_createTheme } from "@clerk/themes";

import Link from "next/link";
import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
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
      link: "/teachingcenter",
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
      link: "/courseprogram",
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
      name: "Estrutura Curricular",
      link: "/curricularstructure",
      icon: HiPencil,
    },
    {
      name: "Eventos",
      link: "/events",
      icon: HiPencil,
    },
    {
      name: "Demais Eventos",
      link: "/othersevents",
      icon: HiPencil,
    },
    {
      name: "Grupo de Computacao Aplicada",
      link: "/gca",
      icon: HiPencil,
    },
    {
      name: "Projetos de Ensino",
      link: "/teachingprojects",
      icon: HiPencil,
    },
    {
      name: "Projetos de Extensao",
      link: "/extensionprojects",
      icon: HiPencil,
    },
    {
      name: "Projetos de Pesquisa",
      link: "/researchprojects",
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
      name: "Guarda religiosaa",
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
      <ScrollArea
        className={`h-full ${isActiveNav ? "w-[14vw] " : "w-[2vw]"} rounded-md`}
      >
        <div className="relative mt-[3vh] flex flex-col gap-4">
          <Link
            href={"/"}
            className={`group flex items-center gap-4 rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 `}
          >
            <div>{React.createElement(HiHome, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${0.05}s`,
              }}
              className={`whitespace-pre duration-500 ${
                isActiveNav ? "" : "translate-x-[7vw] overflow-hidden opacity-0"
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

          {menuEdit?.map((menu, i) => (
            <Link
              href={`/admin/${menu?.link}`}
              key={i}
              className={` group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
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
    </aside>
  );
}
