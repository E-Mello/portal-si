/* eslint-disable @typescript-eslint/no-misused-promises */
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

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type SubmitHandler, useForm } from "react-hook-form";
import { supervisedInternshipUpdateSchema } from "~/server/common/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import Link from "next/link";
import { LoadingSpinner } from "~/components/Loading";

const SupervisedInternshipAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.supervisedInternship.getAll.useQuery();
  const { mutateAsync: update } = api.additionalActivities.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.additionalActivities.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof supervisedInternshipUpdateSchema>>({
    resolver: zodResolver(supervisedInternshipUpdateSchema),
  });

  const updatePage: SubmitHandler<
    z.infer<typeof supervisedInternshipUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    if (res) {
      reset();
    } else {
      toast.error("Failed to update page.", {
        autoClose: 2000,
      });
    }
  };

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <h1 className="pb-4 text-3xl font-bold text-white">
              {pageData.title}
            </h1>
            {pageData.content?.split("+").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
            <br></br>
            <span className="text-white">{pageData.info} </span>
            <Link
              className="text-blue-900"
              target="_blank"
              href={pageData.link || "/"}
            >
              <b>{pageData.nameLink}</b>
            </Link>
          </div>
        )}
      </div>
      <div className="flex pl-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-slate-200 text-zinc-900"
              onClick={() => {
                reset();
              }}
            >
              Editar Conteudo da página
            </Button>
          </SheetTrigger>

          <ScrollArea className="h-full ">
            <SheetContent
              position="right"
              size={"default"}
              className="flex h-full flex-col gap-4 bg-zinc-800 text-white"
            >
              <form
                className="flex flex-col gap-4 py-4"
                onSubmit={handleSubmit(updatePage)}
              >
                <SheetHeader>
                  <SheetTitle>Editar Conteudo</SheetTitle>
                  <SheetDescription>
                    Nessa folha lateral é possível estar editando o conteúdo
                    desta página, lembrando que o caractere `+` serve para
                    quebrar linha, quando o codigo ler, ira substituir por uma
                    quebra de linha
                  </SheetDescription>
                </SheetHeader>

                <div className="col-span-3 flex flex-col items-start gap-4">
                  <Input
                    type="hidden"
                    {...register("id")}
                    defaultValue={pageData?.id}
                  />
                  <Label htmlFor="title" className="">
                    Alterar o titulo da página
                  </Label>
                  <Input
                    id="titlePage"
                    defaultValue={pageData?.title}
                    className="col-span-3"
                    {...register("title")}
                  />
                  <Label htmlFor="newValue" className="">
                    Editar conteúdo a ser apresentado no corpo da página
                  </Label>
                  <Textarea
                    className="col-span-3 h-64"
                    {...register("content")}
                    defaultValue={pageData?.content || ""}
                  ></Textarea>
                  <Label htmlFor="link" className="">
                    Alterar a informação do link
                  </Label>
                  <Textarea
                    id="info"
                    defaultValue={pageData?.info || ""}
                    className="col-span-3"
                    {...register("info")}
                  />
                  <Label htmlFor="link" className="">
                    Alterar o nome do link
                  </Label>
                  <Input
                    id="nameLink"
                    defaultValue={pageData?.nameLink || ""}
                    className="col-span-3"
                    {...register("nameLink")}
                  />
                  <Label htmlFor="link" className="">
                    Alterar o link de acesso a documentação
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.link || ""}
                    className="col-span-3"
                    {...register("link")}
                  />
                </div>

                <SheetFooter className="">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-200 text-zinc-900"
                  >
                    {isSubmitting ? <LoadingSpinner /> : "Salvar Alterações"}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </ScrollArea>
        </Sheet>
      </div>
    </section>
  );
};

SupervisedInternshipAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default SupervisedInternshipAdmin;
