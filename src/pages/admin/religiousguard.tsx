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
const ReligiousGuardAdmin: NextPageWithLayout = () => {
  return (
    <section className=" relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2 pl-4">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">Guarda Religiosa</h1>
        <p className="text-white">
          A Instrução Normativa 01/2018 estabelece normas para a realização do
          regime de guarda religiosa e Regulamenta o art. 2o da{" "}
          <a href="http://www.al.mt.gov.br/storage/webdisco/leis/lei-9274-2009.pdf">
            <b className="text-blue-900">Lei Estadual n. 9.274</b>
          </a>
          , de 16 de dezembro de 2009, no âmbito do curso de Bacharelado em
          Sistemas de Informação do Campus Universitário de Sinop, da
          Universidade do Estado de Mato Grosso.
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1LrTihI7WYStTvcEpVUhQKUuqQlMs3Jb8/view?usp=sharing">
            <b className="text-blue-900"> Instrução Normativa 01/2018 </b>
          </a>
        </li>
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1LsQ6Fds0vRHt9EEbIOHlJ_ebcfqFVyGN/view?usp=sharing">
            <b className="text-blue-900">
              {" "}
              Instrução Normativa 01/2018 - Anexo I
            </b>
          </a>
        </li>
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1Lu4VhS68y80V09rsgLTpj7yrxEFB-KLc/view?usp=sharing">
            <b className="text-blue-900">
              {" "}
              Instrução Normativa 01/2018 - Anexo II{" "}
            </b>
          </a>
        </li>
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
ReligiousGuardAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ReligiousGuardAdmin;
>>>>>>> dev
