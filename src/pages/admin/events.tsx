import { EventsSchema } from "~/server/common/PageSchema";
import { HiOutlineCursorClick, HiOutlinePlus } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
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
          </SheetTrigger>
          <ScrollArea>
            <SheetContent
              position="right"
              size={"default"}
              className="bg-zinc-800"
            >
              <SheetHeader>
                <SheetTitle>Incluir novo evento</SheetTitle>
                <SheetDescription>
                  Nessa folha lateral é possível estar criando um novo evento
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="col-span-3 flex flex-col items-start gap-4">
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
                </div>
              </div>
              <SheetFooter>
                <Button type="submit" className="bg-slate-200 text-zinc-900">
                  Gravar evento
                </Button>
              </SheetFooter>
            </SheetContent>
          </ScrollArea>
        </Sheet>
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
    </section>
  );
};

EventsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EventsAdmin;
