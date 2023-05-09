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

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const { mutateAsync: updateDocents } = api.dashboard.updateCard.useMutation({
    onSuccess: () => {
      toast.success("Card updated successfully");
    },
    onError: () => {
      toast.error(
        "Something is wrong in update data, please validate the data "
      );
    },
  });

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

  // Group teachers by school year and class
  const teachersByClass: { [key: string]: Teacher[] } = {};
  pageData.forEach((teacher) => {
    teacher.schoolYear.forEach((schoolYear) => {
      const classKey = `${schoolYear.class.year}/${schoolYear.class.semester}`;
      if (!teachersByClass[classKey]) {
        teachersByClass[classKey] = [];
      }
      teachersByClass[classKey]?.push(teacher);
    });
  });

  return (
    <section className="flex  w-full flex-col gap-4 py-2 pr-6">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="pl-4 text-lg">Docentes por semestre</h1>
        <div className="justify-start pl-4">
          <Accordion type="single" className="flex flex-col" collapsible>
            {Object.keys(teachersByClass).map((classKey) => (
              <AccordionItem key={classKey} value={classKey}>
                <AccordionTrigger className="h-10">{classKey}</AccordionTrigger>
                <AccordionContent>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="border">Name</th>
                        <th className="border">Qualification</th>
                        <th className="border">Area</th>
                        <th className="border">Email</th>
                        <th className="border ">Lattes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachersByClass[classKey]?.map((teacher) => (
                        <tr key={teacher.id} className="">
                          <td className="border">{teacher.name}</td>
                          <td className="border">{teacher.qualification}</td>
                          <td className="border">{teacher.area}</td>
                          <td className="border">{teacher.email}</td>
                          <td className="items-center justify-center border ">
                            <Link
                              className="flex "
                              target="_blank"
                              href={`${teacher.lattes}`}
                            >
                              <HiOutlineCursorClick className="flex w-full" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="flex pl-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar o conteudo da página</Button>
          </DialogTrigger>
          <ScrollArea>
            <DialogContent className="top-20 flex h-[50vh] flex-col justify-center rounded-md bg-zinc-900 shadow-2xl shadow-zinc-700 sm:max-w-[480px]">
              <DialogHeader className="flex items-center justify-center pb-5">
                <DialogTitle>Editar as informações dos docentes</DialogTitle>
                <DialogDescription>
                  Será mostrado no placeholder as informações atuais e ao
                  salvar, as informações serão substituidas.
                </DialogDescription>
              </DialogHeader>
              <section className="flex justify-between">
                <div className="flex flex-col items-start justify-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome do grupo de cards
                  </Label>
                  <Input
                    id="name"
                    // placeholder={}
                    className="col-span-1"
                    // onInvalid={errors.name?.message ? true : false}
                    // {...register("name")}
                    // key={}
                  />
                </div>
                <div className="mt-[1.65rem] flex">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value || "Selecionar Card"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] bg-zinc-900 p-0">
                      <Command>
                        <CommandInput placeholder="Selecionar Card" />
                        <CommandEmpty>Nenhum card encontrado.</CommandEmpty>
                        <CommandGroup>
                          {/* {group.cards.map((card) => (
                            <CommandItem
                              className="hover:bg-zinc-800"
                              key={card.id}
                              onSelect={() => {
                                setValue(card.name);
                                setOpen(false);
                                setCardNameSelected(card.name);
                                setCardInfoSelected(card.info);
                                setCardIdSelected(card.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === card.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                               {card.name} 
                            </CommandItem>
                          ))} */}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </section>
              <hr />
              <section className="flex justify-between">
                <div className="flex flex-col items-start justify-start gap-3">
                  <Label htmlFor="card-name" className="text-right">
                    Nome do card selecionado
                  </Label>
                  <Input
                    id="card-name"
                    // placeholder={}
                    className="col-span-2 w-80"
                    // onInvalid={errors.name?.message ? true : false}
                    // {...register("name")}
                    // key={}
                  />
                </div>
              </section>
              <section className="flex justify-between">
                <div className="flex flex-col items-start justify-start gap-3">
                  <Label htmlFor="card-info" className="text-right">
                    Informações do card selecionado
                  </Label>
                  <Input
                    id="card-info"
                    // placeholder={}
                    className="col-span-2 w-80"
                    // onInvalid={errors.name?.message ? true : false}
                    // {...register("info")}
                    // key={}
                  />
                </div>
              </section>
              <DialogFooter className="flex ">
                <Button className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600">
                  {/* {isSubmitting ? <SyncLoader color="white" /> : "Salvar"} */}
                </Button>
              </DialogFooter>
            </DialogContent>
          </ScrollArea>
        </Dialog>
      </div>
    </section>
  );
};

DocentsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DocentsAdmin;