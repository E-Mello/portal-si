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
import { CollegiateSchema } from "~/server/common/PageSchema";

const CollegiateAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.collegiate.getAll.useQuery();

  const { mutateAsync: update } = api.collegiate.update.useMutation({
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
  } = useForm<z.infer<typeof CollegiateSchema>>({
    resolver: zodResolver(CollegiateSchema),
  });
  const updateMember: SubmitHandler<z.infer<typeof CollegiateSchema>> = async (
    data
  ) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutateAsync: create } = api.collegiate.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const { mutate } = api.collegiate.delete.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });

  function handleDeleteMember() {
    try {
      mutate({ id: member.id });
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
      <h1 className="pl-4 text-xl">Colegiado de Curso</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Segmento</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Vigência</th>
              <th className="w-40 border border-gray-300 p-2">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.map((member) => (
              <tr key={member.id}>
                <td className="border border-gray-300 p-2">{member.teacher}</td>
                <td className="border border-gray-300 p-2">{member.segment}</td>
                <td className="border border-gray-300 p-2">{member.email}</td>
                <td className="border border-gray-300 p-2">
                  {member.validity}
                </td>
                <td className="flex w-40 justify-center gap-1 border border-gray-300 px-4 py-2">
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
                      <form onSubmit={handleSubmit(updateMember)} className="">
                        <section className="grid h-full grid-cols-1 items-center gap-2">
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder={member.teacher}
                              {...register("teacher")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Segmento</Label>
                            <Input
                              id="type"
                              type="text"
                              placeholder={member.segment}
                              {...register("segment")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="text"
                              placeholder={member.email}
                              {...register("email")}
                            />
                            <div className="flex columns-1 flex-col items-start gap-3"></div>
                            <Label htmlFor="validity">Vigência</Label>
                            <Input
                              id="validity"
                              type="text"
                              placeholder={member.validity}
                              {...register("validity")}
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
                    onClick={handleDeleteMember}
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
                  <Input id="name" type="text" {...register("teacher")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...register("segment")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...register("email")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="validity">Vigência</Label>
                  <Input id="validity" type="text" {...register("validity")} />
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

CollegiateAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CollegiateAdmin;
