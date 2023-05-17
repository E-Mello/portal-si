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
import { PublicationsSchema } from "~/server/common/PageSchema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";

const ArticlesAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.articles.getAll.useQuery();

  const { mutateAsync: update } = api.aboutcourse.update.useMutation({
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
  } = useForm<z.infer<typeof PublicationsSchema>>({
    resolver: zodResolver(PublicationsSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof PublicationsSchema>> = async (
    data
  ) => {
    const res = await update(data);
    console.log("res", res);
    reset();
  };

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
      <div className="flex h-full w-full justify-start ">
        <h1 className="text-3xl font-bold">Artigos Publicados</h1>
      </div>
      {pageData.map((data) => (
        <div
          key={data.id}
          className="flex h-full w-full flex-col items-start pt-6 "
        >
          <section
            className={`group flex  flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
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
                Acessar o trabalho: {data.linkName}
              </Link>
            </span>
          </section>
          <section className="flex gap-2">
            <form onSubmit={handleSubmit(updatePage)} className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-slate-200 text-zinc-900">
                    Editar Publicação
                  </Button>
                </SheetTrigger>
                <ScrollArea>
                  <SheetContent
                    position="right"
                    size={"default"}
                    className="bg-zinc-800"
                  >
                    <SheetHeader>
                      <SheetTitle>Editar Conteudo</SheetTitle>
                      <SheetDescription>
                        Nessa folha lateral é possível estar editando o conteúdo
                        desta página
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="col-span-3 flex flex-col items-start gap-4">
                        <Label htmlFor="title" className="">
                          Alterar o titulo da publicação
                        </Label>
                        <Input
                          id="titlePage"
                          placeholder="Atividades Complementares"
                          className="col-span-3"
                          {...register("title")}
                        />
                        <Label htmlFor="title" className="">
                          Alterar o nome do author da publicação
                        </Label>
                        <Input
                          id="titlePage"
                          placeholder="Atividades Complementares"
                          className="col-span-3"
                          {...register("author")}
                        />
                        <Label htmlFor="newValue" className="">
                          Digite o novo conteúdo a ser apresentado no corpo da
                          página
                        </Label>
                        <Textarea {...register("resume")}></Textarea>
                        <Label htmlFor="title" className="">
                          Alterar o nome do link da pagina
                        </Label>
                        <Input
                          id="titlePage"
                          placeholder="Atividades Complementares"
                          className="col-span-3"
                          {...register("linkName")}
                        />
                        <Label htmlFor="title" className="">
                          Inserir o link dos dados
                        </Label>
                        <Input
                          id="titlePage"
                          placeholder="Atividades Complementares"
                          className="col-span-3"
                          {...register("link")}
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <button
                        type="submit"
                        className=" rounded-md bg-slate-200 px-4 py-2 text-zinc-900"
                      >
                        {isSubmitting ? <SyncLoader /> : "Salvar Alterações"}
                      </button>
                    </SheetFooter>
                  </SheetContent>
                </ScrollArea>
              </Sheet>
            </form>
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
