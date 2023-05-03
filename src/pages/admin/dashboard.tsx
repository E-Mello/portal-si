import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import { Dialog } from "~/components/ui/dialog";
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
          <div>
            <h1 className="text-lg font-bold">{group.name}</h1>
          </div>
          <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line">
            {group.cards.map((card) => (
              <Card
                key={card.id}
                name={card.name}
                Link={card.locale}
                Info={card.info}
              >
                <Button
                  onClick={() => {
                    setEditingCard(card.id);
                    setNewCardName(card.name);
                    setNewCardInfo(card.info);
                    setIsEditDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {editingCard && (
        <Dialog
          isOpen={true}
          onClose={() => setEditingCard(null)}
          title="Edit Card"
        >
          <div className="flex flex-col gap-3">
            <label>
              New Card Name:
              <input
                type="text"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </label>
            <label>
              New Card Info:
              <textarea
                value={newCardInfo}
                onChange={(e) => setNewCardInfo(e.target.value)}
              />
            </label>
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={async () => {
                  const updatedCard =
                    await api.dashboard.updateCard.mutateAsync({
                      id: editingCard.id,
                      name: newCardName,
                      info: newCardInfo,
                    });
                  if (updatedCard) {
                    // show success toast
                  } else {
                    // show error toast
                  }
                  setEditingCard(null);
                  setNewCardName("");
                  setNewCardInfo("");
                }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
};

DashboardCardInfo.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DashboardCardInfo;
