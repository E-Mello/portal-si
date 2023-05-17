import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
<<<<<<< HEAD
=======
import { type SubmitHandler, useForm } from "react-hook-form";
>>>>>>> dev

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
<<<<<<< HEAD
import type { ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";

const Values = [
  {
    name: "Respeito",
  },
  {
    name: "Democracia",
  },
  {
    name: "Comprometimento",
  },
  {
    name: "Humanismo",
  },
  {
    name: "Inovação",
  },
  {
    name: "Sustentabilidade",
  },
];

const Principles = [
  {
    name: "Honrar os critérios éticos e de cidadania",
  },
  {
    name: "Transparência em todas atividades e processos",
  },
  {
    name: "Garantir a aceitação do pluralismo de ideias e saberes",
  },
  {
    name: "Respeitar e priorizar decisões colegiadas",
  },
  {
    name: "Excelência na formação de profissionais e cidadãos responsáveis",
  },
  {
    name: "Compromisso no desenvolvimento e projetos em prol da sociedade",
  },
  {
    name: "Valorização humana e profissional",
  },
  {
    name: "Justiça, liberdade, igualdade e cidadania",
  },
  {
    name: "Priorizar e incentivar a criatividade e o empreendedorismo na comunidade acadêmica",
  },
  {
    name: "Promoção da ciência e tecnologia na sociedade",
  },
  {
    name: "Respeito ao meio ambiente e a sustentabilidade na execução das atividades e projetos acadêmicos",
  },
];

const DashboardCardInfo: NextPageWithLayout = () => {
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">
          Propósito do Curso de Sistemas de Informação
        </h1>
        <div className=" justify-start border pb-2 pl-4 pt-2">
          <h2 className="">MISSÃO</h2>
          <p>
            Contribuir com a sociedade na formação de profissionais com
            habilidades técnicas, inovadoras, social, ética e humanística no que
            tange a gestão de tecnologia e informática para a construção de uma
            sociedade democrática, participativa e sustentável.
          </p>
        </div>
        <div className="justify-start border pb-2 pl-4 pt-2">
          <h2>VISÃO DE FUTURO</h2>
          <p>
            Ser reconhecido com excelência no ensino, pesquisa e extensão na
            ciência e tecnologia (C&T) pela sociedade.
          </p>
        </div>
        <div className="flex justify-start gap-12 flex-col">
          <div className="flex w-1/2 flex-col">
            <table className="flex flex-col border">
              <thead className="gap-4 ">
                <tr className="flex ">
                  <th className="">PRINCÍPIOS</th>
                </tr>
              </thead>
              <tbody className="">
                {Principles.map((value, index) => (
                  <tr key={index} className="flex border">
                    <td className=" text-left">{value.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-1/5 flex-col justify-center">
            <table className="flex flex-col border ">
              <thead className="gap-4 ">
                <tr className="flex">
                  <th className="">VALORES</th>
                </tr>
              </thead>
              <tbody className="">
                {Values.map((value, index) => (
                  <tr key={index} className="flex border">
                    <td className=" text-left">{value.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
=======
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
        <h1 className="pl-4 text-xl">{pageData?.title}</h1>
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
                  {/* <form onSubmit={handleSubmit(updatePage)}> */}
                  <form>
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
>>>>>>> dev
    </section>
  );
};

<<<<<<< HEAD
DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
=======
CoursePurposeAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurposeAdmin;
>>>>>>> dev
