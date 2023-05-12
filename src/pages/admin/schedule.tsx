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
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { ScheduleSchema } from "~/server/common/PageSchema";
import { HiOutlinePlus } from "react-icons/hi";

const ScheduleAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.schedule.getAll.useQuery();

  const { mutateAsync: update } = api.schedule.update.useMutation({
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
  } = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
  });
  const updateSchedule: SubmitHandler<z.infer<typeof ScheduleSchema>> = async (
    data
  ) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

  const { mutateAsync: create } = api.schedule.create.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Membro adicionado com sucesso!");
    },
  });

  const { mutate } = api.schedule.delete.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });

  function handleDeleteSchedule() {
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
      <h1 className="pl-4 text-xl">Horarios passados e atuais do curso</h1>
      <span className="pl-4">
        Aqui você pode adicionar, editar e remover horarios passados e atuais do
        curso. de sistemas de informação.
      </span>
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Ano</th>
              <th className="border border-gray-300 p-2">Semestre</th>
              <th className="w-20 border border-gray-300 p-2">Link</th>
              <th className="w-40 border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.map((data) => (
              <tr key={data.id}>
                <td className="border border-gray-300 p-2">{data.year}</td>
                <td className="border border-gray-300 p-2">{data.semester}</td>
                <td className="w-20 border border-gray-300 p-2 pl-3">
                  <a href={data.link} target="_blank">
                    Acessar
                  </a>
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
                        <DialogTitle>Edição do horário</DialogTitle>
                        <DialogDescription>
                          Edite o horário passado ou atual do curso de sistemas
                          de informação.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmit(updateSchedule)}
                        className=""
                      >
                        <section className="grid h-full grid-cols-1 items-center gap-2 ">
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Ano</Label>
                            <Input
                              id="year"
                              type="text"
                              placeholder={data.year}
                              {...register("year")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="email">Semestre</Label>
                            <Input
                              id="semester"
                              type="text"
                              placeholder={data.semester}
                              {...register("semester")}
                            />
                            <div className="flex columns-1 flex-col items-start gap-3"></div>
                            <Label htmlFor="validity">Link de acesso</Label>
                            <Input
                              id="link"
                              type="text"
                              placeholder={data.link}
                              {...register("link")}
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
                    onClick={handleDeleteSchedule}
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
              <DialogTitle>Incluir novo horario para o curso</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="year" className="text-right">
                    Ano
                  </Label>
                  <Input id="year" type="text" {...register("year")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Semestre</Label>
                  <Input id="semester" type="text" {...register("semester")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="link">Link</Label>
                  <Input id="link" type="text" {...register("link")} />
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

ScheduleAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ScheduleAdmin;
