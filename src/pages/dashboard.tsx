import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { type ReactElement } from "react";

import Card from "../components/Card";
import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import { Separator } from "../components/ui/separator";
import { api } from "~/utils/api";
import { ScrollArea } from "~/components/ui/scroll-area";

const SkeletonCard = () => {
  return (
    <div className="h-[20vh] w-full animate-pulse rounded-md bg-gray-300"></div>
  );
};

const Dashboard: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.dashboard.getAll.useQuery();

  if (pageIsLoading) {
    return (
      <section
        className={`relative flex h-full w-full flex-col items-center justify-between gap-10 bg-zinc-800 pt-48 text-white`}
      >
        <h1 className="text-base ">
          Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
        </h1>
        <section className="flex w-[81vw] flex-col justify-between gap-5">
          {[...Array<number>(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-5">
              <div>
                <SkeletonCard />
              </div>
            </div>
          ))}
          <Separator />
        </section>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full flex-col items-center">
          <svg
            className="mb-4 h-full w-2/5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.646 16.354a.5.5 0 010-.708L16.293 3.646a.5.5 0 01.708 0l.708.708a.5.5 0 010 .708L4.354 17.768a.5.5 0 01-.708 0l-.708-.708z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M16.354 16.354a.5.5 0 010-.708L3.707 3.646a.5.5 0 01.708 0l.708.708a.5.5 0 010 .708L4.354 4.232a.5.5 0 01-.708 0L3.646 3.524a.5.5 0 010-.708L16.293 16.293a.5.5 0 01.708 0l.353.353zM3.354 16H16.5a.5.5 0 010 1H3.354a.5.5 0 010-1z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M16.354 3.646a.5.5 0 010 .708L3.707 16.354a.5.5 0 01-.708 0l-.708-.708a.5.5 0 010-.708L15.646 2.732a.5.5 0 01.708 0l.708.708z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mb-4 text-center text-xl font-medium">
            Oops! Something went wrong.
          </p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`flex h-full w-full flex-col items-center bg-zinc-800 pl-4 pt-4 text-white  max-sm:pl-0`}
      >
        <ScrollArea className="h-full w-full">
          <h1 className="pb-4 font-bold max-sm:w-96 max-sm:pl-2  lg:text-lg  xl:text-xl  2xl:text-3xl">
            Dashboard de Navegacao do Portal do Curso de Sistemas de Informacoes
          </h1>
          <div className="hover:bg-silver flex w-full flex-col justify-between gap-5 ">
            {pageData.map((group) => (
              <fieldset
                key={group.name}
                className="justify-start border-t pb-2 pl-4  "
              >
                <legend className="">
                  <h1 className=" w-full items-center justify-center pb-2 pl-4 pr-4 text-lg font-bold max-lg:text-sm">
                    {group.name}
                  </h1>
                </legend>
                {/* <div className="flex h-full w-full flex-col  gap-5 max-sm:w-56"> */}
                <div className="grid h-full w-full grid-cols-6 flex-col gap-10  max-sm:w-5/6  max-sm:grid-cols-3 ">
                  {/* <div className="grid grid-cols-6  flex-row gap-10 whitespace-pre-line max-sm:grid-cols-3 max-sm:gap-10"> */}
                  {group.cards.map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      Link={card.locale}
                      Info={card.info}
                    />
                  ))}
                  {/* </div> */}
                </div>
              </fieldset>
            ))}
            <Separator />
          </div>
        </ScrollArea>
      </section>
    );
  }
};
Dashboard.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Dashboard;
