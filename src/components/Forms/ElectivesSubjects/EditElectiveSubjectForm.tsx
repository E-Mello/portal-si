/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from "~/components/ui/button";
import { ElectiveSubjectsUpdateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { SubmitHandler } from "react-hook-form";
import Switch from "~/components/Switch";
import { SyncLoader } from "react-spinners";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type EditElectiveSubjectFormProps = {
  electivesSubjects: z.infer<typeof ElectiveSubjectsUpdateSchema>;
  onCancel: () => void;
  afterSubmit?: () => void;
};

export function EditElectiveSubjectForm({
  electivesSubjects,
  onCancel,
  afterSubmit,
}: EditElectiveSubjectFormProps) {
  const utils = api.useContext();

  const { mutateAsync: update } = api.electivesubject.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.electivesubject.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ElectiveSubjectsUpdateSchema>>({
    resolver: zodResolver(ElectiveSubjectsUpdateSchema),
    defaultValues: electivesSubjects,
  });

  const updateElectiveSubject: SubmitHandler<
    z.infer<typeof ElectiveSubjectsUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(updateElectiveSubject)}>
      <section className="grid h-full grid-cols-1 items-center gap-2">
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="name">Nome da matéria</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            key={electivesSubjects.id}
          />
        </div>
        <div>
          <Label htmlFor="ch">Carga horária da matéria</Label>
          <Input
            id="ch"
            type="text"
            {...register("ch")}
            key={electivesSubjects.id}
          />
        </div>
        <div>
          <Label htmlFor="credits">Créditos da matéria</Label>
          <Input
            id="credits"
            type="text"
            {...register("credits")}
            key={electivesSubjects.id}
          />
        </div>
        <div>
          <Label htmlFor="prerequisites">Pré-requisitos da matéria</Label>
          <Input
            id="prerequisites"
            type="text"
            {...register("prerequisites")}
            key={electivesSubjects.id}
          />
        </div>
        <div>
          <Label htmlFor="isElective">Pré-requisitos da matéria</Label>
          <Switch key={electivesSubjects.id} {...register("isElective")} />
        </div>
        <div className="flex columns-1 flex-col items-start gap-4 pt-2">
          <Button
            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <SyncLoader /> : "Salvar"}
          </Button>
        </div>
      </section>
    </form>
  );
}
