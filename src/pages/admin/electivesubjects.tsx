import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import { HiOutlinePlus } from "react-icons/hi";
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
import { ElectiveSubjectsSchema } from "~/server/common/PageSchema";
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

const ElectiveSubjectsAdmin: NextPageWithLayout = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.electivesubject.getAll.useQuery();

  const { mutateAsync: update } = api.electivesubject.update.useMutation({
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
  } = useForm<z.infer<typeof ElectiveSubjectsSchema>>({
    resolver: zodResolver(ElectiveSubjectsSchema),
  });
  const updateSubject: SubmitHandler<
    z.infer<typeof ElectiveSubjectsSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutateAsync: create } = api.electivesubject.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const { mutate } = api.electivesubject.delete.useMutation({
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

  return (
    <section className="flex w-full flex-col items-start gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="items-start text-3xl font-bold text-white">
        Rol de Disciplinas Eletivas
      </h1>
      <p className="text-white">
        O quadro a seguir apresenta o rol de disciplinas eletivas do curso, no
        qual poderão ser definidas nas disciplinas eletivas obrigatórias de I a
        VII. A oferta de disciplinas, de acordo com as possibilidades constantes
        no rol de disciplinas, será definida em conjunto entre o Colegiado de
        Curso e o Núcleo Docente Estruturante (NDE).
      </p>
      <section className="flex w-2/3 flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">Nome</TableHead>
              <TableHead className="border border-gray-300 p-2">CH</TableHead>
              <TableHead className="border border-gray-300 p-2">
                Créditos
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Pré-requisitos
              </TableHead>
              <TableHead className="w-40 border border-gray-300 p-2 text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="border border-gray-300 p-2">
                  {data.name}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.ch}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.credits}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.prerequisites}
                </TableCell>
                <TableCell className=" w-52 justify-center gap-1 space-x-2 border border-gray-300 px-4 py-2 text-center">
                  <Dialog
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenEditDialog(true);
                          // reset(data);
                        }}
                        variant="outline"
                        className="hover:bg-cyan-800"
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                      <DialogHeader className="flex items-center ">
                        <DialogTitle>Edicao de professores</DialogTitle>
                        <DialogDescription>
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
                      {/* <form onSubmit={handleSubmit(updateMember)} className=""> */}
                      <form className="">
                        <section className="grid h-full grid-cols-1 items-center gap-2">
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label htmlFor="name">Nome da matéria</Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder={data.name}
                              {...register("name")}
                            />
                          </div>
                          <div>
                            <Label htmlFor="ch">Carga horária da matéria</Label>
                            <Input
                              id="ch"
                              type="text"
                              // placeholder={data.ch}
                              {...register("ch")}
                            />
                          </div>
                          <div>
                            <Label htmlFor="credits">Créditos da matéria</Label>
                            <Input
                              id="credits"
                              type="text"
                              // placeholder={data.credits}
                              {...register("credits")}
                            />
                          </div>
                          <div>
                            <Label htmlFor="prerequisites">
                              Pré-requisitos da matéria
                            </Label>
                            <Input
                              id="prerequisites"
                              type="text"
                              placeholder={data.prerequisites}
                              {...register("prerequisites")}
                            />
                          </div>
                          <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                            <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                              {isSubmitting ? <SyncLoader /> : "Salvar"}
                            </Button>
                          </DialogFooter>
                        </section>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenAlert(true);
                        }}
                        className=" hover:bg-red-500"
                        variant="outline"
                      >
                        Deletar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-800 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Voce tem certeza que deseja desvincular essa materia
                          desse semestre?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Lembre que, para a materia aparecer novamente nesse
                          semestre e necessario vincular de novo.
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
              <span className="ml-2">Adicionar matéria eletiva</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Cadastro de membro do colegiado</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input id="name" type="text" {...register("name")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="ch">Carga horária da matéria</Label>
                  <Input id="ch" type="text" {...register("ch")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="credits">Créditos da matéria</Label>
                  <Input id="credits" type="text" {...register("credits")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="prerequisites">
                    Pré-requisitos da matéria
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
      </section>
    </section>
  );
};

ElectiveSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjectsAdmin;
