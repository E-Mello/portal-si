/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from "~/components/ui/button";
import { EquivalenceUpdateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { SubmitHandler } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type EditEquivalenceFormProps = {
  equivalenceSubjects: z.infer<typeof EquivalenceUpdateSchema>;
  afterSubmit?: () => void;
};

export function EditEquivalenceForm({
  equivalenceSubjects,
  afterSubmit,
}: EditEquivalenceFormProps) {
  const utils = api.useContext();

  const { mutateAsync: update } = api.equivalence.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.equivalence.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      void utils.equivalence.getAll.invalidate();
      toast.error("Erro ao atualizar o conteúdo da página!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<z.infer<typeof EquivalenceUpdateSchema>>({
    resolver: zodResolver(EquivalenceUpdateSchema),
    defaultValues: equivalenceSubjects,
  });

  const updateEquivalenceSubject: SubmitHandler<
    z.infer<typeof EquivalenceUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(updateEquivalenceSubject)}>
      <section className="grid h-full grid-cols-1 items-center gap-2">
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="name">Nome da matéria</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            key={equivalenceSubjects.id}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="ch">Carga horária da matéria</Label>
          <Input
            id="ch"
            type="text"
            {...register("ch")}
            key={equivalenceSubjects.id}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="credits">Créditos da matéria</Label>
          <Input
            id="credits"
            type="text"
            {...register("credits")}
            key={equivalenceSubjects.id}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="prerequisites">Pré-requisitos da matéria</Label>
          <Input
            id="prerequisites"
            type="text"
            {...register("prerequisites")}
            key={equivalenceSubjects.id}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor="equivalenceSubjects">Equivalencia da matéria</Label>
          <Textarea
            id="equivalenceSubjects"
            {...register("equivalenceSubjects")}
            key={equivalenceSubjects.id}
          />
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <Button
            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <SyncLoader /> : "Salvar alterações"}
          </Button>
        </div>
      </section>
    </form>
  );
}
