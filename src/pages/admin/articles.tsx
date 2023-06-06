/* eslint-disable @typescript-eslint/no-misused-promises */
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import Link from "next/link";
import {
  CreatePublicationsSchema,
  UpdatePublicationsSchema,
} from "~/server/common/Schemas";
import { HiOutlinePlus } from "react-icons/hi";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
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
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";

const ArticlesAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idArticle, setIdArticle] = useState("");
  const [objectArticle, setObjectArticle] = useState({
    id: "",
    link: "",
    title: "",
    resume: "",
    author: "",
  });

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.articles.getAll.useQuery();

  const { mutateAsync: update } = api.articles.update.useMutation({
    onSuccess: () => {
      void utils.articles.getAll.invalidate();
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
  } = useForm<z.infer<typeof UpdatePublicationsSchema>>({
    resolver: zodResolver(UpdatePublicationsSchema),
  });
  const updateArticle: SubmitHandler<
    z.infer<typeof UpdatePublicationsSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    setOpenUpdateDialog(false);
    resetUpdate();
  };
  const { mutateAsync: create } = api.articles.create.useMutation({
    onSuccess: () => {
      void utils.articles.getAll.invalidate();
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
  } = useForm<z.infer<typeof CreatePublicationsSchema>>({
    resolver: zodResolver(CreatePublicationsSchema),
  });
  const createArticle: SubmitHandler<
    z.infer<typeof CreatePublicationsSchema>
  > = async (data) => {
    await create(data);
    resetCreate();
    setOpenCreateDialog(false);
  };

  const { mutate: deleteArticle } = api.articles.delete.useMutation({
    onSuccess: () => {
      void utils.articles.getAll.invalidate();
      toast.success("Artigo deletado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao deletar artigo !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteArticle() {
    try {
      deleteArticle({ id: idArticle });
    } catch (error) {
      console.log("Erro ao deletar artigo:", error);
    }
  }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section
      className={`flex h-full w-full flex-col items-start justify-start pl-4 pt-10 text-white`}
    >
      <div className="flex h-full w-full flex-col gap-5 ">
        <h1 className="text-3xl font-bold">Artigos Publicados</h1>
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpenCreateDialog(true);
                }}
                className="group flex w-1/4 cursor-default items-center  justify-center gap-2 rounded-xl border p-2 hover:outline-double "
              >
                <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                Inserir uma nova publicação de artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="top-20 flex flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700 sm:max-w-[50vw]">
              <DialogHeader className="flex items-center justify-center">
                <DialogTitle> Cadastrar nova publicacao</DialogTitle>
                <DialogDescription className="">
                  Preencher todos os campos{" "}
                  {"(Os campos são em formato string)"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitCreate(createArticle)}>
                <section className="grid h-full grid-cols-2 gap-2">
                  <div className="flex columns-1 flex-col items-start gap-3">
                    <Label htmlFor="title" className="text-right">
                      Titulo do trabalho
                    </Label>
                    <Input
                      id="title"
                      className=""
                      {...registerCreate("title")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="resume" className="text-right">
                      Resumo do trabalho
                    </Label>
                    <Input
                      id="resume"
                      className=""
                      {...registerCreate("resume")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="author" className="text-right">
                      Autor do trabalho
                    </Label>
                    <Input
                      id="author"
                      className=""
                      {...registerCreate("author")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="link" className="text-right">
                      Link do trabalho
                    </Label>
                    <Input id="link" className="" {...registerCreate("link")} />
                  </div>
                </section>
                <DialogFooter className="flex pt-4 ">
                  <Button
                    type="submit"
                    className="flex border border-zinc-700 bg-zinc-700  text-white hover:border-zinc-600 hover:bg-zinc-600"
                    onClick={() => {
                      console.log("click");
                    }}
                  >
                    {isSubmittingCreate ? (
                      <SyncLoader color="white" />
                    ) : (
                      "Cadastrar"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {pageData.map((data) => (
        <div
          key={data.id}
          className="flex h-full w-full flex-col items-start pt-6 "
        >
          <section
            className={`group flex w-full  flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
          >
            <span className={`text-xl `}>{data.title.toUpperCase()}</span>
            <span className={`flex text-start  text-sm `}>{data.resume}</span>
            <span className={`text-start text-sm`}>
              Nome do estudante: {data.author}
            </span>
            <span className={`text-start text-sm`}>
              <Link
                className="cursor-pointer hover:text-red-500"
                href={data.link}
                target="_blank"
              >
                Clique aqui para acessar o trabalho
              </Link>
            </span>
          </section>
          <section className="flex gap-2">
            <Sheet open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
              <SheetTrigger asChild>
                <Button
                  className="bg-neutral-500 text-zinc-900 hover:bg-neutral-400 "
                  onClick={() => {
                    resetUpdate();
                    setOpenUpdateDialog(true);
                    setObjectArticle(data);
                  }}
                >
                  Editar Publicação
                </Button>
              </SheetTrigger>
              <ScrollArea>
                <SheetContent
                  position="right"
                  size={"default"}
                  className="bg-zinc-800 text-white"
                >
                  <SheetHeader>
                    <SheetTitle>Editar Conteudo</SheetTitle>
                    <SheetDescription>
                      Nessa folha lateral é possível estar editando o conteúdo
                      desta página
                    </SheetDescription>
                  </SheetHeader>
                  <form
                    onSubmit={handleSubmitUpdate(updateArticle)}
                    className="flex gap-2"
                  >
                    <div className="flex w-full flex-col gap-4 py-4">
                      <div className="col-span-3 flex flex-col items-start gap-4">
                        <Input
                          defaultValue={objectArticle.id}
                          type="hidden"
                          {...registerUpdate("id")}
                        />
                        <Label htmlFor="title" className="">
                          Alterar o titulo da publicação
                        </Label>
                        <Input
                          id="titlePage"
                          defaultValue={objectArticle.title}
                          className="col-span-3"
                          {...registerUpdate("title")}
                        />
                        <Label htmlFor="title" className="">
                          Alterar o nome do author da publicação
                        </Label>
                        <Input
                          id="titlePage"
                          defaultValue={objectArticle.author}
                          className="col-span-3"
                          {...registerUpdate("author")}
                        />
                        <Label htmlFor="newValue" className="">
                          Digite o novo conteúdo a ser apresentado no corpo da
                          página
                        </Label>
                        <Textarea
                          defaultValue={objectArticle.resume}
                          {...registerUpdate("resume")}
                        ></Textarea>
                        <Label htmlFor="title" className="">
                          Alterar o link dos dados
                        </Label>
                        <Input
                          id="titlePage"
                          defaultValue={objectArticle.link}
                          className="col-span-3"
                          {...registerUpdate("link")}
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
              </ScrollArea>
            </Sheet>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={() => {
                    setOpenAlert(true);
                    setIdArticle(data.id);
                  }}
                  className=" bg-neutral-500 text-black hover:bg-red-500"
                  variant="outline"
                >
                  Excluir Publicação
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Voce tem certeza que deseja deletar essa informacao?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Lembre que, deletando essa informacao, nao sera possivel
                    recupera-la.
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
                      handleDeleteArticle();
                      console.log("confirmar exclusão, id: ", idArticle);
                    }}
                    className="hover:bg-cyan-700"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </div>
      ))}
    </section>
  );
};

ArticlesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ArticlesAdmin;
