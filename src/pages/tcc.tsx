import React, { type ReactElement } from "react";

import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import { api } from "~/utils/api";
import Link from "next/link";

const Tcc: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.tcc.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section
      className={`flex h-[100vh] w-full flex-col items-center justify-between pl-2 pr-2 pt-5 text-white`}
    >
      <div className="flex  w-full justify-start ">
        <div className="flex gap-5 pl-2">
          <h1 className="text-3xl font-bold">
            TCC{"'"}s (Trabalhos de conclusao de curso)
          </h1>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-start pt-6">
        {pageData.map((data) => (
          <Link
            key={data.id}
            className={`group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
            href={data.link}
            target="_blank"
          >
            <span className={`text-xl `}>{data.title.toUpperCase()}</span>
            <span className={`flex text-justify text-sm`}>{data.resume}</span>
            <span className={`text-start text-sm`}>
              Nome do aluno: {data.author}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

Tcc.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Tcc;
