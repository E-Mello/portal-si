/* eslint-disable @typescript-eslint/no-misused-promises */
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

const DashboardAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: pageData } = api.dashboard.getAll.useQuery();
  const { mutateAsync: update } = api.dashboard.update.useMutation({
    onSuccess: () => {
      void utils.dashboard.getAll.invalidate();
      toast.success("Card updated successfully", {
        autoClose: 2000,
      });
    },
    onError: () => {
      void utils.dashboard.getAll.invalidate();
      toast.error(
        "Something is wrong in update data, please validate the data ",
        {
          autoClose: 2000,
        }
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof CardUpdateSchema>>({
    resolver: zodResolver(CardUpdateSchema),
  });

  // const updateCard: SubmitHandler<z.infer<typeof CardUpdateSchema>> = async (
  //   data
  // ) => {
  //   const changedFields: {
  //     [key: number]:
  //       | string
  //       | number
  //       | { id?: number | undefined; name?: string | undefined }
  //       | undefined;
  //   } = {};

  //   // Iterate over the submitted data and check for changes
  //   for (const key in data) {
  //     if (
  //       data.hasOwnProperty(key) &&
  //       data[key as keyof typeof data] !== "" &&
  //       data[key as keyof typeof data] !== undefined
  //     ) {
  //       const value = data[key as keyof typeof data];

  //       if (typeof value === "string" || typeof value === "number") {
  //         changedFields[key as unknown as keyof typeof changedFields] = value;
  //       } else if (typeof value === "object" && value !== null) {
  //         // Ensure the value is not null before assigning
  //         changedFields[key as unknown as keyof typeof changedFields] =
  //           value as {
  //             id?: number | undefined;
  //             name?: string | undefined;
  //           };
  //       }
  //     }
  //   }

  //   if (Object.keys(changedFields).length === 0) {
  //     // No changes detected, show a message or handle it as per your requirement
  //     toast.info("No changes made.", {
  //       autoClose: 2000,
  //     });
  //     return;
  //   }

  //   console.log("Changed fields:", changedFields);

  //   try {
  //     const updatedData = { ...pageData, group: data.group, ...changedFields };
  //     const res = await update(updatedData);
  //     console.log("res", res);
  //     reset();
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //     toast.error("Failed to update page.", {
  //       autoClose: 2000,
  //     });
  //   }
  // };

  const updateCard: SubmitHandler<z.infer<typeof CardUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await update(data);
      console.log("res", res);
      reset();
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Failed to update page.", {
        autoClose: 2000,
      });
    }
  };

  const changeCardData = () => {
    setCardNameSelected("");
    setCardInfoSelected("");
    setValue("");
    setCardIdSelected(undefined);
  };

  return (
    <section
      className={`flex h-full w-full flex-col items-center bg-zinc-800 p-4 pl-4 text-white`}
    >
      <h1 className="text-[2rem] font-bold">
        Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
      </h1>
      <section className="hover:bg-silver flex w-full flex-col justify-between gap-5">
        {pageData?.map((group) => (
          <fieldset
            key={group.id}
            className=" flex flex-col justify-start border-t pb-2 pl-4 "
          >
            <legend className="">
              <h1 className=" w-full items-center justify-center pb-2 pl-4 pr-4 text-lg font-bold">
                {group.name}
              </h1>
            </legend>
            <div className="flex w-full items-end justify-end pb-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      changeCardData();
                    }}
                    className="flex w-44 items-end justify-end"
                  >
                    Edit This Card Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="top-20 flex h-[50vh] flex-col justify-center rounded-md bg-zinc-800 text-white shadow-2xl shadow-zinc-700 sm:max-w-[480px]">
                  <form
                    onSubmit={handleSubmit(updateCard)}
                    className="flex flex-col gap-6"
                  >
                    <DialogHeader className="flex items-center justify-center pb-5">
                      <DialogTitle>
                        Editar as informações do grupo de card selecionado
                      </DialogTitle>
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
                          className="col-span-1"
                          defaultValue={group.name}
                          {...register("group.name")}
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
                          <PopoverContent className="w-[200px] bg-zinc-800 p-0 text-white">
                            <Command>
                              <CommandInput placeholder="Selecionar Card" />
                              <CommandEmpty>
                                Nenhum card encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {group.cards.map((card) => (
                                  <CommandItem
                                    className="hover:bg-zinc-700"
                                    key={card.id}
                                    onSelect={() => {
                                      setValue(card.name);
                                      setOpen(false);
                                      reset();
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
                                ))}
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
                          className="col-span-2 w-80"
                          {...register("name")}
                          defaultValue={cardNameSelected}
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
                          defaultValue={cardInfoSelected}
                          className="col-span-2 w-80"
                          {...register("info")}
                        />
                      </div>
                    </section>
                    <DialogFooter className="flex ">
                      <Button className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600">
                        {isSubmitting ? <SyncLoader color="white" /> : "Salvar"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex h-full w-full flex-col gap-5">
              <div className="grid  grid-cols-6 flex-row gap-10 whitespace-pre-line">
                {group.cards.map((card) => (
                  <Card
                    key={card.id}
                    name={card.name}
                    Link={card.locale}
                    Info={card.info}
                  />
                ))}
              </div>
            </div>
          </fieldset>
        ))}
      </section>
    </section>
  );
};

DashboardAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardAdmin;
