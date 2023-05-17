import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
<<<<<<< HEAD
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
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

const CurriculumSubjects: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

=======
import { type ReactElement } from "react";
import { api } from "~/utils/api";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "~/utils/cn";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import Link from "next/link";
import { PublicationsSchema } from "~/server/common/PageSchema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Textarea } from "~/components/ui/textarea";

const TccAdmin: NextPageWithLayout = () => {
>>>>>>> dev
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.tcc.getAll.useQuery();

<<<<<<< HEAD
=======
  const { mutateAsync: update } = api.tcc.update.useMutation({
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

>>>>>>> dev
  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

<<<<<<< HEAD
  // const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
  //   onSuccess: () => {
  //     toast.success("Card updated successfully");
  //   },
  //   onError: () => {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data "
  //     );
  //   },
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm<z.infer<typeof CardUpdateSchema>>({
  //   resolver: zodResolver(CardUpdateSchema),
  //   defaultValues: {
  //     name: cardNameSelected,
  //     info: cardInfoSelected,
  //   },
  // });

  // const changeCard: SubmitHandler<z.infer<typeof CardUpdateSchema>> = async (
  //   data
  // ) => {
  //   const res = await updateCard(data);
  //   console.log("res:", res);
  //   if (res) {
  //     toast.success("Card updated successfully");
  //     reset();
  //   } else {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data"
  //     );
  //   }
  // };

=======
>>>>>>> dev
  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-between pl-4 pt-10 text-white`}
    >
      <div className="flex h-full w-full justify-start ">
        <div className="flex gap-5 pl-2">
          <h1 className="text-3xl font-bold">
<<<<<<< HEAD
            TCC{"'"}s (Trabalhos de conclusao de curso)
=======
            TCC{"'"}s (Trabalhos de conclusao de curso) Publicados
>>>>>>> dev
          </h1>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex h-full w-full flex-col items-start pt-6">
=======
      <div className="flex h-full w-full flex-col items-start gap-4 pt-6">
>>>>>>> dev
        {pageData.map((data) => (
          <div
            key={data.id}
            className={`group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
          >
            <span className={`text-xl `}>{data.title.toUpperCase()}</span>
            <span className={`flex text-start  text-sm `}>{data.resume}</span>
            <span className={`text-start text-sm`}>
<<<<<<< HEAD
              Area de Estudo do projeto: {data.projectarea}
            </span>
            <span className={`text-start text-sm`}>
              Nome do aluno: {data.studentname}
=======
              Nome do aluno: {data.author}
>>>>>>> dev
            </span>
            <span className={`text-start text-sm`}>
              <Link
                className="cursor-pointer hover:text-red-500"
                href={data.link}
                target="_blank"
              >
<<<<<<< HEAD
                Click aqui para acessar o trabalho
              </Link>
            </span>
=======
                {data.linkName}
              </Link>
            </span>
            <section className="flex py-2">
              <Sheet>
                <SheetTrigger asChild className="">
                  <Button className="bg-slate-200 text-zinc-900">
                    Editar Publicação
                  </Button>
                </SheetTrigger>
                <SheetContent
                  position="right"
                  size={"default"}
                  className="bg-zinc-800"
                >
                  <form
                    // onSubmit={handleSubmit(updatePage)}
                    className="flex flex-col gap-4 p-4"
                  >
                    <SheetHeader>
                      <SheetTitle>Editar Publicação</SheetTitle>
                      <SheetDescription>
                        Edite as informações da publicação
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="title" className="">
                        Alterar o titulo da publicação
                      </Label>
                      <Input
                        id="titlePage"
                        placeholder="Atividades Complementares"
                        className="col-span-3"
                        {...register("title")}
                      />
                      <Label htmlFor="title" className="">
                        Alterar o nome do author da publicação
                      </Label>
                      <Input
                        id="titlePage"
                        placeholder="Atividades Complementares"
                        className="col-span-3"
                        {...register("author")}
                      />
                      <Label htmlFor="newValue" className="">
                        Digite o novo conteúdo a ser apresentado no corpo da
                        página
                      </Label>
                      <Textarea {...register("resume")}></Textarea>
                      <Label htmlFor="title" className="">
                        Alterar o nome do link da pagina
                      </Label>
                      <Input
                        id="titlePage"
                        placeholder="Atividades Complementares"
                        className="col-span-3"
                        {...register("linkName")}
                      />
                      <Label htmlFor="title" className="">
                        Inserir o link dos dados
                      </Label>
                      <Input
                        id="titlePage"
                        placeholder="Atividades Complementares"
                        className="col-span-3"
                        {...register("link")}
                      />
                    </div>
                    <SheetFooter>
                      <button
                        type="submit"
                        className=" rounded-md bg-slate-200 px-4 py-2 text-zinc-900"
                      >
                        {isSubmitting ? <SyncLoader /> : "Salvar Alterações"}
                      </button>
                    </SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>
            </section>
>>>>>>> dev
          </div>
        ))}
      </div>
    </section>
  );
};

<<<<<<< HEAD
CurriculumSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjects;
=======
TccAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TccAdmin;
>>>>>>> dev
