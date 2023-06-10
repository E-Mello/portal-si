/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { CurriculumSubjectUpdateSchema } from "~/server/common/Schemas";
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

type EditSubjectFormProps = {
  subject: z.infer<typeof CurriculumSubjectUpdateSchema>;
  afterSubmit?: () => void;
};

export function EditSubject({ subject, afterSubmit }: EditSubjectFormProps) {
  const utils = api.useContext();

  const { mutateAsync: update } = api.curriculumSubjects.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.curriculumSubjects.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      void utils.curriculumSubjects.getAll.invalidate();
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
    formState: { isSubmitting },
  } = useForm<z.infer<typeof CurriculumSubjectUpdateSchema>>({
    resolver: zodResolver(CurriculumSubjectUpdateSchema),
    defaultValues: subject,
  });
  const updateSubject: SubmitHandler<
    z.infer<typeof CurriculumSubjectUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(updateSubject)} className="flex w-full">
      <section className="flex h-full w-full grid-cols-1 flex-col items-center gap-2">
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="name" className="text-right">
            Nome da Matéria
          </Label>
          <Input id="name" type="text" {...register("name")} key={subject.id} />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="ch">Carga Horária da Matéria</Label>
          <Input id="ch" type="text" {...register("ch")} key={subject.id} />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="credits">Créditos da Matéria</Label>
          <Input
            id="credits"
            type="text"
            {...register("credits")}
            key={subject.id}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="prerequisites">Pré-requisitos da Matéria</Label>
          <Input
            id="prerequisites"
            type="text"
            {...register("prerequisites")}
            key={subject.id}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="isElective">Matéria eletiva?</Label>
          <SwitchComponent
            defaultValue={subject.isElective}
            onChange={(value) => {
              // Update the form value whenever the switch value changes
              setValue("isElective", value);
            }}
            key={subject.id}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="equivalenceSubjects">Matérias equivalentes</Label>
          <Textarea {...register("equivalenceSubjects")} key={subject.id} />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <Label htmlFor="phaseId">Fase da Matéria</Label>
          <Input
            id="phaseId"
            type="text"
            {...register("phaseId")}
            key={subject.id}
          />
        </div>
        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
          <Button
            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? <SyncLoader /> : "Atualizar Matéria"}
          </Button>
        </DialogFooter>
      </section>
    </form>
  );
}

export default EditSubject;
