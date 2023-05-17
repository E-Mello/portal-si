import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { type ReactElement } from "react";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Textarea } from "~/components/ui/textarea";

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
      className={`flex h-full w-full flex-col items-center justify-between pl-4 pr-4 pt-4 text-white `}
    >
      <section className="flex h-full w-full justify-start ">
        <div className="items-centergap-5 flex w-full justify-center pl-2">
          <h1 className="flex  text-2xl font-bold">Projetos do Curso</h1>
        </div>
      </section>

      <section className="flex h-full w-full flex-col items-start pt-6"></section>
      <Tabs defaultValue="teachingProject" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="teachingProject">Projetos de ensino</TabsTrigger>
          <TabsTrigger value="extensionProject">
            Projetos de extensao
          </TabsTrigger>
          <TabsTrigger value="researchProject">
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
