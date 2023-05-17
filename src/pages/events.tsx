import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";
<<<<<<< HEAD

const AboutCourse: NextPageWithLayout = () => {
  return (
    <section className="relative flex w-full flex-col items-start justify-center gap-4 py-2 pl-4 pt-10">
      <div>
        <h1 className=" pb-4 text-xl">Sobre o curso</h1>
        <div className="flex  w-full flex-col pr-10">
          <p className="pb-4">
            O curso de de Bacharelado em Sistemas de informação (BSI) é
            considerado de atividade-fim, que visa a formação de profissionais
            em computação ou informática com intuito principal de automatizar
            sistemas para gerência de informação nas organizações. A área de
            Sistemas de Informação lida com sistemas complexos em empresas e
            governo, com a necessidade de conhecimentos técnicos e
            organizacionais em seu projeto, desenvolvimento e gerenciamento para
            trazer suporte na tomada de decisão e nas estratégias das
            organizações. Os Sistemas de Informação e as Tecnologias da
            Informação e Comunicação nas organizações destacam-se pelo uso
            eficiente de recursos oferecendo um impacto significativo na
            produtividade e na competitividade das empresas nacionais e
            internacionais, em um mundo globalizado e competitivo. Em Sistemas
            de Informação abrange-se em sua formação a aquisição de conhecimento
            teórico e prático, de técnicas e ferramentas computacionais
            necessárias para desenvolver, selecionar, aplicar e gerir soluções
            de forma a atender às necessidades da sociedade. Os conhecimentos
            adquiridos na formação do Bacharelado em Sistemas de informação
            estão vinculados principalmente as áreas de Ciência da Computação,
            Matemática e Administração. O curso visa uma formação sólida na área
            da computação, com uma grande diversidade de conteúdos como:
            <br />
            <br /> Algoritmos e complexidade;
            <br /> Arquitetura e organização de computadores;
            <br /> Banco de dados;
            <br /> Circuitos digitais;
            <br /> Computação gráfica;
            <br /> Engenharia de software;
            <br /> Estruturas de dados;
            <br /> Fundamentos de linguagens;
            <br /> Inteligência artificial e computacional;
            <br /> Interação humano-computador;
            <br /> Linguagens formais e autômatos;
            <br /> Lógica;
            <br /> Sistemas multimídias e hipermídias;
            <br /> Processamento de imagens;
            <br /> Processamento distribuído;
            <br /> Processamento paralelo;
            <br /> Programação;
            <br /> Realidade virtual;
            <br /> Redes de computadores;
            <br /> Robótica;
            <br /> Segurança;
            <br /> Sistemas embarcados;
            <br /> Sistemas operacionais;
            <br /> Entre outros..
          </p>
        </div>
      </div>
=======
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sheet, Link } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlinePlus, HiOutlineCursorClick } from "react-icons/hi";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "~/components/ui/sheet";
import { Textarea } from "~/components/ui/textarea";
import { EventsSchema } from "~/server/common/PageSchema";
import { api } from "~/utils/api";
import Image from "next/image";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Events: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.events.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex w-full flex-col items-center gap-8 pl-4 pt-4">
      <h1 className="flex pb-4 text-xl">Eventos do curso</h1>
      {pageData?.map((event) => (
        <div className="flex w-full flex-col items-center pb-4" key={event.id}>
          <div className="flex flex-col gap-4">
            <span className="flex">{event.title}</span>
            <span className="flex"> {event.info}</span>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div className="flex flex-col">
                <Image
                  src={event.image || testIMG}
                  alt={"Imagem de Teste"}
                  width={500}
                  height={500}
                />
                <span className="flex flex-row items-end justify-end">
                  15/05/2023
                </span>
              </div>
              <p>{event.content}</p>
              <div className="flex w-full flex-row items-start justify-start pb-4">
                {event.link ? (
                  <span className="flex items-center justify-center gap-2 text-cyan-50 hover:cursor-pointer hover:text-red-500">
                    Acessar evento
                    <HiOutlineCursorClick className="flex h-5 w-5" />
                    <Link href={event.link} className="flex" target="_blank" />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
>>>>>>> dev
    </section>
  );
};

<<<<<<< HEAD
AboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourse;
=======
Events.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Events;
>>>>>>> dev
