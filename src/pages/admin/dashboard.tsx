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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Card from "~/components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import {
  CardUpdateSchema,
  GroupCardUpdateSchema,
} from "~/server/common/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Edit } from "lucide-react";

const DashboardAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState("");
  const [groupCardId, setGroupCardId] = useState("");
  const [groupCardName, setGroupCardName] = useState("");
  const [openUpdateCardDialog, setOpenUpdateCardDialog] = useState(false);
  const [openUpdateGroupCardDialog, setOpenUpdateGroupCardDialog] =
    useState(false);

  const {
    data: pageData,
    isLoading: isLoadingPageData,
    isError: isErrorPageData,
  } = api.dashboard.getAll.useQuery();

  const { mutateAsync: updateGroupCard } =
    api.dashboard.updateGroupCard.useMutation({
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
    register: registerGroupCard,
    handleSubmit: handleSubmitGroupCard,
    formState: { isSubmitting: isSubmittingGroupCard },
    reset: resetGroupCard,
  } = useForm<z.infer<typeof GroupCardUpdateSchema>>({
    resolver: zodResolver(GroupCardUpdateSchema),
  });

  const handleUpdateGroupCard: SubmitHandler<
    z.infer<typeof GroupCardUpdateSchema>
  > = async (data) => {
    try {
      const res = await updateGroupCard(data);
      console.log("card alterado", res);
      setOpenUpdateGroupCardDialog(false);
      resetGroupCard();
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Failed to update page.", {
        autoClose: 2000,
      });
    }
  };

  const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
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
    register: registerCard,
    handleSubmit: handleSubmitCard,
    formState: { isSubmitting: isSubmittingCard },
    reset: resetCard,
  } = useForm<z.infer<typeof CardUpdateSchema>>({
    resolver: zodResolver(CardUpdateSchema),
  });

  const handleUpdateCard: SubmitHandler<
    z.infer<typeof CardUpdateSchema>
  > = async (data) => {
    try {
      const res = await updateCard(data);
      console.log("Grupo de card alterado", res);
      setOpenUpdateCardDialog(false);
      resetCard();
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Failed to update page.", {
        autoClose: 2000,
      });
    }
  };

  if (isLoadingPageData) {
    return <div>Loading...</div>;
  }

  if (isErrorPageData) {
    return <div>Error</div>;
  }

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
            <legend className="mb-4 flex">
              <h1 className="flex w-full items-center justify-center pb-2 pl-4 pr-4 text-lg font-bold">
                {group.name}
              </h1>
              <div className="flex pr-2">
                <Dialog
                  open={openUpdateGroupCardDialog}
                  onOpenChange={setOpenUpdateGroupCardDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className=" flex w-10  justify-center rounded-full p-0 hover:bg-slate-500 "
                      onClick={() => {
                        resetGroupCard();
                        setOpenUpdateGroupCardDialog(true);
                        setGroupCardId(group.id);
                        setGroupCardName(group.name);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Editar Conteudo</DialogTitle>
                      <DialogDescription>
                        Nessa folha lateral é possível estar editando o conteúdo
                        desta página
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmitGroupCard(handleUpdateGroupCard)}
                      className="flex gap-2"
                    >
                      <div className="flex w-full flex-col gap-4 py-4">
                        <div className="col-span-3 flex flex-col items-start gap-4">
                          <Input
                            type="hidden"
                            defaultValue={groupCardId}
                            {...registerGroupCard("id")}
                          />
                          <div>
                            <Label htmlFor="link" className="">
                              Alterar o nome do card
                            </Label>
                            <Input
                              id="link"
                              defaultValue={groupCardName}
                              className="col-span-3"
                              {...registerGroupCard("name")}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="flex rounded-md bg-slate-300 px-4 py-2 text-zinc-900 hover:bg-slate-200"
                          >
                            {isSubmittingGroupCard ? (
                              <SyncLoader />
                            ) : (
                              "Salvar Alterações"
                            )}
                          </Button>
                        </DialogFooter>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </legend>
            <div className="flex h-full w-full flex-col gap-5">
              <div className="grid  grid-cols-6 flex-row gap-10 whitespace-pre-line">
                {group.cards.map((card) => (
                  <div key={card.id} className="flex gap-2">
                    <Card
                      key={card.id}
                      name={card.name}
                      Link={card.locale}
                      Info={card.info}
                    />
                    <div className="flex">
                      <Dialog
                        open={openUpdateCardDialog}
                        onOpenChange={setOpenUpdateCardDialog}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className=" flex w-10  justify-center rounded-full p-0 hover:bg-slate-500 "
                            onClick={() => {
                              resetCard();
                              setOpenUpdateCardDialog(true);
                              setCardIdSelected(card.id);
                              setCardNameSelected(card.name);
                              setCardInfoSelected(card.info);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-800 text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Conteudo</DialogTitle>
                            <DialogDescription>
                              Nessa folha lateral é possível estar editando o
                              conteúdo desta página
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            onSubmit={handleSubmitCard(handleUpdateCard)}
                            className="flex gap-2"
                          >
                            <div className="flex w-full flex-col gap-4 py-4">
                              <div className="col-span-3 flex flex-col items-start gap-4">
                                <Input
                                  type="hidden"
                                  defaultValue={cardIdSelected}
                                  {...registerCard("id")}
                                />
                                <div>
                                  <Label htmlFor="link" className="">
                                    Alterar o nome do card
                                  </Label>
                                  <Input
                                    id="link"
                                    defaultValue={cardNameSelected}
                                    className="col-span-3"
                                    {...registerCard("name")}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="avatarUrl" className="">
                                    Alterar a informação do card
                                  </Label>
                                  <Input
                                    id="avatarUrl"
                                    defaultValue={cardInfoSelected}
                                    className="col-span-3"
                                    {...registerCard("info")}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  className="flex rounded-md bg-slate-300 px-4 py-2 text-zinc-900 hover:bg-slate-200"
                                >
                                  {isSubmittingCard ? (
                                    <SyncLoader />
                                  ) : (
                                    "Salvar Alterações"
                                  )}
                                </Button>
                              </DialogFooter>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
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
