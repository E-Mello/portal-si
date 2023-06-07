/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  EventsCreateSchema,
  EventsUpdateSchema,
} from "~/server/common/Schemas";
import { HiOutlineCursorClick, HiOutlinePlus } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
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
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/utils/cn";
import { Calendar } from "~/components/ui/calendar";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const EventsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [date, setDate] = useState<Date>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  const [objectEvent, setObjectEvent] = useState({
    info: "",
    id: "",
    link: "",
    title: "",
    content: "",
    image: "",
    publicationDay: {},
  });
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.events.getAll.useQuery();

  const { mutateAsync: update } = api.events.update.useMutation({
    onSuccess: () => {
      // show success toast
      toast.success("Conteúdo da página atualizado com sucesso!");
    },
  });
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate, isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof EventsUpdateSchema>>({
    resolver: zodResolver(EventsUpdateSchema),
  });
  const updateEvent: SubmitHandler<z.infer<typeof EventsUpdateSchema>> = async (
    data
  ) => {
    const res = await update(data);
    console.log("res", res);
    resetUpdate();
  };

  const { mutateAsync: create } = api.events.create.useMutation({
    onSuccess: () => {
      void utils.events.getAll.invalidate();
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
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof EventsCreateSchema>>({
    resolver: zodResolver(EventsCreateSchema),
  });
  const createArticle: SubmitHandler<
    z.infer<typeof EventsCreateSchema>
  > = async (data) => {
    await create(data);
    resetCreate();
    setOpenCreateDialog(false);
  };

  const { mutateAsync: deleteEvent } = api.events.delete.useMutation({
    onSuccess: () => {
      void utils.events.getAll.invalidate();
      toast.success("Evento delatado com sucesso", { autoClose: 2000 });
    },
    onError: () => {
      toast.error("Alguma coisa esta errado com os dados do professor", {
        autoClose: 2000,
      });
    },
  });

  async function handleDeleteEvent(idEvent: string) {
    try {
      const res = await deleteEvent({ id: idEvent });
      setOpenAlert(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const [showAllEvents, setShowAllEvents] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(5);

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // Filtra os eventos para mostrar apenas os eventos visíveis
  const eventsToShow = pageData?.slice(0, visibleEvents) || [];

  const handleShowMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 5);
  };

  const handleShowAll = () => {
    setVisibleEvents(pageData?.length || 0);
    setShowAllEvents(true);
  };

  const handleShowLess = () => {
    setVisibleEvents(5);
    setShowAllEvents(false);
  };

  return (
    <section className="flex w-full flex-col items-center pl-5 pr-5 pt-4">
      <h1 className="flex pb-4 text-xl">Eventos do curso</h1>
      <section className="flex w-full">
        <Sheet open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <SheetTrigger asChild>
            <div className="flex w-full justify-center">
              <Button
                className="group flex cursor-default items-center justify-center gap-2 rounded-xl border bg-gradient-to-r from-blue-500 to-indigo-500 p-2 text-white hover:outline-double"
                onClick={() => {
                  setOpenCreateDialog(true);
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <HiOutlinePlus className="h-6 w-6 text-indigo-500" />
                </div>
                <span className="text-white">Adicionar novo evento</span>
              </Button>
            </div>
          </SheetTrigger>
          <ScrollArea>
            <SheetContent
              position="right"
              size={"default"}
              className="bg-zinc-800 text-white"
            >
              <SheetHeader>
                <SheetTitle>Incluir novo evento</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar criando um novo evento
                </SheetDescription>
              </SheetHeader>
              <form
                onSubmit={handleSubmitCreate(createArticle)}
                className="flex flex-col gap-4 py-4"
              >
                <div className="flex flex-col gap-4 py-4">
                  <div className="col-span-3 flex flex-col items-start gap-4">
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="title" className="">
                        Titulo do evento
                      </Label>
                      <Input
                        id="title"
                        className="col-span-3"
                        {...registerCreate("title")}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="info" className="">
                        Informacao do evento
                      </Label>
                      <Input
                        id="info"
                        className="col-span-3"
                        {...registerCreate("info")}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="info" className="">
                        Conteúdo do evento
                      </Label>
                      <Textarea
                        id="content"
                        className="col-span-3 h-72"
                        {...registerCreate("content")}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="image" className="">
                        Link da imagem do evento
                      </Label>
                      <Input
                        id="image"
                        className="col-span-3"
                        {...registerCreate("image")}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="publicationDay" className="">
                        Data de publicação
                      </Label>
                      <Input
                        id="publicationDay"
                        className="w-44"
                        type="date"
                        {...registerCreate("publicationDay", {
                          valueAsDate: true,
                        })}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <Label htmlFor="link" className="">
                        Inserir o link de acesso ao evento
                      </Label>
                      <Input
                        id="link"
                        className="col-span-3"
                        {...registerCreate("link")}
                      />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    type="submit"
                    className="bg-slate-200 text-zinc-900 hover:bg-slate-300"
                    onClick={() => {
                      console.log("printar a data: ", date);
                    }}
                  >
                    {isSubmittingCreate ? <SyncLoader /> : "Criar evento"}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </ScrollArea>
        </Sheet>
      </section>
      <section className="mx-auto flex w-full flex-col items-end py-4">
        {pageData
          .slice(0, showAllEvents ? pageData.length : 5)
          .map((event, index) => (
            <div key={index} className="w-full py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={event.image}
                    alt="Event"
                    className="h-20 w-20 object-cover"
                    width={500}
                    height={500}
                  />
                  <div>
                    <h3 className="text-xl font-medium">{event.title}</h3>
                    <p className="text-gray-500">{event.info}</p>
                    <h3 className="text-md font-medium text-gray-500">
                      Data do evento:{" "}
                      {event.publicationDay.toLocaleDateString("pt-BR")}
                    </h3>
                    {event.link ? (
                      <span className="flex items-center space-x-2">
                        <HiOutlineCursorClick className="h-5 w-5" />
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Acessar Página do evento
                        </a>
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-start justify-start">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mr-2 bg-blue-500 text-white hover:bg-blue-600">
                        Ver detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-800 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Detalhes do Evento
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Textarea
                          className="col-span-3 flex h-72 cursor-default border-none shadow-none outline-none ring-offset-0 hover:border-none focus:shadow-none focus:outline-none focus:ring-0 focus-visible:border-none"
                          value={event.content}
                          style={{ boxShadow: "none" }}
                          readOnly
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Sheet
                    open={openUpdateDialog}
                    onOpenChange={setOpenUpdateDialog}
                  >
                    <SheetTrigger asChild>
                      <Button
                        className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => {
                          resetUpdate();
                          setOpenUpdateDialog(true);
                          setObjectEvent(event);
                        }}
                      >
                        Editar evento
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      position="right"
                      className="bg-zinc-800 text-white"
                    >
                      <form onSubmit={handleSubmitUpdate(updateEvent)}>
                        <div className="p-4">
                          <h2 className="text-xl font-semibold">
                            Editar Conteúdo
                          </h2>
                          <div className="mt-4 flex flex-col gap-4">
                            <Input
                              type="hidden"
                              defaultValue={objectEvent.id}
                              {...registerUpdate("id")}
                            />
                            <div>
                              <Label htmlFor="title" className="">
                                Alterar o título da página
                              </Label>
                              <Input
                                id="titlePage"
                                defaultValue={objectEvent.title}
                                className="mt-1"
                                {...registerUpdate("title")}
                              />
                            </div>
                            <div>
                              <Label htmlFor="info" className="">
                                Alterar a informação do evento
                              </Label>
                              <Input
                                id="info"
                                defaultValue={objectEvent.info}
                                className="mt-1"
                                {...registerUpdate("info")}
                              />
                            </div>
                            <div>
                              <Label htmlFor="image" className="">
                                Alterar o link da imagem do evento
                              </Label>
                              <Input
                                id="image"
                                defaultValue={objectEvent.image}
                                className="mt-1"
                                {...registerUpdate("image")}
                              />
                            </div>
                            <div>
                              <Label htmlFor="date" className="">
                                Alterar a data de publicação
                              </Label>
                              <Input
                                defaultValue={event.publicationDay.toLocaleDateString(
                                  "pt-BR"
                                )}
                                type="date"
                                className="mt-1"
                                {...registerUpdate("publicationDay", {
                                  valueAsDate: true,
                                })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="content" className="">
                                Conteúdo do evento
                              </Label>
                              <Textarea
                                defaultValue={event.content}
                                className="mt-1 h-72"
                                {...registerUpdate("content")}
                              />
                            </div>
                            <div>
                              <Label htmlFor="link" className="">
                                Alterar o link do evento
                              </Label>
                              <Input
                                id="link"
                                defaultValue={event.link}
                                className="mt-1"
                                {...registerUpdate("link")}
                              />
                            </div>
                          </div>
                        </div>
                        <SheetFooter>
                          <div className="flex justify-end gap-4">
                            <Button className="bg-blue-500 text-white">
                              {isSubmittingUpdate ? (
                                <SyncLoader />
                              ) : (
                                "Salvar Alterações"
                              )}
                            </Button>
                          </div>
                        </SheetFooter>
                      </form>
                    </SheetContent>
                  </Sheet>
                  <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenAlert(true);
                          setIdEvent(event.id);
                        }}
                        className=" bg-red-600 hover:bg-red-700"
                      >
                        Deletar evento
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-1/2 bg-zinc-800 text-white ">
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
                            void handleDeleteEvent(idEvent);
                          }}
                          className="hover:bg-cyan-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        {!showAllEvents && (
          <div className="flex w-full justify-center">
            <Button
              className="bg-slate-200 text-zinc-900"
              onClick={() => setShowAllEvents(true)}
            >
              Mostrar Mais
            </Button>
          </div>
        )}
        {showAllEvents && (
          <div className="flex w-full justify-center">
            <Button
              className="bg-slate-200 text-zinc-900"
              onClick={() => handleShowLess()}
            >
              Mostrar Menos
            </Button>
          </div>
        )}
      </section>
    </section>
  );
};

EventsAdmin.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EventsAdmin;
