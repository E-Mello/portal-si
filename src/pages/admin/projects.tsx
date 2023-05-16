import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type z from "zod";
import SyncLoader from "react-spinners/SyncLoader";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ProjectsSchema } from "~/server/common/PageSchema";

const TeachingProjectsAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.projects.getAll.useQuery();
  const { mutateAsync: update } = api.projects.update.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ProjectsSchema>>({
    resolver: zodResolver(ProjectsSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof ProjectsSchema>> = async (
    data
  ) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

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
            <CardContent className=" space-y-4">
              <div className="space-y-1">
                <Label htmlFor="title">Titulo do projeto</Label>
                <Input id="title" placeholder="Titulo do projeto" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="resume">Resumo do projeto</Label>
                <Textarea id="resume" placeholder="Resumo do projeto" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="projectArea">Area do projeto</Label>
                <Input id="projectArea" placeholder="Area do projeto" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="teacherName">Nome do professor</Label>
                <Input id="teacherName" placeholder="Nome do professor" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="teacherEmail">Email do professor</Label>
                <Input id="teacherEmail" placeholder="Email do professor" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="teacherTel">Telefone do professor</Label>
                <Input id="teacherTel" placeholder="Telefone do professor" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="projectLink">Link do edital do projeto</Label>
                <Input
                  id="projectLink"
                  placeholder="Link do edital do projeto (opcional)"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Defina qual e o tipo desse projeto" />
                </SelectTrigger>
                <SelectContent className="flex bg-zinc-800 text-gray-300">
                  <SelectGroup>
                    <SelectItem value="1">Projeto de ensino</SelectItem>
                    <SelectItem value="2">Projeto de extensao</SelectItem>
                    <SelectItem value="3">Projeto de pesquisa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button className="bg-slate-200 text-zinc-900">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-32 bg-slate-200 text-zinc-900">
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
                          <section className="grid h-full grid-cols-1 items-center gap-2">
                            <Label htmlFor="title" className="">
                              Alterar o titulo do projeto
                            </Label>
                            <Input
                              id="title"
                              placeholder={project.title}
                              className="col-span-3"
                              {...register("title")}
                            />
                            <Label htmlFor="resume" className="">
                              Editar o resumo do projeto
                            </Label>
                            <Textarea
                              className="col-span-3 h-64"
                              defaultValue={project.resume}
                              value={project.resume}
                              contentEditable={true}
                              {...register("resume")}
                            />
                            <Label htmlFor="projectArea" className="">
                              Alterar a area do projeto
                            </Label>
                            <Input
                              id="projectArea"
                              placeholder={project.projectArea}
                              className="col-span-3"
                              {...register("projectArea")}
                            />
                            <Label htmlFor="teacherName" className="">
                              Alterar o nome do professor responsável
                            </Label>
                            <Input
                              id="teacherName"
                              placeholder={project.teacherName}
                              className="col-span-3"
                              {...register("teacherName")}
                            />
                            <Label htmlFor="teacherEmail" className="">
                              Alterar o email do professor responsável
                            </Label>
                            <Input
                              id="teacherEmail"
                              placeholder={project.teacherEmail}
                              className="col-span-3"
                              {...register("teacherEmail")}
                            />
                            <Label htmlFor="teacherTel" className="">
                              Alterar o telefone do professor responsável
                            </Label>
                            <Input
                              id="teacherTel"
                              placeholder={project.teacherTel}
                              className="col-span-3"
                              {...register("teacherTel")}
                            />
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="link" className="">
                                Alterar o link de acesso ao edital do projeto
                              </Label>
                              <Input
                                id="link"
                                placeholder={project?.link || ""}
                                className="col-span-3"
                                {...register("link")}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label>Alterar o tipo do projeto</Label>
                              <Select>
                                <SelectTrigger className="w-52">
                                  <SelectValue
                                    placeholder={
                                      project.typesOfProjectsId === 1
                                        ? "Projeto de ensino"
                                        : project.typesOfProjectsId === 2
                                        ? "Projeto de extensao"
                                        : "Projeto de pesquisa"
                                    }
                                    defaultValue={project.typesOfProjectsId}
                                  />
                                </SelectTrigger>
                                <SelectContent className="flex bg-zinc-800 text-gray-300">
                                  <SelectGroup>
                                    <SelectItem value="1">
                                      Projeto de ensino
                                    </SelectItem>
                                    <SelectItem value="2">
                                      Projeto de extensao
                                    </SelectItem>
                                    <SelectItem value="3">
                                      Projeto de pesquisa
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </section>
                          <SheetFooter className="flex w-full justify-start">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-slate-200 text-zinc-900"
                            >
                              {isSubmitting
                                ? "Salvando..."
                                : "Salvar Alterações"}
                            </Button>
                          </SheetFooter>
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
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-32 bg-slate-200 text-zinc-900">
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
                          <section className="grid h-full grid-cols-1 items-center gap-2">
                            <Label htmlFor="title" className="">
                              Alterar o titulo do projeto
                            </Label>
                            <Input
                              id="title"
                              placeholder={project.title}
                              className="col-span-3"
                              {...register("title")}
                            />
                            <Label htmlFor="resume" className="">
                              Editar o resumo do projeto
                            </Label>
                            <Textarea
                              className="col-span-3 h-64"
                              defaultValue={project.resume}
                              value={project.resume}
                              contentEditable={true}
                              {...register("resume")}
                            />
                            <Label htmlFor="projectArea" className="">
                              Alterar a area do projeto
                            </Label>
                            <Input
                              id="projectArea"
                              placeholder={project.projectArea}
                              className="col-span-3"
                              {...register("projectArea")}
                            />
                            <Label htmlFor="teacherName" className="">
                              Alterar o nome do professor responsável
                            </Label>
                            <Input
                              id="teacherName"
                              placeholder={project.teacherName}
                              className="col-span-3"
                              {...register("teacherName")}
                            />
                            <Label htmlFor="teacherEmail" className="">
                              Alterar o email do professor responsável
                            </Label>
                            <Input
                              id="teacherEmail"
                              placeholder={project.teacherEmail}
                              className="col-span-3"
                              {...register("teacherEmail")}
                            />
                            <Label htmlFor="teacherTel" className="">
                              Alterar o telefone do professor responsável
                            </Label>
                            <Input
                              id="teacherTel"
                              placeholder={project.teacherTel}
                              className="col-span-3"
                              {...register("teacherTel")}
                            />
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="link" className="">
                                Alterar o link de acesso ao edital do projeto
                              </Label>
                              <Input
                                id="link"
                                placeholder={project?.link || ""}
                                className="col-span-3"
                                {...register("link")}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label>Alterar o tipo do projeto</Label>
                              <Select>
                                <SelectTrigger className="w-52">
                                  <SelectValue
                                    placeholder={
                                      project.typesOfProjectsId === 1
                                        ? "Projeto de ensino"
                                        : project.typesOfProjectsId === 2
                                        ? "Projeto de extensao"
                                        : "Projeto de pesquisa"
                                    }
                                    defaultValue={project.typesOfProjectsId}
                                  />
                                </SelectTrigger>
                                <SelectContent className="flex bg-zinc-800 text-gray-300">
                                  <SelectGroup>
                                    <SelectItem value="1">
                                      Projeto de ensino
                                    </SelectItem>
                                    <SelectItem value="2">
                                      Projeto de extensao
                                    </SelectItem>
                                    <SelectItem value="3">
                                      Projeto de pesquisa
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </section>
                          <SheetFooter className="flex w-full justify-start">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-slate-200 text-zinc-900"
                            >
                              {isSubmitting
                                ? "Salvando..."
                                : "Salvar Alterações"}
                            </Button>
                          </SheetFooter>
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
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-32 bg-slate-200 text-zinc-900">
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
                          <section className="grid h-full grid-cols-1 items-center gap-2">
                            <Label htmlFor="title" className="">
                              Alterar o titulo do projeto
                            </Label>
                            <Input
                              id="title"
                              placeholder={project.title}
                              className="col-span-3"
                              {...register("title")}
                            />
                            <Label htmlFor="resume" className="">
                              Editar o resumo do projeto
                            </Label>
                            <Textarea
                              className="col-span-3 h-64"
                              defaultValue={project.resume}
                              value={project.resume}
                              contentEditable={true}
                              {...register("resume")}
                            />
                            <Label htmlFor="projectArea" className="">
                              Alterar a area do projeto
                            </Label>
                            <Input
                              id="projectArea"
                              placeholder={project.projectArea}
                              className="col-span-3"
                              {...register("projectArea")}
                            />
                            <Label htmlFor="teacherName" className="">
                              Alterar o nome do professor responsável
                            </Label>
                            <Input
                              id="teacherName"
                              placeholder={project.teacherName}
                              className="col-span-3"
                              {...register("teacherName")}
                            />
                            <Label htmlFor="teacherEmail" className="">
                              Alterar o email do professor responsável
                            </Label>
                            <Input
                              id="teacherEmail"
                              placeholder={project.teacherEmail}
                              className="col-span-3"
                              {...register("teacherEmail")}
                            />
                            <Label htmlFor="teacherTel" className="">
                              Alterar o telefone do professor responsável
                            </Label>
                            <Input
                              id="teacherTel"
                              placeholder={project.teacherTel}
                              className="col-span-3"
                              {...register("teacherTel")}
                            />
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="link" className="">
                                Alterar o link de acesso ao edital do projeto
                              </Label>
                              <Input
                                id="link"
                                placeholder={project?.link || ""}
                                className="col-span-3"
                                {...register("link")}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label>Alterar o tipo do projeto</Label>
                              <Select>
                                <SelectTrigger className="w-52">
                                  <SelectValue
                                    placeholder={
                                      project.typesOfProjectsId === 1
                                        ? "Projeto de ensino"
                                        : project.typesOfProjectsId === 2
                                        ? "Projeto de extensao"
                                        : "Projeto de pesquisa"
                                    }
                                    defaultValue={project.typesOfProjectsId}
                                  />
                                </SelectTrigger>
                                <SelectContent className="flex bg-zinc-800 text-gray-300">
                                  <SelectGroup>
                                    <SelectItem value="1">
                                      Projeto de ensino
                                    </SelectItem>
                                    <SelectItem value="2">
                                      Projeto de extensao
                                    </SelectItem>
                                    <SelectItem value="3">
                                      Projeto de pesquisa
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </section>
                          <SheetFooter className="flex w-full justify-start">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-slate-200 text-zinc-900"
                            >
                              {isSubmitting
                                ? "Salvando..."
                                : "Salvar Alterações"}
                            </Button>
                          </SheetFooter>
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

TeachingProjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingProjectsAdmin;
