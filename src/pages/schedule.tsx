import { type NextPage } from "next";

import { api } from "../utils/api";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import Layout from "../components/Layout";

const ClassSchedule: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.schedule.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
      <h1 className="pl-4 text-xl">
        Link de acesso aos horários de cada semestre
      </h1>
      <span className="pl-4">
        Os links abaixo direcionam para os horários de cada semestre do curso de
        Bacharelado em Sistemas de Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border border-black">Ano</th>
              <th className="border border-black">Semestre</th>
              <th className="border border-black">Link</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
                <td className="border border-black">{data.year}</td>
                <td className="border border-black">{data.semester}</td>
                <td className="border border-black">
                  <a href={data.link} target="_blank">
                    Acessar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

ClassSchedule.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ClassSchedule;
