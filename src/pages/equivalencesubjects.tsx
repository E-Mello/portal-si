import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "../utils/api";

const EquivalenceSubjects: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.equivalence.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-full  w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <h1 className="flex self-center pl-4 text-xl ">
        Tabela de Equivalência de Disciplinas
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Disciplina em SI</th>
              <th className="px-4 py-2">Carga Horária</th>
              <th className="px-4 py-2">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </th>
              <th className="px-4 py-2">Carga Horária</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
                <td className="border px-4 py-2">{data.name}</td>
                <td className="border px-4 py-2">{data.ch}</td>
                <td className="border px-4 py-2">{data.equivalence}</td>
                <td className="border px-4 py-2">{data.chequivalence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Separator />
    </section>
  );
};

EquivalenceSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EquivalenceSubjects;
