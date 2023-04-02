import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { ReactElement, useRef } from "react";

import Card from "../components/Card";
import { HeaderPage } from "../components/HeaderPage";
import Layout from "../components/Layout";
import LogoUnemat from "../assets/LogoUnemat.png";
import { NextPageWithLayout } from "../types/layout";
import { Separator } from "../components/ui/separator";

interface Menus {
  [key: string]: {
    name: string;
    Link: string;
    info: string;
  }[];
  // other properties
}

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const menuCourse = [
  {
    name: "Docentes",
    Link: "/docentes",
    info: "Informações sobre os docentes",
  },
  {
    name: "Colegiado de Curso",
    Link: "/colegiado",
    info: "Informações sobre o colegiado",
  },
  {
    name: "Horário",
    Link: "/schedule",
    info: "Informações sobre os Horarios",
  },
  {
    name: "Nucleo Docente",
    Link: "/teachingcenter",
    info: "Informações sobre os docentes",
  },
  {
    name: "Perfil Profissional",
    Link: "/jobprofile",
    info: "Informações sobre o perfil profissional",
  },
  {
    name: "Propósito do Curso",
    Link: "/coursepurpose",
    info: "Informações sobre o propósito do curso",
  },
  {
    name: "Sobre do Curso",
    Link: "/aboutcourse",
    info: "Informações sobre o curso",
  },
];
const menuCurricularStructure = [
  {
    name: "Ementas e bibliografias",
    Link: "/ementa",
    info: "Informações sobre a ementa",
  },
  {
    name: "Equivalência de disciplinas",
    Link: "/equivalencesubjects",
    info: "Informações sobre as disciplinas",
  },
  {
    name: "Grade Curricular",
    Link: "/curriculumsubjects",
    info: "Informações sobre a grade curricular",
  },
  {
    name: "Rol de disciplinas eletivas",
    Link: "/electivesubjects",
    info: "Informações sobre as disciplinas",
  },
];
const menuEvents = [
  {
    name: "Eventos promovidos pela UNEMAT",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Outros Eventos",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
];
const menuInternalStandards = [
  {
    name: "Atividades complementares",
    Link: "/additionalactivities",
    info: "Informações sobre as atividades complementares",
  },
  {
    name: "Guarda religiosa",
    Link: "/religiousguard",
    info: "Informações sobre a guarda religiosa",
  },
  {
    name: "Estágio Supervisionado",
    Link: "/supervisedinternship",
    info: "Informações sobre o estágio supervisionado",
  },
  {
    name: "TCC",
    Link: "/tccinternalstandards",
    info: "Informações sobre as normativas internas",
  },
];
const menuProjects = [
  {
    name: "Grupo de Computação aplicada (GCC)",
    Link: "/appliedcomputinggroup",
    info: "Informações sobre o grupo de computação aplicada",
  },
  {
    name: "Projetos de Ensino",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Projetos de Extensão",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Projetos de Pesquisa",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
];
const menuPublications = [
  {
    name: "Artigos",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
  {
    name: "Trabalho de Conclusão de Curso (TCC)",
    Link: "/dashboard",
    info: "Informações sobre as publicações",
  },
];

const Dashboard: NextPageWithLayout = () => {
  const imageRef = useRef(null);
  return (
    <section
      className={`relative flex h-full w-[100vw] flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
    >
      <h1 className="text-[2rem] font-bold">
        Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
      </h1>
      <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-lg font-bold">Paginas relacionadas ao curso</h1>
          </div>
          <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
            {menuCourse.map((item) => (
              <Card
                key={item.name}
                name={item.name}
                Link={item.Link}
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
                Link={item.Link}
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
                Link={item.Link}
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
                Link={item.Link}
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
                Link={item.Link}
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
                Link={item.Link}
                Info={item.info}
              />
            ))}
          </div>
        </div>
        <Separator />
      </div>
    </section>
  );
};

Dashboard.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Dashboard;
