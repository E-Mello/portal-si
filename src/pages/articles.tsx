import React, { type ReactElement } from "react";

import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import { api } from "~/utils/api";
import Link from "next/link";

const Articles: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.articles.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className={`flex h-[100vh] w-full pl-4 pr-2 pt-4 text-white`}>
      <section className="flex h-full w-full flex-col">
        <div className="flex w-full justify-start pb-5 ">
          <div className="flex pl-2">
            <h1 className="text-3xl font-bold">Artigos Publicados</h1>
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-start ">
          {pageData.map((data) => (
            <div
              key={data.id}
              className="group flex w-full  flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800"
            >
              <span className={`text-xl `}>
                Titulo do trabalho: {data.title.toUpperCase()}
              </span>
              <span className={`flex text-start  text-sm `}>
                Resumo do trabalho: {data.resume}
              </span>
              <span className={`text-start text-sm`}>
                Nome do estudante: {data.author}
              </span>
              <span className={`text-start text-sm`}>
                <Link
                  className="cursor-pointer hover:text-red-500"
                  href={data.link}
                  target="_blank"
                >
                  Clique aqui para acessar o trabalho
                </Link>
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

Articles.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Articles;
