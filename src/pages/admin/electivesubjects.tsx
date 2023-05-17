import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
<<<<<<< HEAD
import Image from "next/image";
=======
import { HiOutlinePlus } from "react-icons/hi";
>>>>>>> dev
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
<<<<<<< HEAD
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
=======
>>>>>>> dev
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Card from "~/components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { Check, ChevronsUpDown } from "lucide-react";
=======

>>>>>>> dev
import { cn } from "~/utils/cn";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { CardUpdateSchema } from "~/server/common/CardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Separator } from "~/components/ui/separator";
<<<<<<< HEAD
=======
import { ElectiveSubjectsSchema } from "~/server/common/PageSchema";
>>>>>>> dev

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

<<<<<<< HEAD
const ElectiveSubjects: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

=======
const ElectiveSubjectsAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
>>>>>>> dev
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.electivesubject.getAll.useQuery();

<<<<<<< HEAD
=======
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

>>>>>>> dev
  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

<<<<<<< HEAD
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
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Rol de Disciplinas Eletivas
        </h1>
        <p className="text-white">
          O quadro a seguir apresenta o rol de disciplinas eletivas do curso, no
          qual poderão ser definidas nas disciplinas eletivas obrigatórias de I
          a VII. A oferta de disciplinas, de acordo com as possibilidades
          constantes no rol de disciplinas, será definida em conjunto entre o
          Colegiado de Curso e o Núcleo Docente Estruturante (NDE).
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CH</th>
              <th className="px-4 py-2">Créditos</th>
              <th className="px-4 py-2">Pré-requisitos</th>
              <th className="px-4 py-2">Ações</th>
=======
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
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">CH</th>
              <th className="border border-gray-300 p-2">Créditos</th>
              <th className="border border-gray-300 p-2">Pré-requisitos</th>
              <th className="w-40 border border-gray-300 p-2">Ações</th>
>>>>>>> dev
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
<<<<<<< HEAD
                <td className="border px-4 py-2">{data.name}</td>
                <td className="border px-4 py-2">{data.ch}</td>
                <td className="border px-4 py-2">{data.credits}</td>
                <td className="border px-4 py-2">{data.prerequisites}</td>
                <td className="border px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
=======
                <td className="border border-gray-300 p-2">{data.name}</td>
                <td className="border border-gray-300 p-2">{data.ch}</td>
                <td className="border border-gray-300 p-2">{data.credits}</td>
                <td className="border border-gray-300 p-2">
                  {data.prerequisites}
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
>>>>>>> dev
                        <DialogTitle>Edicao de professores</DialogTitle>
                        <DialogDescription>
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
<<<<<<< HEAD
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
=======
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
>>>>>>> dev
                </td>
              </tr>
            ))}
          </tbody>
        </table>
<<<<<<< HEAD
      </div>
      <Separator />
=======
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
>>>>>>> dev
    </section>
  );
};

<<<<<<< HEAD
ElectiveSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjects;
=======
ElectiveSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjectsAdmin;
>>>>>>> dev
