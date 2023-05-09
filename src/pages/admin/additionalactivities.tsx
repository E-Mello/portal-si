import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { type SubmitHandler, useForm } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { type ReactElement } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AdditionalActivitiesSchema } from "~/server/common/PageSchema";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const AdditionalActivitiesAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.additionalActivities.getAll.useQuery();
  const { mutateAsync: update } = api.additionalActivities.update.useMutation({
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
  } = useForm<z.infer<typeof AdditionalActivitiesSchema>>({
    resolver: zodResolver(AdditionalActivitiesSchema),
  });
  const updatePage: SubmitHandler<
    z.infer<typeof AdditionalActivitiesSchema>
  > = async (data) => {
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
    <section className="flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <h1 className="pb-4 text-3xl font-bold text-white">
              {pageData.title}
            </h1>
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
            <br></br>
            <Link className="text-blue-900" href={pageData.link || "/"}>
              <b>{pageData.nameLink}</b>
            </Link>
          </div>
        )}
      </div>

      <div className="flex pl-4">
        <form
          className="flex flex-col gap-4 py-4"
          onSubmit={handleSubmit(updatePage)}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-slate-200 text-zinc-900">
                Editar Conteudo da página
              </Button>
            </SheetTrigger>

            <ScrollArea className="h-full ">
              <SheetContent
                position="right"
                size={"default"}
                className="flex h-full flex-col gap-4 bg-zinc-800"
              >
                <SheetHeader>
                  <SheetTitle>Editar Conteudo</SheetTitle>
                  <SheetDescription>
                    Nessa folha lateral é possível estar editando o conteúdo
                    desta página
                  </SheetDescription>
                </SheetHeader>

                <div className="col-span-3 flex flex-col items-start gap-4">
                  <Label htmlFor="title" className="">
                    Alterar o titulo da página
                  </Label>
                  <Input
                    id="titlePage"
                    placeholder={pageData?.title}
                    className="col-span-3"
                    {...register("title", { required: true })}
                  />
                  <Label htmlFor="newValue" className="">
                    Digite o novo conteúdo a ser apresentado no corpo da página
                  </Label>
                  <Textarea
                    className="col-span-3 h-64"
                    {...register("content")}
                  />
                </div>
                <Label htmlFor="link" className="">
                  Alterar o link de acesso a documentação
                </Label>
                <Input
                  id="linkPage"
                  placeholder={pageData?.link || ""}
                  className="col-span-3"
                  {...register("link")}
                />

                <Label htmlFor="link" className="">
                  Alterar o nome do link
                </Label>
                <Input
                  id="nameLink"
                  placeholder={pageData?.nameLink || ""}
                  className="col-span-3"
                  {...register("nameLink")}
                />

                <SheetFooter className="">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-200 text-zinc-900"
                  >
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </ScrollArea>
          </Sheet>
        </form>
      </div>
    </section>
  );
};

AdditionalActivitiesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AdditionalActivitiesAdmin;
