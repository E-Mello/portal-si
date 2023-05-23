import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { type ReactElement } from "react";
import { api } from "~/utils/api";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Projects: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.projects.getAll.useQuery();
  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section
      className={`flex h-[100vh] w-full flex-col items-center justify-between pl-4 pr-4 pt-4 text-white max-sm:h-full `}
    >
      <h1 className="flex text-2xl font-bold">Projetos do Curso</h1>

      <Tabs
        defaultValue="teachingProject"
        className="flex h-full w-full flex-col gap-2 pt-5 max-sm:gap-10  max-sm:pt-10"
      >
        <TabsList className="grid w-full grid-cols-3 gap-2 max-sm:flex max-sm:flex-col max-sm:pb-5 max-sm:pt-5">
          <TabsTrigger
            value="teachingProject"
            className="rounded-xl bg-cyan-800"
          >
            Projetos de ensino
          </TabsTrigger>
          <TabsTrigger
            value="extensionProject"
            className="rounded-xl bg-emerald-800"
          >
            Projetos de extensao
          </TabsTrigger>
          <TabsTrigger
            value="researchProject"
            className="rounded-xl bg-orange-900"
          >
            Projetos de pesquisa
          </TabsTrigger>
        </TabsList>
        <TabsContent value="teachingProject">
          <div className=" group flex cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === 1) {
                return (
                  <div key={project.id} className="grid gap-2">
                    <Link
                      target="_blank"
                      href={project.link || "/"}
                      className="group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800"
                    >
                      <span className={`text-lg font-bold`}>
                        {project.title}
                      </span>
                      <span className={`flex text-start text-sm`}>
                        Resumo do projeto: {project.resume}
                      </span>
                      <span className={`text-start text-sm`}>
                        Area do projeto: {project.projectArea}
                      </span>
                      <span className={`text-start text-sm`}>
                        Professor executante: {project.teacherName}
                      </span>
                      <span className={`text-start text-sm`}>
                        Email do professor: {project.teacherEmail}
                      </span>
                      <span className={`text-start text-sm`}>
                        Telefone de contato: {project.teacherTel}
                      </span>
                    </Link>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos cadastrados no momento ou houve um problema
                  com o servidor
                </h1>;
              }
            })}
          </div>
        </TabsContent>
        <TabsContent value="extensionProject">
          <div className=" group flex cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === 2) {
                return (
                  <div key={project.id} className="grid gap-2">
                    <Link
                      target="_blank"
                      href={project.link || "/"}
                      className="group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800"
                    >
                      <span className={`text-lg font-bold`}>
                        {project.title}
                      </span>
                      <span className={`flex text-start text-sm`}>
                        Resumo do projeto: {project.resume}
                      </span>
                      <span className={`text-start text-sm`}>
                        Area do projeto: {project.projectArea}
                      </span>
                      <span className={`text-start text-sm`}>
                        Professor executante: {project.teacherName}
                      </span>
                      <span className={`text-start text-sm`}>
                        Email do professor: {project.teacherEmail}
                      </span>
                      <span className={`text-start text-sm`}>
                        Telefone de contato: {project.teacherTel}
                      </span>
                    </Link>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos cadastrados no momento ou houve um problema
                  com o servidor.
                </h1>;
              }
            })}
          </div>
        </TabsContent>
        <TabsContent value="researchProject">
          <div className=" group flex cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === 3) {
                return (
                  <div key={project.id} className="grid gap-2">
                    <Link
                      target="_blank"
                      href={project.link || "/"}
                      className="group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800"
                    >
                      <span className={`text-lg font-bold`}>
                        {project.title}
                      </span>
                      <span className={`flex text-start text-sm`}>
                        Resumo do projeto: {project.resume}
                      </span>
                      <span className={`text-start text-sm`}>
                        Area do projeto: {project.projectArea}
                      </span>
                      <span className={`text-start text-sm`}>
                        Professor executante: {project.teacherName}
                      </span>
                      <span className={`text-start text-sm`}>
                        Email do professor: {project.teacherEmail}
                      </span>
                      <span className={`text-start text-sm`}>
                        Telefone de contato: {project.teacherTel}
                      </span>
                    </Link>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos cadastrados no momento ou houve um problema
                  com o servidor.
                </h1>;
              }
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

Projects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Projects;
