import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { useState, type ReactElement } from "react";
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
import { api } from "~/utils/api";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Events: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.events.getAll.useQuery();

  const [showAllEvents, setShowAllEvents] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(5);

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // Filtra os eventos para mostrar apenas os eventos visíveis
  const eventsToShow = pageData?.slice(0, visibleEvents) || [];

  const handleShowMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 5);
  };

  const handleShowAll = () => {
    setVisibleEvents(pageData?.length || 0);
    setShowAllEvents(true);
  };

  const handleShowLess = () => {
    setVisibleEvents(5);
    setShowAllEvents(false);
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
      {pageData
        .slice(0, showAllEvents ? pageData.length : 5)
        .map((event, index) => (
          <div key={index} className="w-full py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={event.image}
                  alt="Event"
                  className="h-20 w-20 object-cover"
                  width={500}
                  height={500}
                />
                <div>
                  <h3 className="w-full text-xl font-medium">{event.title}</h3>
                  <p className="w-full text-gray-500">{event.info}</p>
                  <h3 className="text-md font-medium text-gray-500">
                    Data do evento:{" "}
                    {event.publicationDay.toLocaleDateString("pt-BR")}
                  </h3>
                  {event.link ? (
                    <span className="flex items-center space-x-2">
                      <HiOutlineCursorClick className="h-5 w-5" />
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Acessar Página do evento
                      </a>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex w-96 items-end justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mr-5 bg-blue-500 text-white hover:bg-blue-600 ">
                      Ver detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-800 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Detalhes do Evento
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Textarea
                        className="col-span-3 flex h-72 cursor-default border-none shadow-none outline-none ring-offset-0 hover:border-none focus:shadow-none focus:outline-none focus:ring-0 focus-visible:border-none"
                        value={event.content}
                        style={{ boxShadow: "none" }}
                        readOnly
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      {!showAllEvents && (
        <div className="flex w-full justify-center">
          <Button
            className="bg-slate-200 text-zinc-900"
            onClick={() => setShowAllEvents(true)}
          >
            Mostrar Mais
          </Button>
        </div>
      )}
      {showAllEvents && (
        <div className="flex w-full justify-center">
          <Button
            className="bg-slate-200 text-zinc-900"
            onClick={() => handleShowLess()}
          >
            Mostrar Menos
          </Button>
        </div>
      )}
    </section>
  );
};

Events.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Events;
