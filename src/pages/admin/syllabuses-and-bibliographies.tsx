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

type pageData = {
  id: number;
  title: string;
  info: string | null;
  info02: string | null; // Add this line
  content02: string | null; // Add this line
  info03: string | null; // Add this line
  content03: string | null; // Add this line
};

const SyllabusesAndBibliographiesAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.syllabusesAndBibliographies.getAll.useQuery();

  const { mutateAsync: update } =
    api.syllabusesAndBibliographies.update.useMutation({
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
    {
      nameLink: pageData.info02 as string,
      link: pageData.content02 as string,
    },
    {
      nameLink: pageData.info03 as string,
      link: pageData.content03 as string,
    },
  ];
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-10 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">
          {pageData?.title || "Erro ao buscar as informações do banco de dados"}
        </h1>
        <p className="pl-4 text-xl">
          {pageData?.info || "Erro ao buscar as informações do banco de dados"}
        </p>
        {fieldsets.map((fieldset, index) => (
          <section key={index} className="flex flex-col gap-4">
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">
                {fieldset.nameLink ||
                  "Erro ao buscar as informações do banco de dados"}
              </legend>
              {fieldset.content?.split(";").map((item, key) => (
                <p key={key}>
                  {item.trim() ||
                    "Erro ao buscar as informações do banco de dados"}
                </p>
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
    </section>
  );
};

SyllabusesAndBibliographiesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default SyllabusesAndBibliographiesAdmin;
