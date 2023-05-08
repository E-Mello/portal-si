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

const DashboardCardInfo: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: pageData } = api.dashboard.getAll.useQuery();
  const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
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
  } = useForm<z.infer<typeof CardUpdateSchema>>({
    resolver: zodResolver(CardUpdateSchema),
    defaultValues: {
      name: cardNameSelected,
      info: cardInfoSelected,
    },
  });

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

  return (
    <section className="flex h-full w-full flex-col items-center justify-between bg-zinc-800 p-4 text-white">
      <h1 className="pb-10 text-[2rem] font-bold">
        Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
      </h1>
      {pageData?.map((group) => (
        <div key={group.name} className="flex flex-col gap-5 pb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">{group.name}</h1>
            {/* <form onSubmit={handleSubmit(changeCard)}> */}
            <form>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit This Card Group</Button>
                </DialogTrigger>
                <DialogContent className="top-20 flex h-[50vh] flex-col justify-center rounded-md bg-zinc-900 shadow-2xl shadow-zinc-700 sm:max-w-[480px]">
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
                        placeholder={group.name}
                        className="col-span-1"
                        // onInvalid={errors.name?.message ? true : false}
                        {...register("name")}
                        key={group.id}
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
                              {group.cards.map((card) => (
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
                        placeholder={cardNameSelected}
                        className="col-span-2 w-80"
                        // onInvalid={errors.name?.message ? true : false}
                        {...register("name")}
                        key={cardIdSelected}
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
                        placeholder={cardInfoSelected}
                        className="col-span-2 w-80"
                        // onInvalid={errors.name?.message ? true : false}
                        {...register("info")}
                        key={cardIdSelected}
                      />
                    </div>
                  </section>
                  <DialogFooter className="flex ">
                    <Button className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600">
                      {isSubmitting ? <SyncLoader color="white" /> : "Salvar"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </div>
          <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
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
      ))}
    </section>
  );
};

DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
