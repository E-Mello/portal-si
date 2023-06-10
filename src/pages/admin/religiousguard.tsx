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
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { religiousGuardUpdateSchema } from "~/server/common/Schemas";
import Link from "next/link";
import { LoadingSpinner } from "~/components/Loading";

const ReligiousGuardAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.religiousGuard.getAll.useQuery();
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
    formState: { isSubmitting },
  } = useForm<z.infer<typeof religiousGuardUpdateSchema>>({
    resolver: zodResolver(religiousGuardUpdateSchema),
  });

  const updatePage: SubmitHandler<
    z.infer<typeof religiousGuardUpdateSchema>
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
    <section className=" relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2 pl-4">
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <h1 className="pb-4 text-3xl font-bold text-white">
              {pageData.title}
            </h1>
            {pageData.content?.split("+").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <li className="text-white">
              <Link target="_blank" href={pageData.link || ""}>
                <b className="text-blue-900">{pageData.nameLink}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info02 || ""}>
                <b className="text-blue-900">{pageData.content02}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info03 || ""}>
                <b className="text-blue-900">{pageData.content03}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info04 || ""}>
                <b className="text-blue-900">{pageData.content04}</b>
              </Link>
            </li>
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

          <SheetContent
            position="right"
            size={"default"}
            className="flex h-full flex-col gap-4 bg-zinc-800 text-white"
          >
            <form
              className="flex h-full flex-col gap-4 py-4"
              onSubmit={handleSubmit(updatePage)}
            >
              <SheetHeader>
                <SheetTitle>Editar Conteudo</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar editando o conteúdo desta
                  página, lembrando que o caractere `+` serve para quebrar
                  linha, quando o codigo ler, ira substituir por uma quebra de
                  linha
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="scrollbar-thumb-blue-500 scrollbar-track-blue-100  flex h-full w-full">
                <div className="col-span-3 flex h-[110vh] flex-col items-start gap-5">
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
                    className="col-span-3 h-40"
                    {...register("content")}
                    defaultValue={pageData?.content || ""}
                  ></Textarea>
                  <Label htmlFor="link" className="">
                    Alterar a informação primeiro link
                  </Label>
                  <Input
                    id="info"
                    defaultValue={pageData?.link || ""}
                    className="col-span-3"
                    {...register("link")}
                  />
                  <Label htmlFor="link" className="">
                    Alterar o nome do primeiro link
                  </Label>
                  <Input
                    id="nameLink"
                    defaultValue={pageData?.nameLink || ""}
                    className="col-span-3"
                    {...register("nameLink")}
                  />
                  <Label htmlFor="link02" className="">
                    Alterar a informação segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.info02 || ""}
                    className="col-span-3"
                    {...register("info02")}
                  />
                  <Label htmlFor="link02" className="">
                    Alterar nome segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.content02 || ""}
                    className="col-span-3"
                    {...register("content02")}
                  />
                  <Label htmlFor="link02" className="">
                    Alterar a informação segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.info03 || ""}
                    className="col-span-3"
                    {...register("info03")}
                  />
                  <Label htmlFor="link02" className="">
                    Alterar nome segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.content03 || ""}
                    className="col-span-3"
                    {...register("content03")}
                  />
                  <Label htmlFor="link02" className="">
                    Alterar a informação segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.info04 || ""}
                    className="col-span-3"
                    {...register("info04")}
                  />
                  <Label htmlFor="content04" className="">
                    Alterar nome segundo link
                  </Label>
                  <Input
                    id="linkPage"
                    defaultValue={pageData?.info04 || ""}
                    className="col-span-3"
                    {...register("content04")}
                  />
                </div>
              </ScrollArea>
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
        </Sheet>
      </div>
    </section>
  );
};

ReligiousGuardAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ReligiousGuardAdmin;
