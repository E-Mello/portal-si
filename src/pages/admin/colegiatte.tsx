import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import {
  CollegiateCreateSchema,
  CollegiateUpdateSchema,
} from "~/server/common/PageSchema";
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

const CollegiateAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.collegiate.getAll.useQuery();

  const { mutateAsync: create } = api.collegiate.create.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.collegiate.getAll.invalidate();
      setOpenCreateDialog(false);
      toast.success("Membro criado com sucesso!!!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao criar membro !!!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof CollegiateCreateSchema>>({
    resolver: zodResolver(CollegiateCreateSchema),
  });
  const createMember: SubmitHandler<
    z.infer<typeof CollegiateCreateSchema>
  > = async (data) => {
    const res = await create(data);
    console.log("res", res);
  };

  const { mutateAsync: update } = api.collegiate.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.collegiate.getAll.invalidate();
      resetUpdate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar conteúdo da página !!!", {
        autoClose: 2000,
      });
    },
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate, isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof CollegiateUpdateSchema>>({
    resolver: zodResolver(CollegiateUpdateSchema),
  });
  const updateMember: SubmitHandler<
    z.infer<typeof CollegiateUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    resetUpdate();
  };

  const { mutate: deleteMember } = api.collegiate.delete.useMutation({
    onSuccess: () => {
      toast.success("Membro deletado com sucesso!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteMember() {
    try {
      deleteMember({ id: member.id });
    } catch (error) {
      console.log("Error deleting member:", error);
    }
  }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Colegiado de Curso</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">Nome</TableHead>
              <TableHead className="border border-gray-300 p-2">
                Segmento
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Email
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Vigência
              </TableHead>
              <TableHead className="w-40 border border-gray-300 p-2">
                Acoes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData?.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="border border-gray-300 p-2">
                  {member.teacher}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.segment}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.email}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.validity}
                </TableCell>
                <TableCell className="flex w-40 justify-center gap-1 border border-gray-300 px-4 py-2">
                  <Dialog
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenEditDialog(true);
                          resetUpdate();
                        }}
                        variant="outline"
                        className="hover:bg-cyan-800"
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                      <DialogHeader className="flex items-center ">
                        <DialogTitle>Edição de professores</DialogTitle>
                        <DialogDescription>
                          Edição de professores
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmitUpdate(updateMember)}
                        className=""
                      >
                        <section className="grid h-full grid-cols-1 items-center gap-2">
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              defaultValue={member.teacher}
                              {...registerUpdate("teacher")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Segmento</Label>
                            <Input
                              id="type"
                              type="text"
                              defaultValue={member.segment}
                              {...registerUpdate("segment")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="text"
                              defaultValue={member.email}
                              {...registerUpdate("email")}
                            />
                            <div className="flex columns-1 flex-col items-start gap-3"></div>
                            <Label htmlFor="validity">Vigência</Label>
                            <Input
                              id="validity"
                              type="text"
                              defaultValue={member.validity}
                              {...registerUpdate("validity")}
                            />
                          </div>
                          <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                            <Button
                              className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                              onClick={() => setOpenEditDialog(false)}
                            >
                              {isSubmittingUpdate ? (
                                <SyncLoader />
                              ) : (
                                "Salvar alteracoes"
                              )}
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
                          Voce tem certeza que deseja deletar essa informacao?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Lembre que, deletando essa informacao, nao sera
                          possivel recupera-la.
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
                          onClick={handleDeleteMember}
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

        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetCreate();
                setOpenCreateDialog(true);
              }}
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Adicionar membro</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Cadastro de membro do colegiado</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitCreate(createMember)}>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input id="name" type="text" {...registerCreate("teacher")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...registerCreate("segment")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...registerCreate("email")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="validity">Vigência</Label>
                  <Input
                    id="validity"
                    type="text"
                    {...registerCreate("validity")}
                  />
                </div>
                <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                  <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                    {isSubmittingCreate ? <SyncLoader /> : "Criar Membro"}
                  </Button>
                </DialogFooter>
              </section>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

CollegiateAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CollegiateAdmin;
