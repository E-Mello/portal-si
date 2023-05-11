import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { PageViewSchema } from "~/server/common/PageSchema";
import type { ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CoursePurposeAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.coursePurpose.getAll.useQuery();

  const { mutateAsync: update } = api.coursePurpose.update.useMutation({
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
  } = useForm<z.infer<typeof PageViewSchema>>({
    resolver: zodResolver(PageViewSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof PageViewSchema>> = async (
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

  const fieldsets = [
    { title: pageData?.info, content: pageData?.content },
    { title: pageData?.info02, content: pageData?.content02 },
    { title: pageData?.info03, content: pageData?.content03 },
    { title: pageData?.info04, content: pageData?.content04 as string },
  ];
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">
          Propósito do Curso de Sistemas de Informação
        </h1>
        {fieldsets.map((fieldset, index) => (
          <section key={index} className="flex flex-col gap-4">
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{fieldset.title}</legend>
              {fieldset.content?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
            <div className="flex">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-slate-200 text-zinc-900">
                    Editar Conteudo
                  </Button>
                </SheetTrigger>
                <ScrollArea className="h-full">
                  <form onSubmit={handleSubmit(updatePage)}>
                    <SheetContent
                      position="right"
                      size={"default"}
                      className="bg-zinc-800"
                    >
                      <SheetHeader>
                        <SheetTitle>Editar Conteudo</SheetTitle>
                        <SheetDescription>
                          Nessa folha lateral é possível estar editando o
                          conteúdo desta página e lembrando que para efetuar uma
                          quebra de linha, basta utilizar o caractere {'" ; "'}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col gap-4 py-4">
                        <Label htmlFor="newValue" className="">
                          Digite o novo conteúdo
                        </Label>
                        <Textarea
                          value={fieldset.content || "Erro ao trazer conteúdo"}
                        />
                      </div>
                      <SheetFooter>
                        <Button
                          type="submit"
                          className="bg-slate-200 text-zinc-900"
                        >
                          Save changes
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </form>
                </ScrollArea>
              </Sheet>
            </div>
          </section>
        ))}
      </div>
      <div className="flex "></div>
    </section>
  );
};

CoursePurposeAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurposeAdmin;
