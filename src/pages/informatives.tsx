import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { useState, type ReactElement, useEffect } from "react";

import { Carousel } from "react-responsive-carousel";
import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import Image from "next/image";
import { api } from "~/utils/api";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Informativos: NextPageWithLayout = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.informatives.getAll.useQuery();

  const [cards, setCards] = useState<
    {
      info: string;
      id: string;
      title: string;
      content: string;
      linkImg: string;
    }[]
  >([]);

  useEffect(() => {
    if (pageData) {
      setCards(pageData.slice(0, 5));
    }
  }, [pageData]);

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
    <section className={`w-full bg-zinc-800 px-4 py-12 text-white max-sm:pl-0`}>
      <div className="mx-auto">
        <h1 className="flex items-center justify-center p-2 text-center text-3xl font-bold max-sm:text-2xl">
          Aqui voce pode acompanhar as principais noticias do curso
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {visibleCards?.map((card) => (
            <div key={card.id} className="flex">
              <div className=" rounded-lg bg-zinc-700 p-6 shadow-lg">
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

Informativos.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Informativos;
