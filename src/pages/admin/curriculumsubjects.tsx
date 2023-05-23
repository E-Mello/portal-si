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

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Separator } from "~/components/ui/separator";
import { CurriculumSubjectsSchema } from "~/server/common/PageSchema";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

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

const CurriculumSubjectsAdmin: NextPageWithLayout = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.curriculumSubjects.getAll.useQuery();

  const { mutateAsync: update } = api.curriculumSubjects.update.useMutation({
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
  } = useForm<z.infer<typeof CurriculumSubjectsSchema>>({
    resolver: zodResolver(CurriculumSubjectsSchema),
  });
  const updateData: SubmitHandler<
    z.infer<typeof CurriculumSubjectsSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutate } = api.collegiate.delete.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });

  // function handleDeleteData() {
  //   try {
  //     mutate({ id: data.id });
  //   } catch (error) {
  //     console.log("Error deleting provider:", error);
  //   }
  // }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const phaseIds = [
    ...new Set(
      pageData?.map((subject: { phaseId: any }) => subject.phaseId as number)
    ),
  ];

  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Grade Curricular</h1>
      <Image width={500} height={500} alt="test" src={allSubjects} />
      <span>
        Os quadro a seguir apresenta a sequência curricular do curso de
        Bacharelado em Sistemas de Informação, compreendendo oito fases
        (semestres) letivas.
      </span>
      <section className="flex flex-col items-center justify-center gap-4 pl-4">
        <h1>Resumo</h1>
        <Table className="table-auto">
          <TableBody>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga horária de disciplinas
              </TableCell>
              <TableCell className="border px-4 py-2">2.820</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Estágio Supervisionado
              </TableCell>
              <TableCell className="border px-4 py-2">180</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Atividades Complementares
              </TableCell>
              <TableCell className="border px-4 py-2">150</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga Horária Total da Matriz
              </TableCell>
              <TableCell className="border px-4 py-2">3.150 horas</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <br />
      <section className="grid w-full grid-cols-2 gap-4 pl-4 pr-10">
        {phaseIds.map((phaseId) => (
          <div
            key={phaseId}
            className="flex flex-col justify-center gap-4 pb-2 pl-4 pt-2"
          >
            <legend className="flex justify-center text-xl">
              {phaseId} Semestre
            </legend>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="border border-gray-300 p-2">
                    Disciplina
                  </TableHead>
                  <TableHead className="border border-gray-300 p-2">
                    Carga Horária
                  </TableHead>
                  <TableHead className="border border-gray-300 p-2">
                    Créditos
                  </TableHead>
                  <TableHead className=" border border-gray-300 p-2">
                    Pré-requisitos
                  </TableHead>
                  <TableHead className="w-40 border border-gray-300 p-2">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {pageData
                  ?.filter((subject) => subject.phaseId === phaseId)
                  .map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="border px-4 py-2">
                        {subject.name}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.ch}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.credits}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.prerequisites}
                      </TableCell>
                      <TableCell className=" space-y-2 border p-1 px-4 text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="hover:bg-cyan-800"
                            >
                              Editar vinculo
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 p-4 text-white shadow-2xl  shadow-zinc-700">
                            <DialogHeader className="flex items-center ">
                              <DialogTitle>Edicao de professores</DialogTitle>
                              <DialogDescription>
                                Edicao de professores
                              </DialogDescription>
                            </DialogHeader>
                            <form
                              // onSubmit={handleSubmit(updateData)}
                              className=""
                            >
                              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                                <div className="flex flex-col items-start justify-start gap-3">
                                  <Label htmlFor="name">Nome da Matéria</Label>
                                  <Input
                                    id="name"
                                    type="text"
                                    placeholder={subject.name}
                                    {...register("name")}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="type">Carga Horária</Label>
                                  <Input
                                    id="type"
                                    type="text"
                                    placeholder={"Fazer dps"}
                                    {...register("ch")}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">Créditos</Label>
                                  <Input
                                    id="email"
                                    type="text"
                                    placeholder={"Fazer dps"}
                                    {...register("credits")}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="validity">
                                    Pré-requisitos
                                  </Label>
                                  <Input
                                    id="validity"
                                    type="text"
                                    // placeholder={
                                    //   subject.prerequisites ||
                                    //   "Erro ao buscar a informacao do banco de dados"
                                    // }
                                    {...register("prerequisites")}
                                  />
                                </div>
                              </section>
                              <DialogFooter>
                                <Button className="bg-green-500 hover:bg-green-600">
                                  Salvar
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog
                          open={openAlert}
                          onOpenChange={setOpenAlert}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setOpenAlert(true);
                              }}
                              className=" w-full hover:bg-red-500"
                              variant="outline"
                            >
                              Remover vinculo
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-zinc-800 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Voce tem certeza que deseja desvincular essa
                                materia desse semestre?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Lembre que, para a materia aparecer novamente
                                nesse semestre e necessario vincular de novo.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => {
                                  setOpenAlert(false);
                                }}
                                className="hover:bg-red-600"
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                // onClick={handleDeleteData}
                                className="hover:bg-cyan-700"
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double ">
                  <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                  <p className="ml-2">Adicionar nova matéria</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 p-4 text-white shadow-2xl  shadow-zinc-700">
                <DialogHeader className="flex items-center justify-center">
                  <DialogTitle>
                    Cadastrar uma nova matéria para esse semestre
                  </DialogTitle>
                  <DialogDescription className="">
                    Preencher todos os campos{" "}
                    {"(Os campos são em formato string)"}
                  </DialogDescription>
                </DialogHeader>
                <form>
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
                      <Input
                        id="credits"
                        type="text"
                        {...register("credits")}
                      />
                      <div className="flex columns-1 flex-col items-start gap-3"></div>
                      <Label htmlFor="prerequisites">
                        Pré-requisitos da Matéria
                      </Label>
                      <Input
                        id="prerequisites"
                        type="text"
                        {...register("prerequisites")}
                      />
                    </div>
                    <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                      <Button
                        className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        Cadastrar
                      </Button>
                    </DialogFooter>
                  </section>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </section>
    </section>
  );
};

CurriculumSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjectsAdmin;
