/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { EquivalenceUpdateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Select from "~/components/myComponents/Select";
import { SyncLoader } from "react-spinners";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface MarkNewEquivalenceFormProps {
  equivalenceSubjects: z.infer<typeof EquivalenceUpdateSchema>[];
  afterSubmit?: () => void;
}
interface Option {
  value: string;
  label: string;
}

export function MarkNewEquivalenceForm({
  equivalenceSubjects,
  afterSubmit,
}: MarkNewEquivalenceFormProps) {
  const utils = api.useContext();
  const [idEquivalence, setIdEquivalence] = useState("");

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
  });

  const handleUpdateEquivalence: SubmitHandler<
    z.infer<typeof EquivalenceUpdateSchema>
  > = async (data) => {
    data.id = idEquivalence;
    console.log("data is", data);
    await update(data);
    afterSubmit && afterSubmit();
    reset();
  };

  useEffect(() => {
    // If there is no idElective, return early
    // ...existing code...
  }, [idEquivalence]); // Add idElective as a dependency to the useEffect hook

  const options: Option[] = equivalenceSubjects
    ?.filter((data) => data.equivalenceSubjects === "")
    .map((subject) => ({
      value: subject.id,
      label: subject.name || "",
    }));

  return (
    <form onSubmit={handleSubmit(handleUpdateEquivalence)}>
      <section className="grid h-full grid-cols-1 items-center gap-2 ">
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="name" className="text-right">
            Matéria
          </Label>
          <Select
            options={options}
            onSelect={(selectedValue) => {
              if (selectedValue) {
                setIdEquivalence(selectedValue);
                console.log("selectedValue", selectedValue);
              }
            }}
            selectClassName="bg-zinc-800 text-white"
          />
          <Input
            type="hidden"
            defaultValue={idEquivalence}
            {...register("id")}
          />
          <Textarea {...register("equivalenceSubjects")} />
        </div>
        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
          <Button
            type="submit"
            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
            disabled={isSubmitting}
            onClick={() => {
              console.log("idEquivalence", idEquivalence);
            }}
          >
            {isSubmitting ? <SyncLoader /> : "Editar equivalencia"}
          </Button>
        </DialogFooter>
      </section>
    </form>
  );
}
