import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  HiAcademicCap,
  HiAtSymbol,
  HiBell,
  HiClipboardCheck,
  HiCog,
  HiHome,
  HiInformationCircle,
  HiMenu,
  HiOutlineIdentification,
  HiOutlineX,
  HiPencil,
  HiPhotograph,
  HiViewGrid,
} from "react-icons/hi";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark, unstable_createTheme } from "@clerk/themes";

import Link from "next/link";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import { Separator } from "~/components/ui/separator";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function Navbar() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  const user = useUser();
  function changeStateBtn() {
    setIsActiveNav(!isActiveNav);
  }

  const dashboard = [
    {
      name: "Titulos da Pagina",
      Link: "/dashboard/titles",
      icon: HiPencil,
    },
    {
      name: "Imagens da Pagina",
      Link: "/dashboard/image",
      icon: HiPhotograph,
    },
    {
      name: "Cards da Pagina",
      Link: "/dashboard/card_info",
      icon: HiOutlineIdentification,
    },
  ];
  const menuCourse = [
    {
      name: "Página de docentes",
      Link: "/menucourse/docentspage/docentsdata",
      icon: HiPencil,
    },
    {
      name: "Página do Colegiado",
      Link: "/menucourse/collegiatepage/collegiatedata",
      icon: HiPencil,
    },
    {
      name: "Horário",
      Link: "/menucourse/schedulepage/scheduledata",
      icon: HiPencil,
    },
    {
      name: "Nucleo Docente",
      Link: "/menucourse/facultycorepage/coredata",
      icon: HiPencil,
    },
    {
      name: "Perfil Profissional",
      Link: "/menucourse/professionalprofilepage/profiledata",
      icon: HiPencil,
    },
    {
      name: "Propósito do Curso",
      Link: "/menucourse/coursepurposepage/purposedata",
      icon: HiPencil,
    },
    {
      name: "Sobre do Curso",
      Link: "/menucourse/aboutcoursepage/aboutdata",
      icon: HiPencil,
    },
  ];
  const menuCurricularStructure = [
    {
      name: "Ementas e bibliografias",
      Link: "/menucurricularstructure/bibliographiespage/bibliographiesdata",
      icon: HiPencil,
    },
    {
      name: "Equivalência de disciplinas",
      Link: "/menucurricularstructure/curriculumgridpage/curriculumdata",
      icon: HiPencil,
    },
    {
      name: "Grade Curricular",
      Link: "/menucurricularstructure/equivalencesubjectspage/subjectdata",
      icon: HiPencil,
    },
    {
      name: "Rol de disciplinas eletivas",
      Link: "/menucurricularstructure/listelectivespage/electivesdata",
      icon: HiPencil,
    },
  ];
  const menuEvents = [
    {
      name: "Eventos promovidos pela UNEMAT",
      Link: "/menuevents/unemateventspage/unemateventsdata",
      icon: HiPencil,
    },
    {
      name: "Outros Eventos",
      Link: "/menuevents/otherseventspage/otherseventsdata",
      icon: HiPencil,
    },
  ];
  const menuInternalStandards = [
    {
      name: "Atividades complementares",
      Link: "/menuinternalstandards/additionalactivitiespage/activiesdata",
      icon: HiPencil,
    },
    {
      name: "Guarda religiosa",
      Link: "/menuinternalstandards/religiousguardpage/religiousdata",
      icon: HiPencil,
    },
    {
      name: "Estágio Supervisionado",
      Link: "/menuinternalstandards/supervisedinternshippage/superviseddata",
      icon: HiPencil,
    },
    {
      name: "TCC",
      Link: "/menuinternalstandards/tccregulationspage/tccregulationsdata",
      icon: HiPencil,
    },
  ];
  const menuProjects = [
    {
      name: "Grupo de Computação aplicada (GCA)",
      Link: "/menuprojects/gcapage/gcadata",
      icon: HiPencil,
    },
    {
      name: "Projetos de Ensino",
      Link: "/menuprojects/teachingprojectspage/teachingdata",
      icon: HiPencil,
    },
    {
      name: "Projetos de Extensão",
      Link: "/menuprojects/teachingprojectspage/projectsdata",
      icon: HiPencil,
    },
    {
      name: "Projetos de Pesquisa",
      Link: "/menuprojects/researchprojectpage/researchdata",
      icon: HiPencil,
    },
  ];
  const menuPublications = [
    {
      name: "Artigos",
      Link: "/menupublications/articlespage/articlesdata",
      icon: HiPencil,
    },
    {
      name: "Trabalho de Conclusão de Curso (TCC)",
      Link: "/menupublications/tccpage/tccdata",
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
          <AccordionItem
            value="item-1"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>{React.createElement(HiViewGrid, { size: "20" })}</span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Dashboard" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {dashboard?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>
                {React.createElement(HiInformationCircle, { size: "20" })}
              </span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Informações do curso" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuCourse?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>{React.createElement(HiAcademicCap, { size: "20" })}</span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Colegiado do Curso" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuCurricularStructure?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>{React.createElement(HiBell, { size: "20" })}</span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Pagina de Eventos" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuEvents?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>{React.createElement(HiCog, { size: "20" })}</span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Regulamentações Interna" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuInternalStandards?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-6"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>
                {React.createElement(HiClipboardCheck, { size: "20" })}
              </span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Projetos do curso" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuProjects?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-7"
            className={`flex flex-col justify-center text-center ${
              isActiveNav ? "" : "w-8"
            }`}
          >
            <AccordionTrigger>
              <span>{React.createElement(HiAtSymbol, { size: "20" })}</span>
              <span
                className={`${
                  isActiveNav ? "hidden" : ""
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                Dashboard
              </span>
              {isActiveNav ? "Publicações do Curso" : ""}
            </AccordionTrigger>
            <AccordionContent>
              {menuPublications?.map((menu, i) => (
                <Link
                  href={`/admin/${menu?.Link}`}
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
