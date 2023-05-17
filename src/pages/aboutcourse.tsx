import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sheet } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { PageViewSchema } from "~/server/common/PageSchema";
import { api } from "~/utils/api";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";

const AboutCourse: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.aboutcourse.getAll.useQuery();

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
  } = useForm<z.infer<typeof PageViewSchema>>({
    resolver: zodResolver(PageViewSchema),
  });
  const updatePage: SubmitHandler<z.infer<typeof PageViewSchema>> = async (
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
    <section className="flex h-full flex-col items-start justify-center gap-4 bg-zinc-800 pl-4 pt-4">
      {pageData && (
        <div className="flex flex-col ">
          <h1 className=" pb-4 text-2xl font-bold">{pageData.title}</h1>
          <div className="flex  w-full flex-col pr-10">
            {pageData.content.split(/[;:]/).map((item, index) => (
              <p className="" key={index}>
                {item.trim()}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

AboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourse;
