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
import SyncLoader from "react-spinners/SyncLoader";
import {
  ScheduleCreateSchema,
  ScheduleUpdateSchema,
} from "~/server/common/PageSchema";
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
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { LoadingSpinner } from "~/components/Loading";

const ScheduleAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [scheduleObject, setScheduleObject] = useState({
    id: "",
    link: "",
    year: "",
    semester: "",
  });
  const [idSchedule, setIdSchedule] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.schedule.getAll.useQuery();

  const { mutateAsync: update } = api.schedule.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.schedule.getAll.invalidate();
      resetUpdateForm();
      setOpenDialogUpdate(false);
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar o conteúdo da página!");
    },
  });
  const {
    register: registerUpdateSchedule,
    handleSubmit: handleSubmitUpdateSchedule,
    reset: resetUpdateForm,
    formState: { errors: errorsUpdate, isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof ScheduleUpdateSchema>>({
    resolver: zodResolver(ScheduleUpdateSchema),
  });
  const updateSchedule: SubmitHandler<
    z.infer<typeof ScheduleUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    resetUpdateForm();
  };

  const { mutateAsync: create } = api.schedule.create.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.schedule.getAll.invalidate();
      setOpenDialogCreate(false);
      toast.success("Horario adicionado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao adicionar Horario!", {
        autoClose: 2000,
      });
    },
  });

  const {
    register: registerCreateSchedule,
    handleSubmit: handleSubmitCreateSchedule,
    reset: resetCreateForm,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof ScheduleCreateSchema>>({
    resolver: zodResolver(ScheduleCreateSchema),
  });

  const createSchedule: SubmitHandler<
    z.infer<typeof ScheduleCreateSchema>
  > = async (data) => {
    const res = await create(data);
    console.log("res", res);
  };

  const { mutate: deleteSchedule } = api.schedule.delete.useMutation({
    onSuccess: () => {
      void utils.schedule.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar o conteúdo da página!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteSchedule(idSchedule: string) {
    try {
      const res = deleteSchedule({ id: idSchedule });
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
      <h1 className="pl-4 text-xl">Horarios passados e atuais do curso</h1>
      <span className="pl-4">
        Aqui você pode adicionar, editar e remover horarios passados e atuais do
        curso. de sistemas de informação.
      </span>
      <div className="flex w-1/2 flex-col gap-4 pl-4 pr-10">
        <Table className="">
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-20  border border-gray-300 p-2 text-center">
                Ano
              </TableHead>
              <TableHead className="w-32  border border-gray-300 p-2 text-center">
                Semestre
              </TableHead>
              <TableHead className="w-20 border border-gray-300 p-2 text-center">
                Link
              </TableHead>
              <TableHead className="w-16 border border-gray-300 p-2 text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData?.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="w-20 border border-gray-300 p-2 text-center">
                  {schedule.year}
                </TableCell>
                <TableCell className="w-32 border border-gray-300 p-2 text-center">
                  {schedule.semester} Semestre
                </TableCell>
                <TableCell className="w-20 border border-gray-300 p-2 pl-3 text-center">
                  <a href={schedule.link} target="_blank">
                    Acessar
                  </a>
                </TableCell>
                <TableCell className=" border border-gray-300 py-2">
                  <Dialog
                    open={openDialogUpdate}
                    onOpenChange={setOpenDialogUpdate}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenDialogUpdate(true);
                          resetUpdateForm();
                          setScheduleObject(schedule);
                        }}
                        variant="outline"
                        className="mr-2  hover:bg-cyan-800"
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                      <DialogHeader className="flex items-center ">
                        <DialogTitle>Edição do horário</DialogTitle>
                        <DialogDescription>
                          Edite o horário passado ou atual do curso de sistemas
                          de informação.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmitUpdateSchedule(updateSchedule)}
                        className=""
                      >
                        <section className="grid h-full grid-cols-1 items-center gap-2 ">
                          <Input
                            type="hidden"
                            defaultValue={scheduleObject.id}
                            {...registerUpdateSchedule("id")}
                          />
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="type">Ano</Label>
                            <Input
                              id="year"
                              type="text"
                              defaultValue={scheduleObject.year}
                              {...registerUpdateSchedule("year")}
                            />
                          </div>
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="email">Semestre</Label>
                            <Input
                              id="semester"
                              type="text"
                              defaultValue={scheduleObject.semester}
                              {...registerUpdateSchedule("semester")}
                            />
                            <div className="flex columns-1 flex-col items-start gap-3"></div>
                            <Label htmlFor="validity">Link de acesso</Label>
                            <Input
                              id="link"
                              type="text"
                              defaultValue={scheduleObject.link}
                              {...registerUpdateSchedule("link")}
                            />
                          </div>
                          <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                            <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                              {isSubmittingUpdate ? (
                                <LoadingSpinner />
                              ) : (
                                "Salvar"
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
                          setIdSchedule(schedule.id);
                        }}
                        className="-mr-5 ml-4 hover:bg-red-500"
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
                          onClick={() => {
                            void handleDeleteSchedule(idSchedule);
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
        <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenDialogCreate(true);
                resetCreateForm();
              }}
              className="group flex w-full cursor-default items-center justify-center gap-2 rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              Adicionar um novo horario
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Incluir novo horario para o curso</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitCreateSchedule(createSchedule)}>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="year" className="text-right">
                    Ano
                  </Label>
                  <Input
                    id="year"
                    type="text"
                    {...registerCreateSchedule("year")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="type">Semestre</Label>
                  <Input
                    id="semester"
                    type="text"
                    {...registerCreateSchedule("semester")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    type="text"
                    {...registerCreateSchedule("link")}
                  />
                </div>
                <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                  <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                    {isSubmittingCreate ? <SyncLoader /> : "Cadastrar"}
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
