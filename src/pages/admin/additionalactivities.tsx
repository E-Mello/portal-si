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

import {
  type SubmitHandler,
  useForm,
  SubmitErrorHandler,
} from "react-hook-form";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import Link from "next/link";
import { AdditionalActivitiesUpdateSchema } from "~/server/common/PageSchema";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { LoadingSpinner } from "~/components/Loading";

const AdditionalActivitiesAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.additionalActivities.getAll.useQuery();
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
  } = useForm<z.infer<typeof AdditionalActivitiesUpdateSchema>>({
    resolver: zodResolver(AdditionalActivitiesUpdateSchema),
  });

  const updatePage: SubmitHandler<
    z.infer<typeof AdditionalActivitiesUpdateSchema>
  > = async (data) => {
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
    <section className="flex h-full w-full  flex-col items-start justify-center gap-4 bg-zinc-800 py-2 text-gray-300">
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
            <Button className="bg-slate-200 text-zinc-900">
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
                  <Label htmlFor="title" className="">
                    Alterar o titulo da página
                  </Label>
                  <Input
                    id="titlePage"
                    placeholder={pageData?.title}
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

AdditionalActivitiesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AdditionalActivitiesAdmin;
