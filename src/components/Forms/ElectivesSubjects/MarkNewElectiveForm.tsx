/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { ElectiveSubjectsUpdateSchema } from "~/server/common/Schemas";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Select from "~/components/myComponents/Select";
import { SyncLoader } from "react-spinners";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface MarkNewElectiveFormProps {
  pageData: z.infer<typeof ElectiveSubjectsUpdateSchema>[];
  afterSubmit?: () => void;
}
interface Option {
  value: string;
  label: string;
}

export function MarkNewElectiveForm({
  pageData,
  afterSubmit,
}: MarkNewElectiveFormProps) {
  const utils = api.useContext();
  const [idElective, setIdElective] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const { mutateAsync: update } = api.electivesubject.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.electivesubject.getAll.invalidate();
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ElectiveSubjectsUpdateSchema>>({
    resolver: zodResolver(ElectiveSubjectsUpdateSchema),
  });

  const updateElectiveSubject = async (
    data: z.infer<typeof ElectiveSubjectsUpdateSchema>
  ) => {
    // Update the data object with the current value of idElective
    data.id = idElective;

    console.log("data is:", data);

    const res = await update(data);
    console.log("res", res);
    afterSubmit && afterSubmit();
    reset();
  };

  useEffect(() => {
    // If there is no idElective, return early
    // ...existing code...
  }, [idElective]); // Add idElective as a dependency to the useEffect hook

  //const options = pageData.map((subject) => ({ value: subject.id, label: subject.name }));
  const options: Option[] = pageData
    ?.filter((data) => data.isElective === false)
    .map((subject) => ({
      value: subject.id,
      label: subject.name || "",
    }));

  return (
    <form onSubmit={handleSubmit(updateElectiveSubject)}>
      <section className="grid h-full grid-cols-1 items-center gap-2 ">
        <div className="flex columns-1 flex-col items-start gap-3">
          <Label htmlFor="name" className="text-right">
            Matéria
          </Label>
          <Select
            options={options}
            onSelect={(selectedValue) => {
              if (selectedValue) {
                setIdElective(selectedValue);
              }
            }}
            selectClassName="bg-zinc-800 text-white"
          />
          <Input type="hidden" value={idElective} {...register("id")} />
          <Input
            type={"checkbox"}
            checked={true}
            {...register("isElective")}
            className="none h-0 w-0 opacity-0"
          />
        </div>
        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
          <Button
            type="submit"
            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? <SyncLoader /> : "Incluir matéria"}
          </Button>
        </DialogFooter>
      </section>
    </form>
  );
}
