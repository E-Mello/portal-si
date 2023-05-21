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
import { merge } from "lodash";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { CoursePurposeUpdateSchema } from "~/server/common/PageSchema";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "~/components/Loading";

const CoursePurposeAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.coursePurpose.getAll.useQuery();

  const { mutateAsync: update } = api.coursePurpose.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.coursePurpose.getAll.invalidate();
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
  } = useForm<z.infer<typeof CoursePurposeUpdateSchema>>({
    resolver: zodResolver(CoursePurposeUpdateSchema),
  });
  const updatePage: SubmitHandler<
    z.infer<typeof CoursePurposeUpdateSchema>
  > = async (data) => {
    const changedFields = {};

    // Iterate over the submitted data and check for changes
    for (const key in data) {
      if (data[key] !== "") {
        changedFields[key] = data[key];
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
      const updatedData = merge({}, pageData, changedFields);
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
    <section className="flex h-full w-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">{pageData?.title}</h1>
        <section className="flex flex-col gap-4">
          <div>
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{pageData?.info}</legend>
              {pageData?.content?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
          </div>
          <div>
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{pageData?.info02}</legend>
              {pageData?.content02?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
          </div>
          <div>
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{pageData?.info03}</legend>
              {pageData?.content03?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
          </div>
          <div>
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{pageData?.info04}</legend>
              {pageData?.content04?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
          </div>
        </section>
        <div className="flex">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={() => {
                  reset();
                }}
                className="bg-slate-200 text-zinc-900"
              >
                Editar Conteudo
              </Button>
            </SheetTrigger>
            <ScrollArea className="h-full">
              <SheetContent
                position="right"
                size={"default"}
                className="bg-zinc-800 text-white"
              >
                <SheetHeader>
                  <SheetTitle>Editar Conteudo</SheetTitle>
                  <SheetDescription>
                    Nessa folha lateral é possível estar editando o conteúdo
                    desta página e lembrando que para efetuar uma quebra de
                    linha, basta utilizar o caractere {'" ; "'}
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(updatePage)}>
                  <div className="flex flex-col gap-4 py-4">
                    <Label htmlFor="newValue" className="">
                      Editar o onteúdo da missao do curso
                    </Label>
                    <Textarea
                      defaultValue={
                        pageData?.content || "Erro ao trazer conteúdo"
                      }
                      {...register("content")}
                    ></Textarea>
                  </div>
                  <div className="flex flex-col gap-4 py-4">
                    <Label htmlFor="newValue" className="">
                      Editar o conteúdo da visao do curso
                    </Label>
                    <Textarea
                      defaultValue={
                        pageData?.content02 || "Erro ao trazer conteúdo"
                      }
                      {...register("content02")}
                    ></Textarea>
                  </div>
                  <div className="flex flex-col gap-4 py-4">
                    <Label htmlFor="newValue" className="">
                      Editar o onteúdo dos valores do curso
                    </Label>
                    <Textarea
                      defaultValue={
                        pageData?.content03 || "Erro ao trazer conteúdo"
                      }
                      {...register("content03")}
                    ></Textarea>
                  </div>
                  <div className="flex flex-col gap-4 py-4">
                    <Label htmlFor="newValue" className="">
                      Editar o onteúdo dos principios do curso
                    </Label>
                    <Textarea
                      defaultValue={
                        pageData?.content04 || "Erro ao trazer conteúdo"
                      }
                      {...register("content04")}
                    ></Textarea>
                  </div>
                  <SheetFooter>
                    <Button
                      type="submit"
                      className="bg-slate-200 text-zinc-900"
                    >
                      {isSubmitting ? <LoadingSpinner /> : "Salvar alteracoes"}
                    </Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </ScrollArea>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

CoursePurposeAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurposeAdmin;
