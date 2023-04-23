import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "~/utils/api";

const ElectiveSubjects: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.electivesubject.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Rol de Disciplinas Eletivas
        </h1>
        <p className="text-white">
          O quadro a seguir apresenta o rol de disciplinas eletivas do curso, no
          qual poderão ser definidas nas disciplinas eletivas obrigatórias de I
          a VII. A oferta de disciplinas, de acordo com as possibilidades
          constantes no rol de disciplinas, será definida em conjunto entre o
          Colegiado de Curso e o Núcleo Docente Estruturante (NDE).
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CH</th>
              <th className="px-4 py-2">Créditos</th>
              <th className="px-4 py-2">Pré-requisitos</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
                <td className="border px-4 py-2">{data.name}</td>
                <td className="border px-4 py-2">{data.ch}</td>
                <td className="border px-4 py-2">{data.credits}</td>
                <td className="border px-4 py-2">{data.prerequisites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Separator />
    </section>
  );
};

ElectiveSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjects;
