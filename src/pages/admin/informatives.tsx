/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import Image from "next/image";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  InformativesCreateSchema,
  InformativesUpdateSchema,
} from "~/server/common/Schemas";
import { Button } from "~/components/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import SyncLoader from "react-spinners/SyncLoader";
import { Edit, X } from "lucide-react";

const InformativesAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idInformative, setIdInformative] = useState("");
  const [informativeObject, setInformativeObject] = useState({
    id: "",
    title: "",
    info: "",
    content: "",
    linkImg: "",
  });
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.informatives.getAll.useQuery();

  const { mutateAsync: update } = api.informatives.update.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
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
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof InformativesUpdateSchema>>({
    resolver: zodResolver(InformativesUpdateSchema),
  });
  const updateInformative: SubmitHandler<
    z.infer<typeof InformativesUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    setOpenUpdateDialog(false);
    resetUpdate();
  };
  const { mutateAsync: create } = api.informatives.create.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
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
    formState: { isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof InformativesCreateSchema>>({
    resolver: zodResolver(InformativesCreateSchema),
  });
  const createInformative: SubmitHandler<
    z.infer<typeof InformativesCreateSchema>
  > = async (data) => {
    await create(data);
    resetCreate();
    setOpenCreateDialog(false);
  };

  const { mutate: deleteInformative } = api.informatives.delete.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
      toast.success("Informacao deletada com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao tentar excluir !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteChannel() {
    try {
      deleteInformative({ id: idInformative });
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  const [cards, setCards] = useState<
    {
      info: string;
      id: string;
      title: string;
      content: string;
      linkImg: string;
    }[]
  >([]);

  useEffect(() => {
    if (pageData) {
      setCards(pageData.slice(0, 5));
    }
  }, [pageData]);

  const [showAll, setShowAll] = useState(false);

  const loadMoreCards = () => {
    const nextLoadedCards = cards.length + 10;
    setCards(pageData?.slice(0, nextLoadedCards) || []);
  };

  const showLessCards = () => {
    setCards(pageData?.slice(0, 10) || []);
    setShowAll(false);
  };

  const visibleCards = showAll ? pageData : cards;

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="w-full bg-zinc-800 px-4 py-12 text-white">
      <div className="mx-auto">
        <div>
          <h1 className="mb-8 text-center text-4xl font-bold">
            Informativos do curso
          </h1>
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <div className="flex w-full justify-center">
                <Button
                  className="group mb-4 flex cursor-default items-center justify-center gap-2 rounded-xl border bg-gradient-to-r from-blue-500 to-indigo-500 p-2 text-white hover:outline-double"
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
            </DialogTrigger>
            <ScrollArea>
              <DialogContent className="bg-zinc-800 text-white">
                <DialogHeader>
                  <DialogTitle>Incluir novo evento</DialogTitle>
                  <DialogDescription>
                    Nessa folha lateral é possível estar criando um novo evento
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmitCreate(createInformative)}
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
                          {...registerCreate("linkImg")}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-slate-200 text-zinc-900 hover:bg-slate-300"
                    >
                      {isSubmittingCreate ? <SyncLoader /> : "Criar evento"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </ScrollArea>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {visibleCards?.map((card) => (
            <div key={card.id} className="flex">
              <div className=" rounded-lg bg-zinc-700 p-6 shadow-lg">
                <div className="mb-4 flex  justify-center">
                  <Image
                    width={500}
                    height={500}
                    alt="test"
                    src={card.linkImg}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="mb-2 text-2xl font-bold">{card.title}</h2>
                <p className="mb-4  text-gray-500">{card.info}</p>
                <p className="text-gray-300">{card.content}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <Dialog
                    open={openUpdateDialog}
                    onOpenChange={setOpenUpdateDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className=" flex w-10  justify-center rounded-full p-0 hover:bg-slate-500 "
                        onClick={() => {
                          resetUpdate();
                          setOpenUpdateDialog(true);
                          setInformativeObject(card);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-800 text-white">
                      <DialogHeader>
                        <DialogTitle>Editar Conteudo</DialogTitle>
                        <DialogDescription>
                          Nessa folha lateral é possível estar editando o
                          conteúdo desta página
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmitUpdate(updateInformative)}
                        className="flex gap-2"
                      >
                        <div className="flex w-full flex-col gap-4 py-4">
                          <div className="col-span-3 flex flex-col items-start gap-4">
                            <Input
                              type="hidden"
                              defaultValue={informativeObject.id}
                              {...registerUpdate("id")}
                            />
                            <Label htmlFor="name" className="">
                              Alterar o titulo da publicação
                            </Label>
                            <Input
                              id="name"
                              defaultValue={informativeObject.title}
                              className="col-span-3"
                              {...registerUpdate("title")}
                            />
                            <Label htmlFor="info" className="">
                              Alterar a informacao do canal
                            </Label>
                            <Textarea
                              defaultValue={informativeObject.info}
                              {...registerUpdate("info")}
                            ></Textarea>
                            <Label htmlFor="link" className="">
                              Alterar o link de acesso ao canal
                            </Label>
                            <Input
                              id="link"
                              defaultValue={informativeObject.content}
                              className="col-span-3"
                              {...registerUpdate("content")}
                            />

                            <Label htmlFor="avatarUrl" className="">
                              Alterar o avatar do canal
                            </Label>
                            <Textarea
                              id="avatarUrl"
                              defaultValue={informativeObject.linkImg}
                              className="col-span-3"
                              {...registerUpdate("linkImg")}
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              className="flex rounded-md bg-slate-300 px-4 py-2 text-zinc-900 hover:bg-slate-200"
                            >
                              {isSubmittingUpdate ? (
                                <SyncLoader />
                              ) : (
                                "Salvar Alterações"
                              )}
                            </Button>
                          </DialogFooter>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex">
                  <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className=" flex w-10 flex-col justify-center rounded-full p-0 hover:bg-red-600 "
                        onClick={() => {
                          setOpenAlert(true);
                          setIdInformative(card.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
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
                            handleDeleteChannel();
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
        </div>
        {pageData && !showAll && pageData.length > 10 && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={loadMoreCards}
            >
              Load More
            </button>
          </div>
        )}
        {showAll && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={showLessCards}
            >
              Show Less
            </button>
          </div>
        )}
        {!showAll && pageData && pageData.length > 10 && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={() => setShowAll(true)}
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

InformativesAdmin.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default InformativesAdmin;
