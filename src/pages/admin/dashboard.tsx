import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { Separator } from "~/components/ui/separator";
import Card from "~/components/Card";

const DashboardCardInfo: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.dashboard.getAll.useQuery();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [newTextValue, setNewTextValue] = useState("");
  //  const updateTextMutation = api.dashboard.updateText.useMutation();

  const handleTextChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewTextValue(event.target.value);
  };

  /*  const handleSaveClick = () => {
    updateTextMutation.mutate({ newTextValue }).then(() => {
      setIsOpen(false);
    });
  };
*/
  const handleCancelClick = () => {
    setIsOpen(false);
    setNewTextValue("");
  };
  return (
    <section className="flex w-full">
      <section
        className={`relative flex h-full w-full flex-col  items-center justify-between gap-10 bg-zinc-800  text-white`}
      >
        <h1 className="text-[2rem] font-bold">Painel de edição dos links</h1>
        <div className="hover:bg-silver flex flex-col justify-between ">
          <div className="flex flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Editar Dashboard</AccordionTrigger>
                <AccordionContent>
                  <section
                    className={`relative flex h-full flex-col items-center justify-between gap-10 bg-zinc-800 text-white`}
                  >
                    <h1 className="text-[2rem] font-bold">
                      Dashboard de Navegacao do Portal do Curso de Sistemas de
                      Informacoes
                    </h1>
                    <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
                      {pageData?.map((group) => (
                        <div key={group.name} className="flex flex-col gap-5">
                          <div>
                            <h1 className="text-lg font-bold">{group.name}</h1>
                          </div>
                          <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
                            {group.cards.map((card) => (
                              <Card
                                key={card.id}
                                name={card.name}
                                Link={card.locale}
                                Info={card.info}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                      <Separator />
                    </div>
                  </section>
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
      </section>
    </section>
  );
};

DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
