import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "../utils/api";

const Ementas: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.courseprogram.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex w-full flex-col items-start justify-center gap-4 pl-4 pt-4">
      <h1 className=" text-xl">Ementas e Bibliografias</h1>
      <p className="">
        Aqui você encontra as ementas e bibliografias de todas as disciplinas do
        curso.
      </p>
      <Separator />
      {pageData.map((data) => (
        <div className="flex  gap-4 " key={data.id}>
          <p>
            {data.description} {"=>"}
          </p>
          <p>
            <a href={`${data.link}`} target="_blank" rel="noreferrer">
              Link para visualização
            </a>
          </p>
        </div>
      ))}
    </section>
  );
};

Ementas.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Ementas;
