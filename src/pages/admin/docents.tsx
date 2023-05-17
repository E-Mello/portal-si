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
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { HiOutlineCursorClick } from "react-icons/hi";
import Link from "next/link";

import { api } from "~/utils/api";
import SyncLoader from "react-spinners/SyncLoader";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/utils/cn";
import { TeachersSchema } from "~/server/common/PageSchema";

type Teacher = {
  id: number;
  name: string;
  qualification: string;
  area: string;
  email: string;
  lattes: string;
};

const DocentsAdmin: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.teachers.getAll.useQuery();

  const { mutateAsync: update } = api.teachers.update.useMutation({
    onSuccess: () => {
      toast.success("Card updated successfully");
    },
    onError: () => {
      toast.error(
        "Something is wrong in update data, please validate the data "
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof TeachersSchema>>({
    resolver: zodResolver(TeachersSchema),
  });

  const updateTeacher: SubmitHandler<z.infer<typeof TeachersSchema>> = async (
    data
  ) => {
    const res = await update(data);
    if (res) {
      console.log("res", res);
      reset();
      setOpen(false);
    }
  };

  // Group teachers by school year and class
  const teachersByClass: { [key: string]: Teacher[] } = {};
  pageData?.forEach((teacher) => {
    teacher.schoolYear.forEach((schoolYear) => {
      const classKey = `${schoolYear.class.year}/${schoolYear.class.semester}`;
      if (!teachersByClass[classKey]) {
        teachersByClass[classKey] = [];
      }
      teachersByClass[classKey]?.push(teacher);
    });
  });

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex  w-full flex-col gap-4 py-2 pr-6">
      <h1 className="pl-4 text-lg">Docentes por semestre</h1>
      <div className="justify-start pl-4">
        <Accordion type="single" className="flex flex-col" collapsible>
          {Object.keys(teachersByClass).map((classKey) => (
            <AccordionItem key={classKey} value={classKey} className="">
              <AccordionTrigger className="h-10">{classKey}</AccordionTrigger>
              <AccordionContent className="">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border">Name</th>
                      <th className="border">Qualification</th>
                      <th className="border">Area</th>
                      <th className="border">Email</th>
                      <th className="border ">Lattes</th>
                      <th className="w-40 border ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachersByClass[classKey]?.map((teacher) => (
                      <tr key={teacher.id} className="">
                        <td className="border pl-2">{teacher.name}</td>
                        <td className="border pl-2">{teacher.qualification}</td>
                        <td className="border pl-2">{teacher.area}</td>
                        <td className="border pl-2">{teacher.email}</td>
                        <td className="items-center justify-center border pl-2">
                          <Link
                            className="flex "
                            target="_blank"
                            href={`${teacher.lattes}`}
                          >
                            <HiOutlineCursorClick className="flex w-full" />
                          </Link>
                        </td>
                        <td className="flex w-40 justify-around gap-1 border px-4 py-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="hover:bg-cyan-800"
                              >
                                Editar
                              </Button>
                            </DialogTrigger>
                            <ScrollArea className="h-full w-full">
                              <DialogContent className="top-20 flex flex-col rounded-md bg-zinc-900 shadow-2xl shadow-zinc-700  sm:max-w-[50vw]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Editar as informações dos docentes
                                  </DialogTitle>
                                  <DialogDescription>
                                    Será mostrado no placeholder as informações
                                    atuais e ao salvar, as informações serão
                                    substituidas.
                                  </DialogDescription>
                                </DialogHeader>
                                {/* <form onSubmit={handleSubmit(updateTeacher)}> */}
                                <form>
                                  <section className="grid h-full grid-cols-2 gap-2">
                                    <div className="flex columns-1 flex-col items-start gap-3">
                                      <Label
                                        htmlFor="name"
                                        className="text-right"
                                      >
                                        Nome do professor
                                      </Label>
                                      <Input
                                        id="teacher-name"
                                        placeholder={teacher.name}
                                        className=""
                                        {...register("name")}
                                      />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-3">
                                      <Label
                                        htmlFor="qualification"
                                        className="text-right"
                                      >
                                        Qualificação do professor
                                      </Label>
                                      <Input
                                        id="teacher-qualification"
                                        placeholder={teacher.qualification}
                                        className=""
                                        {...register("qualification")}
                                      />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-3">
                                      <Label
                                        htmlFor="area"
                                        className="text-right"
                                      >
                                        Area de atuação do professor
                                      </Label>
                                      <Input
                                        id="teacher-area"
                                        placeholder={teacher.area}
                                        className=""
                                        {...register("area")}
                                      />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-3">
                                      <Label
                                        htmlFor="email"
                                        className="text-right"
                                      >
                                        Email do professor
                                      </Label>
                                      <Input
                                        id="teacher-email"
                                        placeholder={teacher.email}
                                        className=""
                                        {...register("email")}
                                      />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-3">
                                      <Label
                                        htmlFor="lattes"
                                        className="text-right"
                                      >
                                        Lattes do professor
                                      </Label>
                                      <Input
                                        id="teacher-lattes"
                                        placeholder={teacher.lattes}
                                        className=""
                                        {...register("lattes")}
                                      />
                                    </div>
                                  </section>

                                  <DialogFooter className="flex ">
                                    <Button className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600">
                                      {isSubmitting ? (
                                        <SyncLoader color="white" />
                                      ) : (
                                        "Salvar Alterações"
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </ScrollArea>
                          </Dialog>
                          <Button
                            variant={"outline"}
                            className="hover:bg-red-500"
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex  pt-4"></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

DocentsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DocentsAdmin;
