import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { PageViewSchema } from "~/server/common/PageSchema";
import type { ReactElement } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sheet } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CoursePurpose: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.coursePurpose.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const fieldsets = [
    { title: pageData?.info, content: pageData?.content },
    { title: pageData?.info02, content: pageData?.content02 },
    { title: pageData?.info03, content: pageData?.content03 },
    { title: pageData?.info04, content: pageData?.content04 as string },
  ];
  return (
    <section className="flex h-full w-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <div className="flex w-[95%] flex-col gap-10">
        <h1 className="pl-4 text-xl">{pageData?.title}</h1>
        {fieldsets.map((fieldset, index) => (
          <section key={index} className="flex flex-col gap-4">
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{fieldset.title}</legend>
              {fieldset.content?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
            <div className="flex"></div>
          </section>
        ))}
      </div>
      <div className="flex "></div>
    </section>
  );
};

CoursePurpose.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurpose;
