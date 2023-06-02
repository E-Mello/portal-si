/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FacultyCoreCreateSchema,
  FacultyCoreUpdateSchema,
} from "~/server/common/PageSchema";
import { HiOutlinePlus } from "react-icons/hi";
import { LoadingSpinner } from "~/components/Loading";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const TeachingCenterAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const [idMember, setIdMember] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.facultyCore.getAll.useQuery();
  const { mutateAsync: update } = api.facultyCore.update.useMutation({
    onSuccess: () => {
      void utils.facultyCore.getAll.invalidate();
      resetUpdate();
      setOpen(false);
      toast.success("Member updated successfully", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error(
        "Something is wrong in update data, please validate the data ",
        {
          autoClose: 2000,
        }
      );
    },
  });

  /**
   * Form to update  member
   */
  const {
    register: sendUpdateForm,
    handleSubmit: handleUpdateMember,
    formState: { errors: isErrorUpdate, isSubmitting: isSubmittingUpdate },
    reset: resetUpdate,
  } = useForm<z.infer<typeof FacultyCoreUpdateSchema>>({
    resolver: zodResolver(FacultyCoreUpdateSchema),
  });

  const updateMember: SubmitHandler<
    z.infer<typeof FacultyCoreUpdateSchema>
  > = async (data) => {
    console.log("data", data);

    try {
      const res = await update(data);
      console.log("res", res);
      resetUpdate();
    } catch (error) {
      // Handle error
      console.error(isErrorUpdate);
      toast.error("Failed to update page.", {
        autoClose: 2000,
      });
    }
  };

  /**
   * Form to create new member
   */
  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    formState: { errors: isErrorCreate, isSubmitting: isSubmittingCreate },
    reset: resetCreate,
  } = useForm<z.infer<typeof FacultyCoreCreateSchema>>({
    resolver: zodResolver(FacultyCoreCreateSchema),
  });

  const { mutateAsync: createMember } = api.facultyCore.create.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.facultyCore.getAll.invalidate();
      resetCreate();
      setOpen(false);
      toast.success("Membro adicionado com sucesso!", { autoClose: 2000 });
    },
    onError: () => {
      setOpen(false);
      toast.error("Erro ao adicionar membro!", { autoClose: 2000 });
    },
  });

  /**
   * Function to submit a new member to database
   */
  const submitNewMember: SubmitHandler<
    z.infer<typeof FacultyCoreCreateSchema>
  > = async (data) => {
    const res = await createMember(data);
    if (res) {
      console.log("res", res);
      resetCreate();
      setOpen(false);
    }
  };

  const { mutate: deleteMember } = api.facultyCore.delete.useMutation({
    onSuccess: () => {
      void utils.facultyCore.getAll.invalidate();
      toast.success("Membro deletado com sucesso!", { autoClose: 2000 });
    },
    onError: () => {
      toast.error("Erro ao deletar membro!", { autoClose: 2000 });
    },
  });

  function handleDeleteMember(idMember: string) {
    try {
      const res = deleteMember({ id: idMember });
      setOpen(false);
      return res;
    } catch (error) {
      console.log(error);
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
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante {"(NDE)"}</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante {"(NDE)"} do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className=" flex w-full flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">Nome</TableHead>
              <TableHead className="border border-gray-300 p-2">Tipo</TableHead>
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
                  {member.teachers}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.type}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.email}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {member.validity}
                </TableCell>
                <TableCell className="flex w-40 justify-center gap-1 border border-gray-300 px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
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
                        <DialogTitle>Edicao de professores</DialogTitle>
                        <DialogDescription>
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateMember(updateMember)}>
                        <section className="grid h-full grid-cols-1 items-center gap-2 ">
                          <Input
                            defaultValue={member.id}
                            type="hidden"
                            {...sendUpdateForm("id")}
                          />
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              id="name"
                              type="text"
                              defaultValue={member.teachers}
                              {...sendUpdateForm("teachers")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Tipo</Label>
                            <Input
                              id="type"
                              type="text"
                              defaultValue={member.type}
                              {...sendUpdateForm("type")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="text"
                              defaultValue={member.email}
                              {...sendUpdateForm("email")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="validity">Vigência</Label>
                            <Input
                              id="validity"
                              type="text"
                              defaultValue={member.validity}
                              {...sendUpdateForm("validity")}
                            />
                          </div>
                        </section>
                        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                          <Button
                            type="submit"
                            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                          >
                            {isSubmittingUpdate ? (
                              <LoadingSpinner />
                            ) : (
                              "Salvar alteracoes"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setIdMember(member.id);
                        }}
                        className="hover:bg-red-500"
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
                            setOpen(false);
                          }}
                          className="hover:bg-red-600"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            void handleDeleteMember(idMember);
                          }}
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
            <form onSubmit={handleSubmitMember(submitNewMember)}>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    {...registerMember("teachers")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...registerMember("type")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...registerMember("email")} />
                  <div className="flex columns-1 flex-col items-start gap-3"></div>
                  <Label htmlFor="validity">Vigência</Label>
                  <Input
                    id="validity"
                    type="text"
                    {...registerMember("validity")}
                  />
                </div>
                <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                  <Button
                    type="submit"
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
    </section>
  );
};

TeachingCenterAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingCenterAdmin;
