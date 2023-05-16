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
import type { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PageViewSchema } from "~/server/common/PageSchema";
import { type z } from "zod";

const AboutCourseAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.aboutcourse.getAll.useQuery();

  const { mutateAsync: update } = api.aboutcourse.update.useMutation({
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

  return (
    <section className="flex h-full flex-col items-start justify-center gap-4 bg-zinc-800 pl-4 pt-4">
      {pageData && (
        <div>
          <div className="flex flex-col ">
            <h1 className=" pb-4 text-xl">{pageData.title}</h1>
            <div className="flex  w-full flex-col pr-10">
              {pageData.content.split(/[;:]/).map((item, index) => (
                <p key={index}>{item.trim()}</p>
              ))}
            </div>
          </div>
          <div className="flex pt-2 ">
            <form onSubmit={handleSubmit(updatePage)}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-slate-200 text-zinc-900">
                    Editar Conteudo da página
                  </Button>
                </SheetTrigger>
                <ScrollArea>
                  <SheetContent
                    position="right"
                    size={"default"}
                    className="bg-zinc-800"
                  >
                    <SheetHeader>
                      <SheetTitle>Editar Conteudo</SheetTitle>
                      <SheetDescription>
                        Nessa folha lateral é possível estar editando o conteúdo
                        desta página
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="col-span-3 flex flex-col items-start gap-4">
                        <Label htmlFor="title" className="">
                          Alterar o titulo da página
                        </Label>
                        <Input
                          id="titlePage"
                          placeholder="Atividades Complementares"
                          className="col-span-3"
                          {...register("title")}
                        />
                        <Label htmlFor="newValue" className="">
                          Digite o novo conteúdo a ser apresentado no corpo da
                          página
                        </Label>
                        <Textarea {...register("content")}></Textarea>
                      </div>
                    </div>
                    <SheetFooter>
                      <input
                        type="submit"
                        className="bg-slate-200 text-zinc-900"
                      >
                        Save changes
                      </input>
                    </SheetFooter>
                  </SheetContent>
                </ScrollArea>
              </Sheet>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

AboutCourseAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourseAdmin;
