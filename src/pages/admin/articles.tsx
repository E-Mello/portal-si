import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Card from "~/components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/utils/cn";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { CardUpdateSchema } from "~/server/common/CardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { PageViewSchema, PublicationsSchema } from "~/server/common/PageSchema";

const ArticlesAdmin: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.articles.getAll.useQuery();

  const { mutateAsync: update } = api.aboutcourse.update.useMutation({
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
  } = useForm<z.infer<typeof PublicationsSchema>>({
    resolver: zodResolver(PublicationsSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof PublicationsSchema>> = async (
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
    <section
      className={`flex h-full w-full flex-col items-center justify-between pl-4 pt-10 text-white`}
    >
      <div className="flex h-full w-full justify-start ">
        <div className="flex gap-5 pl-2">
          <h1 className="text-3xl font-bold">
            TCC{"'"}s (Trabalhos de conclusao de curso)
          </h1>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-start pt-6">
        {pageData.map((data) => (
          <div
            key={data.id}
            className={`group flex  flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
          >
            <span className={`text-xl `}>{data.title.toUpperCase()}</span>
            <span className={`flex text-start  text-sm `}>{data.resume}</span>
            <span className={`text-start text-sm`}>
              Nome do estudante: {data.author}
            </span>
            <span className={`text-start text-sm`}>
              <Link
                className="cursor-pointer hover:text-red-500"
                href={data.link}
                target="_blank"
              >
                {data.linkName}
              </Link>
            </span>
          </div>
        ))}
      </div>
      <Separator />
    </section>
  );
};

ArticlesAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ArticlesAdmin;
