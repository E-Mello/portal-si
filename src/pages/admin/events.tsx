<<<<<<< HEAD
=======
import { EventsSchema } from "~/server/common/PageSchema";
import { HiOutlineCursorClick, HiOutlinePlus } from "react-icons/hi";
>>>>>>> dev
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

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
=======
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import Link from "next/link";
>>>>>>> dev
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
<<<<<<< HEAD

const DashboardCardInfo: NextPageWithLayout = () => {
  return (
    <section className="flex h-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <div className="flex flex-col ">
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
            <br /> Processamento paralelo;f
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
      <div className="flex ">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-slate-200 text-zinc-900">
              Editar Conteudo da página
            </Button>
=======
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const EventsAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.events.getAll.useQuery();
  const { mutateAsync: update } = api.events.update.useMutation({
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
  } = useForm<z.infer<typeof EventsSchema>>({
    resolver: zodResolver(EventsSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof EventsSchema>> = async (
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
    <section className="flex w-full flex-col items-center gap-8 pl-4 pt-4">
      <h1 className="flex pb-4 text-xl">Eventos do curso</h1>
      <section className="flex w-full">
        <Sheet>
          <SheetTrigger asChild>
            <div className=" group flex w-full items-center justify-center rounded-xl  border p-2 hover:outline-double ">
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
            </div>
>>>>>>> dev
          </SheetTrigger>
          <ScrollArea>
            <SheetContent
              position="right"
              size={"default"}
              className="bg-zinc-800"
            >
              <SheetHeader>
<<<<<<< HEAD
                <SheetTitle>Editar Conteudo</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar editando o conteúdo desta
                  página
=======
                <SheetTitle>Incluir novo evento</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar criando um novo evento
>>>>>>> dev
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="col-span-3 flex flex-col items-start gap-4">
<<<<<<< HEAD
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
=======
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="title" className="">
                      Titulo do evento
                    </Label>
                    <Input id="titlePage" className="col-span-3" />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="title" className="">
                      Informacao do evento
                    </Label>
                    <Input id="titlePage" className="col-span-3" />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="title" className="">
                      Link da imagem do evento
                    </Label>
                    <Input id="titlePage" className="col-span-3" />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="title" className="">
                      Data de publicacao
                    </Label>
                    <Input id="titlePage" className="col-span-3" type="date" />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="oldValue" className="">
                      Conteudo do evento
                    </Label>
                    <Textarea />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="title" className="">
                      Inserir o link de acesso ao evento (opcional)
                    </Label>
                    <Input id="titlePage" className="col-span-3" />
                  </div>
>>>>>>> dev
                </div>
              </div>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
<<<<<<< HEAD
                  Save changes
=======
                  Gravar evento
>>>>>>> dev
                </Button>
              </SheetFooter>
            </SheetContent>
          </ScrollArea>
        </Sheet>
<<<<<<< HEAD
      </div>
=======
      </section>
      {pageData?.map((event) => (
        <div className="flex w-full flex-col items-center pb-4" key={event.id}>
          <div className="flex flex-col gap-4">
            <span className="flex">{event.title}</span>
            <span className="flex"> {event.info}</span>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div className="flex flex-col">
                <Image
                  src={testIMG}
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
            <div className="flex items-start justify-start">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-slate-200 text-zinc-900">
                    Editar evento
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
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="title" className="">
                            Alterar o titulo da página
                          </Label>
                          <Input
                            id="titlePage"
                            placeholder={event.title}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="title" className="">
                            Alterar a informacao do evento
                          </Label>
                          <Input
                            id="titlePage"
                            placeholder={event.info}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="title" className="">
                            Alterar o link da imagem do evento
                          </Label>
                          <Input
                            id="titlePage"
                            placeholder={event.image as string}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="title" className="">
                            Alterar a data de publicacao
                          </Label>
                          <Input
                            id="titlePage"
                            className="col-span-3"
                            type="date"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="oldValue" className="">
                            Conteudo do evento
                          </Label>
                          <Textarea placeholder={event.content} />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <Label htmlFor="title" className="">
                            Alterar o link de acesso ao evento (opcional)
                          </Label>
                          <Input
                            id="titlePage"
                            placeholder={
                              event.link === null ? "Nenhum link" : event.link
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
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
                </ScrollArea>
              </Sheet>
            </div>
          </div>
        </div>
      ))}
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
EventsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EventsAdmin;
>>>>>>> dev
