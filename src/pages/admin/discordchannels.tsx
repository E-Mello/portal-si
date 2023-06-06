/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, type ReactElement } from "react";

import Image from "next/image";
import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import { useRouter } from "next/router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Plus, Edit, X } from "lucide-react";

import { Button } from "~/components/ui/button";

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
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  CreateDiscordChannelsSchema,
  UpdateDiscordChannelsSchema,
} from "~/server/common/Schemas";
import { type z } from "zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const DiscordChannelsAdmin: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idChannel, setIdChannel] = useState("");

  const handleButtonClick = (url: string) => {
    void router.push(url);
  };

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.discordChannels.getAll.useQuery();

  const { mutateAsync: update } = api.discordChannels.update.useMutation({
    onSuccess: () => {
      void utils.discordChannels.getAll.invalidate();
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
    formState: { errors: errorsUpdate, isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof UpdateDiscordChannelsSchema>>({
    resolver: zodResolver(UpdateDiscordChannelsSchema),
  });
  const updateChannel: SubmitHandler<
    z.infer<typeof UpdateDiscordChannelsSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    setOpenUpdateDialog(false);
    resetUpdate();
  };
  const { mutateAsync: create } = api.discordChannels.create.useMutation({
    onSuccess: () => {
      void utils.discordChannels.getAll.invalidate();
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
  } = useForm<z.infer<typeof CreateDiscordChannelsSchema>>({
    resolver: zodResolver(CreateDiscordChannelsSchema),
  });
  const createChannel: SubmitHandler<
    z.infer<typeof CreateDiscordChannelsSchema>
  > = async (data) => {
    await create(data);
    resetCreate();
    setOpenCreateDialog(false);
  };

  const { mutate: deleteChannel } = api.discordChannels.delete.useMutation({
    onSuccess: () => {
      void utils.discordChannels.getAll.invalidate();
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
      deleteChannel({ id: idChannel });
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const discordImage =
    "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/banners-discord/discordBanner_resized.png";

  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-evenly bg-zinc-800 p-2 text-white`}
    >
      <Image width={500} height={500} alt="Discord Banner" src={discordImage} />
      <header className="flex flex-col gap-2 pb-2">
        <h1>Grupo destinado as grupos relacionados a cada materia</h1>
        <h3 className="">
          Com a intencao de facilitar as interacoes entre os alunos com os
          professores, abaixo estao um canal direto para cada semestre, dessa
          forma ao entrar em um grupo, voce acessara todos os outros grupos de
          cada materia daquele semestre, e assim podera interagir com os outros
          alunos e professores.
        </h3>
      </header>

      <div className="flex h-full w-full flex-wrap gap-6 pl-2">
        <div className="flex flex-col items-center justify-center p-4">
          <Sheet open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <SheetTrigger asChild>
              <div className="flex w-[17.7vw] flex-col items-center">
                <Button
                  variant="outline"
                  className=" flex w-10 flex-col justify-center rounded-full p-0 hover:bg-slate-500"
                  onClick={() => {
                    resetCreate();
                    setOpenCreateDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add</span>
                </Button>
                Cadastrar novo canal
              </div>
            </SheetTrigger>
            <SheetContent
              position="right"
              size={"default"}
              className="bg-zinc-800 text-white"
            >
              <SheetHeader>
                <SheetTitle>Editar Conteudo</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar editando o conteúdo desta
                  página
                </SheetDescription>
              </SheetHeader>
              <form
                onSubmit={handleSubmitCreate(createChannel)}
                className="flex gap-2"
              >
                <div className="flex w-full flex-col gap-4 py-4">
                  <div className="col-span-3 flex flex-col items-start gap-4">
                    <Label htmlFor="name" className="">
                      Inserir o nome do canal
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      {...registerCreate("name")}
                    />
                    <Label htmlFor="info" className="">
                      Inserir a informacao do canal
                    </Label>
                    <Textarea {...registerCreate("info")}></Textarea>
                    <Label htmlFor="link" className="">
                      Inserir o link de acesso ao canal
                    </Label>
                    <Input
                      id="link"
                      className="col-span-3"
                      {...registerCreate("link")}
                    />

                    <Label htmlFor="avatarUrl" className="">
                      Inserir o avatar do canal
                    </Label>
                    <Input
                      id="avatarUrl"
                      className="col-span-3"
                      {...registerCreate("avatarUrl")}
                    />
                  </div>
                  <SheetFooter>
                    <Button
                      type="submit"
                      className="flex rounded-md bg-slate-300 px-4 py-2 text-zinc-900 hover:bg-slate-200"
                    >
                      {isSubmittingCreate ? <SyncLoader /> : "Cadastrar Canal"}
                    </Button>
                  </SheetFooter>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        {pageData.map((data) => (
          <div key={data.id} className=" flex flex-col items-center p-4">
            <div className="flex w-full justify-end">
              <div className="flex w-full items-center justify-center pl-10">
                <Image
                  src={data.avatarUrl}
                  alt={data.name}
                  width={500}
                  height={500}
                  className="flex h-[8vh] w-[4vw] rounded-full"
                />
              </div>
              <div className="flex flex-col items-end justify-end gap-2">
                <div className="flex">
                  <Sheet
                    open={openUpdateDialog}
                    onOpenChange={setOpenUpdateDialog}
                  >
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className=" flex w-10  justify-center rounded-full p-0 hover:bg-slate-500 "
                        onClick={() => {
                          resetUpdate();
                          setOpenUpdateDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      position="right"
                      size={"default"}
                      className="bg-zinc-800 text-white"
                    >
                      <SheetHeader>
                        <SheetTitle>Editar Conteudo</SheetTitle>
                        <SheetDescription>
                          Nessa folha lateral é possível estar editando o
                          conteúdo desta página
                        </SheetDescription>
                      </SheetHeader>
                      <form
                        onSubmit={handleSubmitUpdate(updateChannel)}
                        className="flex gap-2"
                      >
                        <div className="flex w-full flex-col gap-4 py-4">
                          <div className="col-span-3 flex flex-col items-start gap-4">
                            <Input type="hidden" {...registerUpdate("id")} />
                            <Label htmlFor="name" className="">
                              Alterar o titulo da publicação
                            </Label>
                            <Input
                              id="name"
                              defaultValue={data.name}
                              className="col-span-3"
                              {...registerUpdate("name")}
                            />
                            <Label htmlFor="info" className="">
                              Alterar a informacao do canal
                            </Label>
                            <Textarea
                              defaultValue={data.info}
                              {...registerUpdate("info")}
                            ></Textarea>
                            <Label htmlFor="link" className="">
                              Alterar o link de acesso ao canal
                            </Label>
                            <Input
                              id="link"
                              defaultValue={data.link}
                              className="col-span-3"
                              {...registerUpdate("link")}
                            />

                            <Label htmlFor="avatarUrl" className="">
                              Alterar o avatar do canal
                            </Label>
                            <Input
                              id="avatarUrl"
                              defaultValue={data.avatarUrl}
                              className="col-span-3"
                              {...registerUpdate("avatarUrl")}
                            />
                          </div>
                          <SheetFooter>
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
                          </SheetFooter>
                        </div>
                      </form>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex">
                  <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className=" flex w-10 flex-col justify-center rounded-full p-0 hover:bg-slate-500 "
                        onClick={() => {
                          setOpenAlert(true);
                          setIdChannel(data.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
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
            <div className="mt-2 text-center">
              <h2 className="text-lg font-medium">{data.name}</h2>
              <p className="text-sm">{data.info}</p>
              <button
                className="mt-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={() => handleButtonClick(data.link)}
              >
                Join Channel
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

DiscordChannelsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DiscordChannelsAdmin;
