import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { HiHome, HiMenu, HiOutlineX } from "react-icons/hi";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark, unstable_createTheme } from "@clerk/themes";

import Link from "next/link";
import React from "react";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

const menuItems = [
  {
    label: "Dashboard",
    submenus: [
      {
        info: "DashboardCardInfo",
        slug: "~/components/auth/content/dashboardpage/DashboardCardInfo",
      },
      {
        info: "DashboardImage",
        slug: "~/components/auth/content/dashboardpage/DashboardImage",
      },
      {
        info: "DashboardTitles",
        slug: "~/components/auth/content/dashboardpage/DashboardTitles",
      },
    ],
  },
  {
    label: "Menu Course",
    submenus: [
      {
        info: "Sobre o Curso",
        slug: "~/components/auth/content/menucourse/AboutData",
      },
      {
        info: "Colegiado do Curso",
        slug: "~/components/auth/content/menucourse/CollegiateData",
      },
      {
        info: "Pagina de Docentes",
        slug: "~/components/auth/content/menucourse/DocentsPage",
      },
      {
        info: "FacultyCorePage",
        slug: "~/components/auth/content/menucourse/FacultyCorePage",
      },
      {
        info: "Perfil Profissional",
        slug: "~/components/auth/content/menucourse/ProfileData",
      },
      {
        info: "Propósito do Curso",
        slug: "~/components/auth/content/menucourse/PurposeData",
      },
      {
        info: "Horário do Curso",
        slug: "~/components/auth/content/menucourse/ScheduleData",
      },
      {
        info: "Professores do Curso",
        slug: "~/components/auth/content/menucourse/TeachersData",
      },
    ],
  },
  {
    label: "Estrutura Curricular",
    submenus: [
      {
        info: "Bibliografias",
        slug: "~/components/auth/content/menucurricularstructure/BibliographiesData",
      },
      {
        info: "Curriculo",
        slug: "~/components/auth/content/menucurricularstructure/CurriculumData",
      },
      {
        info: "Disciplinas Eletivas",
        slug: "~/components/auth/content/menucurricularstructure/ElectivesData",
      },
      {
        info: "Disciplinas Obrigatórias",
        slug: "~/components/auth/content/menucurricularstructure/SubjectData",
      },
    ],
  },
  {
    label: "Menu Eventos",
    submenus: [
      {
        info: "Outros Eventos",
        slug: "~/components/auth/content/menuevents/OthersEventsData",
      },
      {
        info: "Eventos Unemat",
        slug: "~/components/auth/content/menuevents/UnematEventsData",
      },
    ],
  },
  {
    label: "Regulamentação Interna",
    submenus: [
      {
        info: "Atividades",
        slug: "~/components/auth/content/menuinternalstandards/ActiviesData",
      },
      {
        info: "Regulamentações",
        slug: "~/components/auth/content/menuinternalstandards/InternshipPage",
      },
      {
        info: "Guarda Religiosa",
        slug: "~/components/auth/content/menuinternalstandards/ReligiousPage",
      },
      {
        info: "Regras para o TCC",
        slug: "~/components/auth/content/menuinternalstandards/TccRegulationsPage",
      },
    ],
  },
  {
    label: "Projetos",
    submenus: [
      {
        info: "Projetos de Extensão",
        slug: "~/components/auth/content/menuprojects/ExtProjectPage",
      },
      { info: "GCA", slug: "~/components/auth/content/menuprojects/GcaPage" },
      {
        info: "Projetos de Pesquisa",
        slug: "~/components/auth/content/menuprojects/ResearchProjectPage",
      },
      {
        info: "Projetos de Estudo",
        slug: "~/components/auth/content/menuprojects/TeachingProjectsPage",
      },
    ],
  },
  {
    label: "Publicações",
    submenus: [
      {
        info: "Artigos",
        slug: "~/components/auth/content/menupublications/ArticlesPage",
      },
      {
        info: "TCC",
        slug: "~/components/auth/content/menupublications/TccPage",
      },
    ],
  },
];

export default function Navbar() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);

  const user = useUser();
  function changeStateBtn() {
    setIsActiveNav(!isActiveNav);
  }

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
        <Link
          href={"/"}
          className={`group mb-2 flex items-center gap-4 rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700 `}
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
        <Accordion
          type="single"
          collapsible
          className={`${
            isActiveNav
              ? "w-[13vw]"
              : "flex w-12 flex-col items-center text-center"
          }`}
        >
          {menuItems.map((item, index) => (
            <AccordionItem key={index} value={item.label}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {item.submenus.map((submenu, index) => (
                    <li key={index}>
                      <Link href={submenu.slug}>
                        <a>{submenu.info}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}
