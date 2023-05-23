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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AboutCourseUpdateSchema } from "~/server/common/PageSchema";
import { type z } from "zod";
import { LoadingSpinner } from "~/components/Loading";

const AboutCourseAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.aboutcourse.getAll.useQuery();

  const { mutateAsync: update } = api.aboutcourse.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.aboutcourse.getAll.invalidate();
      reset();
      setOpen(false);
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      toast.error("Falha ao atualizar o conteúdo da página.", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof AboutCourseUpdateSchema>>({
    resolver: zodResolver(AboutCourseUpdateSchema),
  });
  const updatePage: SubmitHandler<
    z.infer<typeof AboutCourseUpdateSchema>
  > = async (data) => {
    const changedFields: { [key: string]: string | undefined } = {};

    // Iterate over the submitted data and check for changes
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
        changedFields[key as keyof typeof data] = value;
      }
    });

    if (Object.keys(changedFields).length === 0) {
      // No changes detected, show a message or handle it as per your requirement
      toast.info("No changes made.", {
        autoClose: 2000,
      });
      return;
    }

    console.log("Changed fields:", changedFields);

    try {
      const updatedData = {
        ...pageData,
        ...changedFields,
        content:
          changedFields.content !== null ? changedFields.content : undefined,
      };
      const res = await update(updatedData);
      console.log("res", res);
      reset();
    } catch (error) {
      // Handle error
      console.error(error);
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
    <section className="flex h-full flex-col items-start justify-center gap-4 bg-zinc-800 pl-4 pt-4">
      {pageData && (
        <div className="flex flex-col ">
          <h1 className=" pb-4 text-xl">{pageData.title}</h1>
          <div className="flex  w-full flex-col pr-10">
            {pageData?.content?.split(/[;:]/).map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex pl-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-expanded={open} className="bg-slate-200 text-zinc-900">
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
                    desta página, lembrando que o caractere `:` e `;` serve para
                    quebrar linha, quando o codigo ler, ira substituir por uma
                    quebra de linha
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
                    defaultValue={pageData?.title || ""}
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

AboutCourseAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourseAdmin;
