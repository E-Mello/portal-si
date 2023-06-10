/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { ProjectsCreateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import SyncLoader from "react-spinners/SyncLoader";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import { CardContent, CardFooter } from "~/components/ui/card";
import Select from "~/components/myComponents/Select";
import { useEffect, useState } from "react";

export function NewProject() {
  const utils = api.useContext();
  const [typesOfProjectsId, setTypesOfProjectsId] = useState("");

  const { mutateAsync: create } = api.projects.create.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.projects.getAll.invalidate();
      toast.success("Projeto criado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      toast.error("Erro ao criar projeto", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof ProjectsCreateSchema>>({
    resolver: zodResolver(ProjectsCreateSchema),
  });
  const createProject: SubmitHandler<
    z.infer<typeof ProjectsCreateSchema>
  > = async (data) => {
    data.typesOfProjectsId = typesOfProjectsId;
    if (data.typesOfProjectsId === "") {
      toast.error("Selecione um tipo de projeto", {
        autoClose: 2000,
      });
      return;
    }
    await create(data);
    reset();
  };

  useEffect(() => {
    // If there is no typesOfProjectsId, return early
    // ...existing code...
  }, [typesOfProjectsId]); // Add typesOfProjectsId as a dependency to the useEffect hook

  const options = [
    { value: "1", label: "Projeto de Ensino" },
    { value: "2", label: "Projeto de Extensao" },
    { value: "3", label: "Projeto de Pesquisa" },
  ];

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <CardContent className=" space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Titulo do projeto</Label>
          <Input
            id="title"
            placeholder="Titulo do projeto"
            {...register("title")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="resume">Resumo do projeto</Label>
          <Textarea
            id="resume"
            placeholder="Resumo do projeto"
            {...register("resume")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="projectArea">Area do projeto</Label>
          <Input
            id="projectArea"
            placeholder="Area do projeto"
            {...register("projectArea")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="teacherName">Nome do professor</Label>
          <Input
            id="teacherName"
            placeholder="Nome do professor"
            {...register("teacherName")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="teacherEmail">Email do professor</Label>
          <Input
            id="teacherEmail"
            placeholder="Email do professor"
            {...register("teacherEmail")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="teacherTel">Telefone do professor</Label>
          <Input
            id="teacherTel"
            placeholder="Telefone do professor"
            {...register("teacherTel")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="projectLink">Link do edital do projeto</Label>
          <Input
            id="projectLink"
            placeholder="Link do edital do projeto (opcional)"
            {...register("link")}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Select
          options={options}
          onSelect={(selectedValue) => {
            if (selectedValue) {
              setTypesOfProjectsId(selectedValue);
              console.log(
                "valor do typesOfProjectsId ao seleciona-lo:",
                selectedValue
              );
            }
          }}
          selectClassName="bg-zinc-800 text-white w-56"
        />
        <Input
          className="opacity-0 "
          value={typesOfProjectsId}
          {...register("typesOfProjectsId")}
        />
        <Button
          type="submit"
          className="w-full bg-slate-200 text-zinc-900"
          onClick={() => {
            console.log(
              "valor do typesOfProjectsId antes do submit:",
              typesOfProjectsId
            );
          }}
        >
          {isSubmitting ? <SyncLoader /> : "Criar projeto"}
        </Button>
      </CardFooter>
    </form>
  );
}

export default NewProject;
