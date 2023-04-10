import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { type ReactElement } from "react";

import Card from "~/components/Card";
import { HeaderPage } from "~/components/HeaderPage";
import Layout from "~/components/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import { Separator } from "~/components/ui/separator";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useUser } from "@clerk/nextjs";
import router from "next/router";

interface Menus {
  [key: string]: {
    name: string;
    Link: string;
    info: string;
  }[];
  // other properties
}

interface DashboardItem {
  name: string;
  PublicLink: string;
  AuthLink: string;
  info: string;
}

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const menuCourse: DashboardItem[] = [
  {
    name: "Docentes",
    PublicLink: "/docentes",
    AuthLink: "/auth/pages/authdocentes",
    info: "Informações sobre os docentes",
  },
  {
    name: "Colegiado de Curso",
    PublicLink: "/colegiado",
    AuthLink: "/auth/pages/authcolegiado",
    info: "Informações sobre o colegiado",
  },
  {
    name: "Horário",
    PublicLink: "/schedule",
    AuthLink: "/auth/pages/authschedule",
    info: "Informações sobre os Horarios",
  },
  {
    name: "Nucleo Docente",
    PublicLink: "/teachingcenter",
    AuthLink: "/auth/pages/authteachingcenter",
    info: "Informações sobre os docentes",
  },
  {
    name: "Perfil Profissional",
    PublicLink: "/jobprofile",
    AuthLink: "/auth/pages/authjobprofile",
    info: "Informações sobre o perfil profissional",
  },
  {
    name: "Propósito do Curso",
    PublicLink: "/coursepurpose",
    AuthLink: "/auth/pages/authcoursepurpose",
    info: "Informações sobre o propósito do curso",
  },
  {
    name: "Sobre do Curso",
    PublicLink: "/aboutcourse",
    AuthLink: "/auth/pages/authaboutcourse",
    info: "Informações sobre o curso",
  },
];
const menuCurricularStructure: DashboardItem[] = [
  {
    name: "Ementas e bibliografias",
    PublicLink: "/ementa",
    AuthLink: "/auth/pages/authementa",
    info: "Informações sobre a ementa",
  },
  {
    name: "Equivalência de disciplinas",
    PublicLink: "/equivalencesubjects",
    AuthLink: "/auth/pages/authequivalencesubjects",
    info: "Informações sobre as disciplinas",
  },
  {
    name: "Grade Curricular",
    PublicLink: "/curriculumsubjects",
    AuthLink: "/auth/pages/authcurriculumsubjects",
    info: "Informações sobre a grade curricular",
  },
  {
    name: "Rol de disciplinas eletivas",
    PublicLink: "/electivesubjects",
    AuthLink: "/auth/pages/authelectivesubjects",
    info: "Informações sobre as disciplinas",
  },
];
const menuEvents: DashboardItem[] = [
  {
    name: "Eventos promovidos pela UNEMAT",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Outros Eventos",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
];
const menuInternalStandards: DashboardItem[] = [
  {
    name: "Atividades complementares",
    PublicLink: "/additionalactivities",
    AuthLink: "/auth/pages/authadditionalactivities",
    info: "Informações sobre as atividades complementares",
  },
  {
    name: "Guarda religiosa",
    PublicLink: "/religiousguard",
    AuthLink: "/auth/pages/authreligiousguard",
    info: "Informações sobre a guarda religiosa",
  },
  {
    name: "Estágio Supervisionado",
    PublicLink: "/supervisedinternship",
    AuthLink: "/auth/pages/authsupervisedinternship",
    info: "Informações sobre o estágio supervisionado",
  },
  {
    name: "TCC",
    PublicLink: "/tccinternalstandards",
    AuthLink: "/auth/pages/authtccinternalstandards",
    info: "Informações sobre as normativas internas",
  },
];
const menuProjects: DashboardItem[] = [
  {
    name: "Grupo de Computação aplicada (GCC)",
    PublicLink: "/appliedcomputinggroup",
    AuthLink: "/auth/pages/authappliedcomputinggroup",
    info: "Informações sobre o grupo de computação aplicada",
  },
  {
    name: "Projetos de Ensino",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Projetos de Extensão",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Projetos de Pesquisa",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
];
const menuPublications: DashboardItem[] = [
  {
    name: "Artigos",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Trabalho de Conclusão de Curso (TCC)",
    PublicLink: "/dashboard",
    AuthLink: "/auth/pages/authdashboard",
    info: "Informações sobre as publicações",
  },
];

const AuthenticatedDashboard: NextPageWithLayout<{
  itemLink: DashboardItem;
}> = ({ itemLink }) => {
  const user = useUser();

  if (!user) return <div>Carregando...</div>;

  return (
    <ProtectedRoute>
      <section
        className={`relative flex h-full w-[100vw] flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
      >
        <h1 className="text-[2rem] font-bold">
          Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
        </h1>
        <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas ao curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuCourse.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas a Estrutura Curricular
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuCurricularStructure.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas aos Eventos do Curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuEvents.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas as Regulamentacoes Internas
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuInternalStandards.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas aos projetos do curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuProjects.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas as Publicacoes do curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
              {menuPublications.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  Link={user ? item.AuthLink : item.PublicLink}
                  Info={item.info}
                />
              ))}
            </div>
          </div>
          <Separator />
        </div>
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedDashboard.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedDashboard;
