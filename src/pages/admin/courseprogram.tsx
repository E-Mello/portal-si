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
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";

const CourseProgramAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.courseprogram.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-10 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className=" text-xl">Ementas e Bibliografias</h1>
        <p className="">
          Aqui você encontra as ementas e bibliografias de todas as disciplinas
          do curso.
        </p>
        <Separator />
        {pageData.map((data) => (
          <div className="flex  gap-4 " key={data.id}>
            <p>
              {data.description} {"=>"}
            </p>
            <p>
              <a href={`${data.link}`} target="_blank" rel="noreferrer">
                Link para visualização
              </a>
            </p>
          </div>
        ))}
      </div>
      <div className="flex ">
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
                  Nessa folha lateral é possível estar editando o conteúdo desta
                  página
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
                  />
                  <Label htmlFor="oldValue" className="">
                    Informação atual
                  </Label>
                  <Textarea value={"oi"} disabled />
                  <Label htmlFor="newValue" className="">
                    Digite o novo conteúdo a ser apresentado no corpo da página
                  </Label>
                  <Textarea />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
                  Save changes
                </Button>
              </SheetFooter>
            </SheetContent>
          </ScrollArea>
        </Sheet>
      </div>
    </section>
  );
};

CourseProgramAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CourseProgramAdmin;
