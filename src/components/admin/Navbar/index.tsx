import { HiHome, HiMenu, HiOutlineX, HiPencil } from "react-icons/hi";
import React, { useState } from "react";

import Link from "next/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function Navbar() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  const [hoverItem, setHoverItem] = useState(false);

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
        className={` flex justify-between transition-all duration-500 ${
          isActiveNav
            ? "pb-2 pl-1 pt-3"
            : "flex-initial flex-col-reverse items-center gap-1 pl-0"
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
      <div className="h-full">
        <Link
          href={"/"}
          className={`group relative mb-3 flex items-center gap-3 rounded-md p-2  text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 `}
          onMouseEnter={() => {
            setHoverItem(true);
          }}
          onMouseLeave={() => {
            setHoverItem(false);
          }}
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
            className={`left-16 whitespace-pre rounded-md font-semibold text-white opacity-0 drop-shadow-lg transition-all duration-500 ease-out ${
              !isActiveNav && hoverItem === true
                ? "fixed group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200"
                : "hidden"
            } `}
          >
            Home
          </span>
        </Link>
        <hr />
        <div className={` h-full ${isActiveNavAtom ? "mb-2" : ""}`}>
          {menuEdit?.map((menu, i) => (
            <Link
              href={`/admin${menu?.link}`}
              key={i}
              className="group relative mb-[0.12rem] flex items-center gap-3 rounded-md p-2 pt-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700"
              onMouseEnter={() => {
                setHoverItem(true);
              }}
              onMouseLeave={() => {
                setHoverItem(false);
              }}
            >
              <div className={``}>
                {React.createElement(menu.icon, { size: "20" })}
              </div>
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
                className={`left-16 whitespace-pre rounded-md font-semibold text-white opacity-0 drop-shadow-lg transition-all duration-500 ease-out ${
                  !isActiveNav && hoverItem === true
                    ? "fixed group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200"
                    : "hidden"
                }`}
              >
                {menu?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
