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
import { EquivalenceSchema } from "~/server/common/PageSchema";
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

const EquivalenceSubjectsAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.equivalence.getAll.useQuery();

  const { mutateAsync: update } = api.equivalence.update.useMutation({
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
  } = useForm<z.infer<typeof EquivalenceSchema>>({
    resolver: zodResolver(EquivalenceSchema),
  });
  const updateEquivalence: SubmitHandler<
    z.infer<typeof EquivalenceSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutateAsync: create } = api.equivalence.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const { mutate } = api.equivalence.delete.useMutation({
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
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Disciplina em SI</th>
              <th className="border border-gray-300 p-2">Carga Horária</th>
              <th className="border border-gray-300 p-2">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </th>
              <th className="border border-gray-300 p-2">Carga Horária</th>
              <th className="w-40 border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
                <td className="border border-gray-300 p-2">{data.name}</td>
                <td className="border border-gray-300 p-2">{data.ch}</td>
                <td className="border border-gray-300 p-2">
                  {data.equivalence}
                </td>
                <td className="border border-gray-300 p-2">
                  {data.chequivalence}
                </td>
                <td className="flex w-40 w-40 justify-center gap-1 border border border-gray-300 border-gray-300 p-2 px-4 py-2">
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
                        onSubmit={handleSubmit(updateEquivalence)}
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
                    onClick={handleDeleteData}
                  >
                    {isSubmitting ? "Deletando..." : "Deletar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog>
          <DialogTrigger asChild>
            <div className=" group flex w-full items-center justify-center rounded-xl  border p-2 hover:outline-double ">
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
            </div>
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
      </div>
    </section>
  );
};

EquivalenceSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EquivalenceSubjectsAdmin;
