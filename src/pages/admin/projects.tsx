import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EditProjectForm } from "~/components/Forms/ProjectsPages/EditProject";
import NewProject from "~/components/Forms/ProjectsPages/NewProject";
import { toast } from "react-toastify";

const ProjectsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openEditTeachingProject, setOpenEditTeachingProject] = useState(false);
  const [openEditExtensionProject, setOpenEditExtensionProject] =
    useState(false);
  const [openEditResearchProject, setOpenEditResearchProject] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.projects.getAll.useQuery();

  const { mutate } = api.projects.delete.useMutation({
    onSuccess: () => {
      void utils.projects.getAll.invalidate();
      toast.success("Projeto deletado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao deletar projeto !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteData() {
    try {
      mutate({ id: currentProjectId });
    } catch (error) {
      console.log("Error deleting provider:", error);
    }
  }

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
      <Tabs defaultValue="newProject" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="newProject">Criar novo projeto</TabsTrigger>
          <TabsTrigger value="teachingProject">Projetos de ensino</TabsTrigger>
          <TabsTrigger value="extensionProject">
            Projetos de extensao
          </TabsTrigger>
          <TabsTrigger value="researchProject">
            Projetos de pesquisa
          </TabsTrigger>
        </TabsList>
        <TabsContent value="newProject" className="flex">
          <Card>
            <CardHeader>
              <CardTitle>Aba dedicada a inclusao de projeto</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para adicionar um novo projeto
              </CardDescription>
            </CardHeader>
            <NewProject />
          </Card>
        </TabsContent>
        <TabsContent value="teachingProject">
          <div className="group flex w-full cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === "1") {
                return (
                  <div key={project.id} className="grid w-full gap-2">
                    <Link
                      target="_blank"
                      href={project.link || "/"}
                      className="group flex w-full cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800 "
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
                    <div className="flex w-full justify-start gap-2">
                      <Sheet
                        open={openEditTeachingProject}
                        onOpenChange={setOpenEditTeachingProject}
                      >
                        <SheetTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-32 text-white hover:bg-cyan-700"
                            onClick={() => {
                              setOpenEditTeachingProject(true);
                              setCurrentProjectId(project.id);
                            }}
                          >
                            Editar projeto
                          </Button>
                        </SheetTrigger>

                        <ScrollArea className="h-full ">
                          <SheetContent
                            position="right"
                            size={"default"}
                            className="flex h-full flex-col gap-4 bg-zinc-800 text-gray-300"
                          >
                            <SheetHeader>
                              <SheetTitle>Editar Conteudo</SheetTitle>
                              <SheetDescription>
                                Nessa folha lateral é possível estar editando o
                                conteúdo desta página
                              </SheetDescription>
                            </SheetHeader>
                            {pageData
                              .filter(
                                (project) => project.id === currentProjectId
                              )
                              .map((project) => (
                                <section
                                  key={currentProjectId}
                                  className="flex w-full"
                                >
                                  <EditProjectForm
                                    project={project}
                                    afterSubmit={() => {
                                      setOpenEditTeachingProject(false);
                                    }}
                                  />
                                </section>
                              ))}
                          </SheetContent>
                        </ScrollArea>
                      </Sheet>
                      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                        <AlertDialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setOpenAlert(true);
                              setCurrentProjectId(project.id);
                            }}
                            className="ml-2 hover:bg-red-600"
                            variant="outline"
                          >
                            Deletar Projeto
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-zinc-800 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Voce tem certeza que deseja desvincular essa
                              materia desse semestre?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Lembre que, para a materia aparecer novamente
                              nesse semestre e necessario vincular de novo.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => {
                                setOpenAlert(false);
                              }}
                              className="hover:bg-red-600"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteData}
                              className="hover:bg-cyan-700"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos de ensino cadastrados no momento ou houve um
                  problema com o servidor. Cadastre um novo projeto de ensino na
                  primeira aba caso queira visualizar algo aqui e não tenha sido
                  problema do servidor
                </h1>;
              }
            })}
          </div>
        </TabsContent>
        <TabsContent value="extensionProject">
          <div className="group flex w-full cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === "2") {
                return (
                  <div key={project.id} className="grid w-full gap-2">
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
                    <Sheet
                      open={openEditExtensionProject}
                      onOpenChange={setOpenEditExtensionProject}
                    >
                      <SheetTrigger asChild>
                        <Button
                          className="w-32 bg-slate-200 text-zinc-900"
                          onClick={() => {
                            setOpenEditExtensionProject(true);
                            setCurrentProjectId(project.id);
                          }}
                        >
                          Editar projeto
                        </Button>
                      </SheetTrigger>

                      <ScrollArea className="h-full ">
                        <SheetContent
                          position="right"
                          size={"default"}
                          className="flex h-full flex-col gap-4 bg-zinc-800 text-gray-300"
                        >
                          <SheetHeader>
                            <SheetTitle>Editar Conteudo</SheetTitle>
                            <SheetDescription>
                              Nessa folha lateral é possível estar editando o
                              conteúdo desta página
                            </SheetDescription>
                          </SheetHeader>
                          {pageData
                            .filter(
                              (project) => project.id === currentProjectId
                            )
                            .map((project) => (
                              <section
                                key={currentProjectId}
                                className="flex w-full"
                              >
                                <EditProjectForm
                                  project={project}
                                  afterSubmit={() => {
                                    setOpenEditExtensionProject(false);
                                  }}
                                />
                              </section>
                            ))}
                        </SheetContent>
                      </ScrollArea>
                    </Sheet>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos de ensino cadastrados no momento ou houve um
                  problema com o servidor. Cadastre um novo projeto de ensino na
                  primeira aba caso queira visualizar algo aqui e não tenha sido
                  problema do servidor
                </h1>;
              }
            })}
          </div>
        </TabsContent>
        <TabsContent value="researchProject">
          <div className="group flex w-full cursor-pointer flex-col items-start justify-center gap-4 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out">
            {pageData.map((project) => {
              if (project.typesOfProjectsId === "3") {
                return (
                  <div key={project.id} className="grid w-full gap-2">
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
                    <Sheet
                      open={openEditResearchProject}
                      onOpenChange={setOpenEditResearchProject}
                    >
                      <SheetTrigger asChild>
                        <Button
                          className="w-32 bg-slate-200 text-zinc-900"
                          onClick={() => {
                            setOpenEditResearchProject(true);
                            setCurrentProjectId(project.id);
                          }}
                        >
                          Editar projeto
                        </Button>
                      </SheetTrigger>

                      <ScrollArea className="h-full ">
                        <SheetContent
                          position="right"
                          size={"default"}
                          className="flex h-full flex-col gap-4 bg-zinc-800 text-gray-300"
                        >
                          <SheetHeader>
                            <SheetTitle>Editar Conteudo</SheetTitle>
                            <SheetDescription>
                              Nessa folha lateral é possível estar editando o
                              conteúdo desta página
                            </SheetDescription>
                          </SheetHeader>
                          {pageData
                            .filter(
                              (project) => project.id === currentProjectId
                            )
                            .map((project) => (
                              <section
                                key={currentProjectId}
                                className="flex w-full"
                              >
                                <EditProjectForm
                                  project={project}
                                  afterSubmit={() => {
                                    setOpenEditResearchProject(false);
                                  }}
                                />
                              </section>
                            ))}
                        </SheetContent>
                      </ScrollArea>
                    </Sheet>
                  </div>
                );
              } else {
                <h1>
                  Não há projetos de ensino cadastrados no momento ou houve um
                  problema com o servidor. Cadastre um novo projeto de ensino na
                  primeira aba caso queira visualizar algo aqui e não tenha sido
                  problema do servidor
                </h1>;
              }
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

ProjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ProjectsAdmin;
