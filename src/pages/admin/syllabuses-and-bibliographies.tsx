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
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { SyllabusesAndBibliographiesUpdateSchema } from "~/server/common/Schemas";
import { useState, type ReactElement } from "react";

import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import SyncLoader from "react-spinners/SyncLoader";

const SyllabusesAndBibliographiesAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.syllabusesAndBibliographies.getAll.useQuery();

  const { mutateAsync: update } =
    api.syllabusesAndBibliographies.update.useMutation({
      onSuccess: () => {
        // show success toast
        void utils.syllabusesAndBibliographies.getAll.invalidate();
        reset();
        setOpen(false);
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
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof SyllabusesAndBibliographiesUpdateSchema>>({
    resolver: zodResolver(SyllabusesAndBibliographiesUpdateSchema),
  });
  const updatePage: SubmitHandler<
    z.infer<typeof SyllabusesAndBibliographiesUpdateSchema>
  > = async (data) => {
    // Check if pageData is defined
    if (!pageData) {
      // Handle the case when pageData is undefined
      return;
    }

    // Check if the data is the same as the content in the database
    if (
      data.title === pageData[0]?.title &&
      data.info === pageData[0]?.info &&
      data.content02 === pageData[0]?.content02 &&
      data.info02 === pageData[0]?.info02 &&
      data.content03 === pageData[0]?.content03 &&
      data.info03 === pageData[0]?.info03
    ) {
      toast.info("Não há alterações a serem feitas.", {
        autoClose: 2000,
      });
      return;
    }
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
    <section className="flex h-full w-full flex-col items-start justify-center gap-10 pl-4 pt-4">
      <div className="flex flex-col gap-4">
        <legend className="text-xl">{pageData[0]?.title}</legend>
        <p className="">{pageData[0]?.info}</p>
        <div className="flex h-full w-full flex-col gap-2">
          <legend className="text-xl">{pageData[0]?.content02}</legend>
          <Link
            target="_blank"
            href={pageData[0]?.info02 || "/"}
            className="flex "
          >
            <span>Acessar</span>
            <LinkIcon />
          </Link>
        </div>

        <div className="flex h-full w-full flex-col gap-2">
          <legend className="text-xl">{pageData[0]?.content03}</legend>
          <Link
            target="_blank"
            href={pageData[0]?.info03 || "/"}
            className="flex gap-2"
          >
            <span className="flex">Acessar</span>
            <LinkIcon />
          </Link>
        </div>
      </div>
      <div className="flex">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={() => {
                setOpen(true);
                reset();
              }}
              className="bg-slate-200 text-zinc-800"
            >
              Editar Conteudo
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
                página.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(updatePage)}>
              <section>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="infoEmenta" className="">
                    Editar titulo da pagina
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.title || "Erro ao trazer conteúdo"
                    }
                    {...register("title")}
                  />
                </div>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="infoEmenta" className="">
                    Editar informacao da pagina
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.info || "Erro ao trazer conteúdo"
                    }
                    {...register("info")}
                  />
                </div>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="infoEmenta" className="">
                    Editar informacao da ementa
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.content02 || "Erro ao trazer conteúdo"
                    }
                    {...register("content02")}
                  />
                </div>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="linkEmenta" className="">
                    Editar o link de acesso a ementa
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.info02 || "Erro ao trazer conteúdo"
                    }
                    {...register("info02")}
                  />
                </div>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="infoMatriz" className="">
                    Editar a informacao da matriz curricular
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.content03 || "Erro ao trazer conteúdo"
                    }
                    {...register("content03")}
                  />
                </div>
                <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="linkMatriz" className="">
                    Editar o link de acesso a matriz curricular
                  </Label>
                  <Input
                    defaultValue={
                      pageData[0]?.info03 || "Erro ao trazer conteúdo"
                    }
                    {...register("info03")}
                  />
                </div>
              </section>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
                  {isSubmitting ? <SyncLoader /> : "Salvar"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

SyllabusesAndBibliographiesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default SyllabusesAndBibliographiesAdmin;
