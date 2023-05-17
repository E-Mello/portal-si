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

<<<<<<< HEAD
=======
import { type SubmitHandler, useForm } from "react-hook-form";

>>>>>>> dev
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { type ReactElement } from "react";
import { Textarea } from "~/components/ui/textarea";
<<<<<<< HEAD

const DashboardCardInfo: NextPageWithLayout = () => {
  return (
    <section className="flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Atividades Complementares
        </h1>
        <p className="text-white">
          Os acadêmicos matriculados no curso de Bacharelado em Sistemas de
          Informação deverão cumprir a carga horária de 150 horas em atividades
          complementares que envolvam atividades em ensino, pesquisa ou
          extensão, devendo ser desenvolvidas pelo acadêmico durante a
          integralização do Curso. As Atividades Complementares são de total
          responsabilidade dos acadêmicos, cabendo à Coordenação do Curso cobrar
          o cumprimento da carga horária no decorrer do curso. As Atividades
          Complementares são componentes curriculares enriquecedores e
          implementadores do próprio perfil do formando e deverão possibilitar o
          desenvolvimento de habilidades, conhecimentos, competências e atitudes
          do aluno, inclusive as adquiridas fora do ambiente acadêmico, que
          serão reconhecidas mediante processo de avaliação. <br /> <br /> As
          Atividades Complementares podem incluir atividades desenvolvidas na
          própria Instituição ou em outras instituições e variados ambientes
          sociais, técnico-científicos ou profissionais de formação
          profissional, incluindo experiências de trabalho, estágios não
          obrigatórios, extensão universitária, iniciação científica,
          participação em eventos técnico-científicos, publicações científicas,
          programas de monitoria e tutoria, disciplinas de outras áreas,
          representação discente em comissões e comitês, participação em
          empresas juniores, incubadoras de empresas ou outras atividades de
          empreendedorismo e inovação. As Atividades Complementares devem ser
          realizadas em área específica ou afim do curso e/ou relacionados aos
          temas transversais, sendo desenvolvidas na instituição ou fora dela.
          As normas para o cumprimento das Atividades Complementares do Curso de
          Bacharelado em Sistemas de Informação do Campus Universitário de
          Sinop, estão Regulamentadas pela{" "}
          <a href="http://www.unemat.br/resolucoes/resolucoes/conepe/1748_res_conepe_297_2004.pdf">
            <b className="text-blue-900">RESOLUÇÃO Nº 297/2004 - CONEPE</b>
          </a>{" "}
          de 14 de dezembro de 2004 e as normas internas, a serem definidas pelo
          NDE, coordenação de curso e docentes.
        </p>
      </div>
      <div className="flex pl-4">
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
=======
import { api } from "~/utils/api";
import Link from "next/link";
import { AdditionalActivitiesSchema } from "~/server/common/PageSchema";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const AdditionalActivitiesAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.additionalActivities.getAll.useQuery();
  const { mutateAsync: update } = api.additionalActivities.update.useMutation({
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
  } = useForm<z.infer<typeof AdditionalActivitiesSchema>>({
    resolver: zodResolver(AdditionalActivitiesSchema),
  });
  const updatePage: SubmitHandler<
    z.infer<typeof AdditionalActivitiesSchema>
  > = async (data) => {
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
    <section className="flex h-full w-full  flex-col items-start justify-center gap-4 bg-zinc-800 py-2">
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
            <Link className="text-blue-900" href={pageData.link || "/"}>
              <b>{pageData.nameLink}</b>
            </Link>
          </div>
        )}
      </div>

      <div className="flex pl-4">
        <form
          className="flex flex-col gap-4 py-4"
          // onSubmit={handleSubmit(updatePage)}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-slate-200 text-zinc-900">
                Editar Conteudo da página
              </Button>
            </SheetTrigger>

            <ScrollArea className="h-full ">
              <SheetContent
                position="right"
                size={"default"}
                className="flex h-full flex-col gap-4 bg-zinc-800"
              >
                <SheetHeader>
                  <SheetTitle>Editar Conteudo</SheetTitle>
                  <SheetDescription>
                    Nessa folha lateral é possível estar editando o conteúdo
                    desta página
                  </SheetDescription>
                </SheetHeader>

>>>>>>> dev
                <div className="col-span-3 flex flex-col items-start gap-4">
                  <Label htmlFor="title" className="">
                    Alterar o titulo da página
                  </Label>
                  <Input
                    id="titlePage"
<<<<<<< HEAD
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
                <Label htmlFor="link" className="">
                  Alterar o link de acesso a resolução do CONEPE
                </Label>
                <Input id="linkPage" placeholder="" className="col-span-3" />
                <Label htmlFor="link" className="">
                  Alterar o nome do link
                </Label>
                <Input id="nameLink" placeholder="" className="col-span-3" />
              </div>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
                  Save changes
                </Button>
              </SheetFooter>
            </SheetContent>
          </ScrollArea>
        </Sheet>
=======
                    placeholder={pageData?.title}
                    className="col-span-3"
                    {...register("title", { required: true })}
                  />
                  <Label htmlFor="newValue" className="">
                    Digite o novo conteúdo a ser apresentado no corpo da página
                  </Label>
                  <Textarea
                    className="col-span-3 h-64"
                    {...register("content")}
                  />
                </div>
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

                <SheetFooter className="">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-200 text-zinc-900"
                  >
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </ScrollArea>
          </Sheet>
        </form>
>>>>>>> dev
      </div>
    </section>
  );
};

<<<<<<< HEAD
DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
=======
AdditionalActivitiesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AdditionalActivitiesAdmin;
>>>>>>> dev
