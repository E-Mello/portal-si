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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardCardInfo: NextPageWithLayout = () => {
  const { data: pageData } = api.dashboard.getAll.useQuery();
  const updateCardMutation = api.dashboard.updateCard.useMutation();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newCardName, setNewCardName] = useState("");
  const [newCardInfo, setNewCardInfo] = useState("");

  const handleSaveChanges = async () => {
    try {
      const updatedCard = await updateCardMutation.mutateAsync({
        id: editingCard.id,
        name: newCardName,
        info: newCardInfo,
      });
      setIsEditDialogOpen(false);
      if (updatedCard) {
        toast.success("Card updated successfully");
      } else {
        notifyError();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something is Wrong, Please validate the data");
    }
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-between bg-zinc-800 p-4 text-white">
      <h1 className="pb-10 text-[2rem] font-bold">
        Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
      </h1>
      {pageData?.map((group) => (
        <div key={group.name} className="flex flex-col gap-5 pb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">{group.name}</h1>
            <Dialog >
              <DialogTrigger asChild>
                <Button variant="outline">Edit This Card Group</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editing Card Group</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                  <div className="flex flex-col  items-center gap-4">
                    <Label htmlFor="name"  className="text-right">
                      Group Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
