import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";

const DashboardCardInfo: NextPageWithLayout = () => {
  return (
    <section className="flex w-full">
      <section
        className={`relative flex h-full w-full flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
      >
        <h1 className="text-[2rem] font-bold">Painel de edição dos links</h1>
        <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
          <div className="flex flex-col gap-5">
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Páginas relacionadas ao Curso
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-5">
                      <div>
                        <h1 className="text-lg font-bold">
                          Paginas relacionadas ao Curso
                        </h1>
                      </div>
                      <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Paginas relacionadas a Estrutura Curricular
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-5">
                      <div>
                        <h1 className="text-lg font-bold">
                          Paginas relacionadas a Estrutura Curricular
                        </h1>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Paginas relacionadas aos Eventos do Curso
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <h1 className="text-lg font-bold">
                        Paginas relacionadas aos Eventos do Curso
                      </h1>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Paginas relacionadas as Regulamentacoes Internas
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <h1 className="text-lg font-bold">
                        Paginas relacionadas as Regulamentacoes Internas
                      </h1>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Paginas relacionadas aos projetos do curso
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <h1 className="text-lg font-bold">
                        Paginas relacionadas aos projetos do curso
                      </h1>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Paginas relacionadas as Publicacoes do curso
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <h1 className="text-lg font-bold">
                        Paginas relacionadas as Publicacoes do curso
                      </h1>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
