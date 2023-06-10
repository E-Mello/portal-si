/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { ProjectsUpdateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import SyncLoader from "react-spinners/SyncLoader";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import Select from "~/components/myComponents/Select";
import { SheetFooter } from "~/components/ui/sheet";
import { useEffect, useState } from "react";

type EditProjectFormProps = {
  project: z.infer<typeof ProjectsUpdateSchema>;
  afterSubmit?: () => void;
};

export function EditProjectForm({
  project,
  afterSubmit,
}: EditProjectFormProps) {
  const utils = api.useContext();
  const [typesOfProjectsId, setTypesOfProjectsId] = useState("");

  const { mutateAsync: update } = api.projects.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.projects.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      toast.error("Erro ao atualizar o conteúdo da página", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof ProjectsUpdateSchema>>({
    resolver: zodResolver(ProjectsUpdateSchema),
    defaultValues: project,
  });
  const updateTeachingProject: SubmitHandler<
    z.infer<typeof ProjectsUpdateSchema>
  > = async (data) => {
    data.typesOfProjectsId = typesOfProjectsId;
    await update(data);
    afterSubmit && afterSubmit();
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
    <form
      onSubmit={handleSubmit(updateTeachingProject)}
      className="flex w-full flex-col gap-2"
    >
      <section className="flex h-full w-full flex-col gap-2">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="title" className="">
            Alterar o titulo do projeto
          </Label>

          <Input
            id="title"
            className="col-span-3"
            {...register("title")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="resume" className="">
            Editar o resumo do projeto
          </Label>
          <Textarea
            className="col-span-3 h-64"
            {...register("resume")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="projectArea" className="">
            Alterar a area do projeto
          </Label>
          <Input
            id="projectArea"
            className="col-span-3"
            {...register("projectArea")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="teacherName" className="">
            Alterar o nome do professor responsável
          </Label>
          <Input
            id="teacherName"
            className="col-span-3"
            {...register("teacherName")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="teacherEmail" className="">
            Alterar o email do professor responsável
          </Label>
          <Input
            id="teacherEmail"
            className="col-span-3"
            {...register("teacherEmail")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="teacherTel" className="">
            Alterar o telefone do professor responsável
          </Label>
          <Input
            id="teacherTel"
            className="col-span-3"
            {...register("teacherTel")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="link" className="">
            Alterar o link de acesso ao edital do projeto
          </Label>
          <Input
            id="link"
            className="col-span-3"
            {...register("link")}
            key={project.id}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label>Alterar o tipo do projeto</Label>
          <Select
            options={options}
            onSelect={(selectedValue) => {
              if (selectedValue) {
                setTypesOfProjectsId(selectedValue);
              }
            }}
            defaultValue={project.typesOfProjectsId}
            selectClassName="bg-zinc-800 text-white w-56"
          />
        </div>
      </section>
      <SheetFooter className="flex w-full justify-start">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-200 text-zinc-900"
        >
          {isSubmitting ? <SyncLoader /> : "Salvar Alterações"}
        </Button>
      </SheetFooter>
    </form>
  );
}

export default EditProjectForm;
