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
import { Textarea } from "~/components/ui/textarea";

const JobProfileAdmin: NextPageWithLayout = () => {
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-10 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">
          Perfil Profissional de um profissional de Sistemas de Informação
        </h1>
        <p className="pl-4">
          O bacharel em Sistemas de Informação (BSI) é uma evolução natural do
          profissional de tecnologia da informação, o curso proporciona o
          alinhamento dos conhecimentos em computação e o conhecimento em
          gestão. Sua formação é focada no desenvolvimento, manutenção e gestão
          de sistemas de informação dos dados de uma organização, seja para
          capturar, armazenar ou processar estes dados.
        </p>
        <p className="pl-4">
          O profissional formado no curso de Bacharelado em Sistemas de
          Informação poderá atuar em empresas de diferentes ramos de atividades,
          no setor específico de computação e/ou desenvolvimento, implementação
          e gerenciamento de sistemas computacionais, desempenhando as funções
          de analista de sistemas, projetista de sistemas, analista de suporte
          de sistemas, de chefia intermediária e superior.
        </p>
        <p className="pl-4">
          Esses profissionais atuam em empresas da área computacional que
          prestam serviços e produtos, como exemplo: empresas de consultorias e
          em empresas dedicadas ao desenvolvimento tanto de hardware quanto de
          software. Além disso, o profissional poderá atuar em pesquisa
          científica, bem como ser capaz de inovar, planejar e gerenciar a
          infraestrutura de tecnologia da informação em organizações.
        </p>
        <p className="pl-4">
          Esses profissionais atuam em empresas da área computacional que
          prestam serviços e produtos, como exemplo: empresas de consultorias e
          em empresas dedicadas ao desenvolvimento tanto de hardware quanto de
          software. Além disso, o profissional poderá atuar em pesquisa
          científica, bem como ser capaz de inovar, planejar e gerenciar a
          infraestrutura de tecnologia da informação em organizações.
        </p>
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

JobProfileAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default JobProfileAdmin;
