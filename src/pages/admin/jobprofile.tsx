/* eslint-disable @typescript-eslint/no-misused-promises */
import { JobProfileSchema } from "~/server/common/PageSchema";
import { useState, type ReactElement } from "react";
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
import { LoadingSpinner } from "~/components/Loading";
import type { NextPageWithLayout } from "~/types/layout";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { merge } from "lodash";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const JobProfileAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.jobProfile.getAll.useQuery();

  const { mutateAsync: update } = api.jobProfile.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.jobProfile.getAll.invalidate();
      reset();
      setOpen(false);
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      // show error toast
      toast.error("Falha ao atualizar conteúdo da página.", {
        autoClose: 2000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof JobProfileSchema>>({
    resolver: zodResolver(JobProfileSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof JobProfileSchema>> = async (
    data
  ) => {
    const changedFields: { [key: string]: string | number | undefined } = {};

    // Iterate over the submitted data and check for changes
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        data[key as keyof typeof data] !== "" &&
        data[key as keyof typeof data] !== undefined
      ) {
        changedFields[key as keyof typeof changedFields] =
          data[key as keyof typeof data];
      }
    }

    if (Object.keys(changedFields).length === 0) {
      // No changes detected, show a message or handle it as per your requirement
      toast.info("No changes made.", {
        autoClose: 2000,
      });
      return;
    }

    console.log("Changed fields:", changedFields);

    try {
      const updatedData: {
        content: string;
        link: string;
        id?: number | undefined;
        title?: string | undefined;
        nameLink?: string | undefined;
      } = {
        ...pageData,
        ...changedFields,
        content:
          typeof changedFields.content === "string"
            ? changedFields.content
            : changedFields.content !== null &&
              changedFields.content !== undefined
            ? changedFields.content.toString()
            : "",
        link:
          changedFields.link !== null && changedFields.link !== undefined
            ? changedFields.link.toString()
            : "",
        nameLink:
          changedFields.nameLink !== null &&
          changedFields.nameLink !== undefined
            ? changedFields.nameLink.toString()
            : undefined,
      };

      if (changedFields.content === null) {
        updatedData.content = ""; // Set it to an empty string or handle it as per your requirement
      }
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
    <section className="flex h-full w-full flex-col items-start justify-center gap-10 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">{pageData?.title}</h1>
        <span>
          {pageData?.content?.split("+").map((item, index) => (
            <p key={index}>{item.trim()}</p>
          ))}
        </span>
      </div>
      <div className="flex ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={() => {
                reset();
              }}
              className="bg-slate-200 text-zinc-900"
            >
              Editar Conteudo da página
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
                Nessa folha lateral é possível estar editando o conteúdo desta
                página, lembrando que para pular uma linha é necessário usar o
                símbolo +
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(updatePage)}>
              <div className="flex flex-col gap-4 py-4">
                <div className="col-span-3 flex flex-col items-start gap-4">
                  <Label htmlFor="title" className="">
                    Alterar o titulo da página
                  </Label>
                  <Input
                    id="titlePage"
                    defaultValue={
                      pageData?.title ||
                      "Não foi possível carregar o conteúdo do banco de dados"
                    }
                    {...register("title")}
                    className="col-span-3"
                  />
                  <Label htmlFor="newValue" className="">
                    Digite o novo conteúdo a ser apresentado no corpo da página
                  </Label>
                  <ScrollArea className="h-full w-full">
                    <Textarea
                      className="h-[50vh] w-full"
                      defaultValue={
                        pageData?.content ||
                        "Não foi possível carregar o conteúdo do banco de dados"
                      }
                      {...register("content")}
                    ></Textarea>
                  </ScrollArea>
                </div>
              </div>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
                  {isSubmitting ? <LoadingSpinner /> : "Salvar alteracoes"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

JobProfileAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default JobProfileAdmin;
