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

const DashboardCardInfo: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: pageData } = api.teachercenter.getAll.useQuery();
  const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
=======
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { TeachingCenterSchema } from "~/server/common/PageSchema";
import { HiOutlinePlus } from "react-icons/hi";

const TeachingCenterAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.teachercenter.getAll.useQuery();
  const { mutateAsync: update } = api.teachercenter.update.useMutation({
>>>>>>> dev
    onSuccess: () => {
      toast.success("Card updated successfully");
    },
    onError: () => {
      toast.error(
        "Something is wrong in update data, please validate the data "
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
<<<<<<< HEAD
  } = useForm<z.infer<typeof CardUpdateSchema>>({
    resolver: zodResolver(CardUpdateSchema),
    defaultValues: {
      name: cardNameSelected,
      info: cardInfoSelected,
    },
  });

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
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante (NDE)</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante (NDE) do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className=" w-full justify-start pl-4 pr-10">
=======
  } = useForm<z.infer<typeof TeachingCenterSchema>>({
    resolver: zodResolver(TeachingCenterSchema),
  });

  const updateMember: SubmitHandler<
    z.infer<typeof TeachingCenterSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutateAsync: create } = api.teachercenter.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const { mutate } = api.teachercenter.delete.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });

  // function handleDeleteMember() {
  //   try {
  //     mutate({ id: member.id });
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
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante {"(NDE)"}</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante {"(NDE)"} do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className=" flex w-full flex-col gap-4 pl-4 pr-10">
>>>>>>> dev
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Vigência</th>
<<<<<<< HEAD
              <th className="border border-gray-300 p-2">Acoes</th>
=======
              <th className="w-40 border border-gray-300 p-2">Acoes</th>
>>>>>>> dev
            </tr>
          </thead>
          <tbody>
            {pageData?.map((member) => (
              <tr key={member.id}>
                <td className="border border-gray-300 p-2">
                  {member.teachers}
                </td>
                <td className="border border-gray-300 p-2">{member.type}</td>
                <td className="border border-gray-300 p-2">{member.email}</td>
                <td className="border border-gray-300 p-2">
                  {member.validity}
                </td>
<<<<<<< HEAD
                <td className="border border-gray-300 p-2">
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
                            {...register("name")}
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              {errors.name.message}
                            </span>
                          )}
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
                <td className="flex w-40 justify-center gap-1 border border-gray-300 px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="hover:bg-cyan-800">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 shadow-2xl  shadow-zinc-700">
                      {/* <form onSubmit={handleSubmit(updateMember)}> */}
                      <form>
                        <DialogHeader className="flex items-center ">
                          <DialogTitle>Edicao de professores</DialogTitle>
                          <DialogDescription>
                            Edicao de professores
                          </DialogDescription>
                        </DialogHeader>
                        <section className="grid h-full grid-cols-1 items-center gap-2 ">
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder={member.teachers}
                              {...register("teachers")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Tipo</Label>
                            <Input
                              id="type"
                              type="text"
                              placeholder={member.type}
                              {...register("type")}
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
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="validity">Vigência</Label>
                            <Input
                              id="validity"
                              type="text"
                              placeholder={member.validity}
                              {...register("validity")}
                            />
                          </div>
                        </section>
                        <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                          <Button
                            className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            Salvar
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={"outline"}
                    className="hover:bg-red-500"
                    // onClick={handleDeleteMember}
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
                  <Input id="name" type="text" {...register("teachers")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Segmento</Label>
                  <Input id="type" type="text" {...register("type")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...register("email")} />
                  <div className="flex columns-1 flex-col items-start gap-3"></div>
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
>>>>>>> dev
      </div>
    </section>
  );
};

<<<<<<< HEAD
DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
=======
TeachingCenterAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingCenterAdmin;
>>>>>>> dev
