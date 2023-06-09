/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { CurriculumSubjectCreateSchema } from "~/server/common/Schemas";
import { DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import SyncLoader from "react-spinners/SyncLoader";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SwitchComponent from "~/components/myComponents/Switch";
import { Textarea } from "~/components/ui/textarea";

export function NewSubject() {
  const utils = api.useContext();

  const { mutateAsync: create } = api.curriculumSubjects.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      toast.error("Erro ao atualizar o conteúdo da página!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof CurriculumSubjectCreateSchema>>({
    resolver: zodResolver(CurriculumSubjectCreateSchema),
  });
  const createSubject: SubmitHandler<
    z.infer<typeof CurriculumSubjectCreateSchema>
  > = async (data) => {
    const res = await create(data);
    console.log("res", res);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(createSubject)}>
      <section className="grid h-full grid-cols-1 items-center gap-2 ">
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="name" className="text-right">
            Nome da Matéria
          </Label>
          <Input id="name" type="text" {...register("name")} />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="ch">Carga Horária da Matéria</Label>
          <Input id="ch" type="text" {...register("ch")} />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="credits">Créditos da Matéria</Label>
          <Input id="credits" type="text" {...register("credits")} />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="prerequisites">Pré-requisitos da Matéria</Label>
          <Input
            id="prerequisites"
            type="text"
            {...register("prerequisites")}
          />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="isElective">Matéria eletiva?</Label>
          <SwitchComponent
            defaultValue={true}
            onChange={(value) => {
              // Update the form value whenever the switch value changes
              setValue("isElective", value);
            }}
          />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="equivalenceSubjects">Matérias equivalentes</Label>
          <Textarea {...register("equivalenceSubjects")} />
        </div>
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="phaseId">Fase da Matéria</Label>
          <Input id="phaseId" type="text" {...register("phaseId")} />
        </div>
        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
          <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
            {isSubmitting ? <SyncLoader /> : "Cadastrar Matéria"}
          </Button>
        </DialogFooter>
      </section>
    </form>
  );
}

export default NewSubject;
