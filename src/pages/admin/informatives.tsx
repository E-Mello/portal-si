import React, { useState } from "react";
import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import Image from "next/image";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InformativesCreateSchema,
  InformativesUpdateSchema,
} from "~/server/common/PageSchema";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const InformativesAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idInformative, setIdInformative] = useState("");
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.informatives.getAll.useQuery();

  const { mutateAsync: update } = api.informatives.update.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar o conteúdo da página!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate, isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof InformativesUpdateSchema>>({
    resolver: zodResolver(InformativesUpdateSchema),
  });
  const updateInformative: SubmitHandler<
    z.infer<typeof InformativesUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    setOpenUpdateDialog(false);
    resetUpdate();
  };
  const { mutateAsync: create } = api.informatives.create.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar o conteúdo da página!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate, isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof InformativesCreateSchema>>({
    resolver: zodResolver(InformativesCreateSchema),
  });
  const createInformative: SubmitHandler<
    z.infer<typeof InformativesCreateSchema>
  > = async (data) => {
    await create(data);
    resetCreate();
    setOpenCreateDialog(false);
  };

  const { mutate: deleteInformative } = api.informatives.delete.useMutation({
    onSuccess: () => {
      void utils.informatives.getAll.invalidate();
      toast.success("Informacao deletada com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao tentar excluir !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteChannel() {
    try {
      deleteInformative({ id: idInformative });
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  const [cards, setCards] = useState(pageData?.slice(0, 10) || []);
  const [showAll, setShowAll] = useState(false);

  const loadMoreCards = () => {
    const nextLoadedCards = cards.length + 10;
    setCards(pageData?.slice(0, nextLoadedCards) || []);
  };

  const showLessCards = () => {
    setCards(pageData?.slice(0, 10) || []);
    setShowAll(false);
  };

  const visibleCards = showAll ? pageData : cards;

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="w-full bg-zinc-800 px-4 py-12 text-white">
      <div className="mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Informativos do curso
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {visibleCards?.map((card) => (
            <div
              key={card.id}
              className=" rounded-lg bg-zinc-700 p-6 shadow-lg"
            >
              <div className="mb-4 flex  justify-center">
                <Image
                  width={500}
                  height={500}
                  alt="test"
                  src={card.linkImg}
                  className="rounded-lg"
                />
              </div>
              <h2 className="mb-2 text-2xl font-bold">{card.title}</h2>
              <p className="mb-4  text-gray-500">{card.info}</p>
              <p className="text-gray-300">{card.content}</p>
            </div>
          ))}
        </div>
        {pageData && !showAll && pageData.length > 10 && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={loadMoreCards}
            >
              Load More
            </button>
          </div>
        )}
        {showAll && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={showLessCards}
            >
              Show Less
            </button>
          </div>
        )}
        {!showAll && pageData && pageData.length > 10 && (
          <div className="mt-8 text-center">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
              onClick={() => setShowAll(true)}
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

InformativesAdmin.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default InformativesAdmin;
