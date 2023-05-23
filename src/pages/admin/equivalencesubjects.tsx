import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EquivalenceCreateSchema,
  EquivalenceSchema,
} from "~/server/common/PageSchema";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const EquivalenceSubjectsAdmin: NextPageWithLayout = () => {
  const [openDialogCreateEquivalence, setOpenDialogCreateEquivalence] =
    useState(false);
  const [openDialogEditEquivalence, setOpenDialogEditEquivalence] =
    useState(false);
  const [openDialogSubject, setOpenDialogSubject] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.equivalence.getAll.useQuery();

  /**
   * Below is the code for the create equivalence
   */
  const { mutateAsync: createEquivalence } = api.equivalence.create.useMutation(
    {
      onSuccess: () => {
        // show success toast
        toast.success("Membro adicionado com sucesso!");
      },
    }
  );

  const {
    register: registerCreateEquivalence,
    handleSubmit: handleSubmitCreateEquivalence,
    reset: resetCreateEquivalence,
    formState: {
      errors: errorsCreateEquivalence,
      isSubmitting: isSubmittingCreateEquivalence,
    },
  } = useForm<z.infer<typeof EquivalenceCreateSchema>>({
    resolver: zodResolver(EquivalenceCreateSchema),
  });
  const handleCreateEquivalence: SubmitHandler<
    z.infer<typeof EquivalenceCreateSchema>
  > = async (data) => {
    const res = await createEquivalence(data);
    console.log("res", res);
    resetCreateEquivalence();
  };

  /**
   * Below is the code for the update equivalence
   */
  const { mutateAsync: updateEquivalence } = api.equivalence.update.useMutation(
    {
      onSuccess: () => {
        // show success toast
        toast.success("Conteúdo da página atualizado com sucesso!");
      },
    }
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof EquivalenceSchema>>({
    resolver: zodResolver(EquivalenceSchema),
  });
  const handleUpdateEquivalence: SubmitHandler<
    z.infer<typeof EquivalenceSchema>
  > = async (data) => {
    const res = await updateEquivalence(data);
    console.log("res", res);
    reset();
  };

  /**
   * Below is the code for the create subject
   */
  const { mutateAsync: createSubject } = api.equivalence.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const {
    register: registerCreateSubject,
    handleSubmit: handleSubmitCreateSubject,
    reset: resetCreateSubject,
    formState: {
      errors: errorsCreateSubject,
      isSubmitting: isSubmittingCreateSubject,
    },
  } = useForm<z.infer<typeof EquivalenceCreateSchema>>({
    resolver: zodResolver(EquivalenceCreateSchema),
  });
  const handleCreateSubject: SubmitHandler<
    z.infer<typeof EquivalenceCreateSchema>
  > = async (data) => {
    const res = await createSubject(data);
    console.log("res", res);
    resetCreateEquivalence();
  };

  const { mutate:} = api.equivalence.delete.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });

  function handleDeleteData() {
    try {
      mutate({ id: data.id });
    } catch (error) {
      console.log("Error deleting provider:", error);
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
      <h1 className="pl-4 text-xl">Tabela de Equivalência de Disciplinas</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <section className="flex w-1/2 gap-10">
        <Dialog open={openDialogSubject} onOpenChange={setOpenDialogSubject}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenDialogSubject(true);
                resetCreateEquivalence();
              }}
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Cadastrar Materia</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 shadow-2xl  shadow-zinc-700">
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
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...register("ch")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...register("equivalence")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="validity">Vigência</Label>
                  <Input
                    id="validity"
                    type="text"
                    {...register("chequivalence")}
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
        <Dialog
          open={openDialogCreateEquivalence}
          onOpenChange={setOpenDialogCreateEquivalence}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenDialogCreateEquivalence(true);
                resetCreateEquivalence();
              }}
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Cadastrar Equivalencia</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Cadastro de membro do colegiado</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmitCreateEquivalence(handleCreateEquivalence)}
            >
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input id="name" type="text" {...register("name")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...register("ch")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...register("equivalence")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="validity">Vigência</Label>
                  <Input
                    id="validity"
                    type="text"
                    {...register("chequivalence")}
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
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">
                Disciplina em SI
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Carga Horária
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Carga Horária
              </TableHead>
              <TableHead className="w-40 border border-gray-300 p-2">
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
                  {data.equivalence}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.chequivalence}
                </TableCell>
                <TableCell className="flex w-40 justify-center gap-1 border border-gray-300 p-2 px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="hover:bg-cyan-800">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 shadow-2xl  shadow-zinc-700">
                      <DialogHeader className="flex items-center ">
                        <DialogTitle>Edição de professores</DialogTitle>
                        <DialogDescription>
                          Edição de professores
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        // onSubmit={handleSubmit(updateEquivalence)}
                        className=""
                      >
                        <section className="grid h-full grid-cols-1 items-center gap-2 ">
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder={data.name}
                              {...register("name")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="ch">CH</Label>
                            <Input
                              id="ch"
                              type="text"
                              // placeholder={data.ch || "Erro ao carregar"}
                              {...register("ch")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="equivalence">
                              Materia Equivalente
                            </Label>
                            <Input
                              id="equivalence"
                              type="text"
                              placeholder={data.equivalence}
                              {...register("equivalence")}
                            />
                            <div className="flex columns-1 flex-col items-start gap-3"></div>
                            <Label htmlFor="chequivalence">
                              CH/Equivalencia
                            </Label>
                            <Input
                              id="chequivalence"
                              type="text"
                              // placeholder={data.chequivalence || "Erro ao carregar"}
                              {...register("chequivalence")}
                            />
                          </div>
                          <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                            <Button
                              className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                              onClick={() => setOpen(false)}
                            >
                              Salvar
                            </Button>
                          </DialogFooter>
                        </section>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={"outline"}
                    className="hover:bg-red-500"
                    // onClick={handleDeleteData}
                  >
                    {isSubmitting ? "Deletando..." : "Deletar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

EquivalenceSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EquivalenceSubjectsAdmin;
