import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";
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
import { EventsSchema } from "~/server/common/Schemas";
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
    </section>
  );
};

Events.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Events;
