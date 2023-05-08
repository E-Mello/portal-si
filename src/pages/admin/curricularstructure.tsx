import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Card from "~/components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/utils/cn";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { CardUpdateSchema } from "~/server/common/CardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Separator } from "~/components/ui/separator";

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

type Subject = {
  id: number;
  name: string;
  CH: number;
  Credits: number;
  Prerequisites: string;
  phaseId: number;
};

type Phase = {
  id: number;
  phaseId: number;
  subjects: Subject[];
};

const CurriculumSubjects: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.subjectsgrid.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const phases: Phase[] = [];

  pageData?.forEach((subject) => {
    const phase = phases.find((p) => p.phaseId === subject.phaseId);
    if (phase) {
      phase.subjects.push(subject);
    } else {
      phases.push({
        id: phases.length,
        phaseId: subject.phaseId,
        subjects: [subject],
      });
    }
  });

  // const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
  //   onSuccess: () => {
  //     toast.success("Card updated successfully");
  //   },
  //   onError: () => {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data "
  //     );
  //   },
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm<z.infer<typeof CardUpdateSchema>>({
  //   resolver: zodResolver(CardUpdateSchema),
  //   defaultValues: {
  //     name: cardNameSelected,
  //     info: cardInfoSelected,
  //   },
  // });

  // const changeCard: SubmitHandler<z.infer<typeof CardUpdateSchema>> = async (
  //   data
  // ) => {
  //   const res = await updateCard(data);
  //   console.log("res:", res);
  //   if (res) {
  //     toast.success("Card updated successfully");
  //     reset();
  //   } else {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data"
  //     );
  //   }
  // };

  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        <h1 className="pl-4 text-xl">Grade Curricular</h1>
        <Image width={500} height={500} alt="test" src={allSubjects} />
        <h1>
          Os quadro a seguir apresenta a sequência curricular do curso de
          Bacharelado em Sistemas de Informação, compreendendo oito fases
          (semestres) letivas.
        </h1>
      </div>
      <br />
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="flex flex-col items-center justify-center gap-4 pl-4"
          >
            <h1 className="pl-4 text-xl">{phase.phaseId} Semestre</h1>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Disciplina</th>
                  <th className="border px-4 py-2">Carga Horária</th>
                  <th className="border px-4 py-2">Créditos</th>
                  <th className="border px-4 py-2">Pré-requisitos</th>
                  <th className="border px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {phase.subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2">{subject.CH}</td>
                    <td className="border px-4 py-2">{subject.Credits}</td>
                    <td className="border px-4 py-2">
                      {subject.Prerequisites}
                    </td>
                    <td className="border px-4 py-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Editar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edicao de professores</DialogTitle>
                            <DialogDescription>
                              Edicao de professores
                            </DialogDescription>
                          </DialogHeader>
                          <section className="flex justify-between">
                            <div className="flex flex-col items-start justify-start gap-3">
                              <Label htmlFor="name">Nome</Label>
                              <Input
                                id="name"
                                type="text"
                                placeholder="Nome"
                                // {...register("name")}
                              />
                              {/* {errors.name && (
                                <span className="text-red-500">
                                  {errors.name.message}
                                </span>
                              )} */}
                              <Label htmlFor="type">Tipo</Label>
                              <Input
                                id="type"
                                type="text"
                                placeholder="Tipo"
                                // {...register("type")}
                              />
                              {/* {errors.type && (
                            <span className="text-red-500">
                              {errors.type.message}
                            </span>
                          )} */}
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="text"
                                placeholder="Email"
                                // {...register("email")}
                              />
                              {/* {errors.email && (
                            <span className="text-red-500">
                              {errors.email.message}
                            </span>
                          )} */}
                              <Label htmlFor="validity">Vigência</Label>
                              <Input
                                id="validity"
                                type="text"
                                placeholder="Vigência"
                                // {...register("validity")}
                              />
                              {/* {errors.validity && (
                            <span className="text-red-500">
                              {errors.validity.message}
                            </span>
                          )} */}
                            </div>
                          </section>
                          <DialogFooter>
                            <Button
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => setOpen(false)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => setOpen(false)}
                            >
                              Salvar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <br />
        <div className="flex flex-col items-center justify-center gap-4 pl-4">
          <h1>Resumo</h1>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  Carga horária de disciplinas
                </td>
                <td className="border px-4 py-2">2.820</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Estágio Supervisionado</td>
                <td className="border px-4 py-2">180</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Atividades Complementares</td>
                <td className="border px-4 py-2">150</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Carga Horária Total da Matriz
                </td>
                <td className="border px-4 py-2">3.150 horas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Separator />
    </section>
  );
};

CurriculumSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjects;
