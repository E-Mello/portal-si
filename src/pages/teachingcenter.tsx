import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const TeachingCenter: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.teachercenter.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante (NDE)</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante (NDE) do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Vigência</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((member) => (
              <tr key={member.id}>
                <td className="border border-gray-300 p-2">
                  {member.teachers}
                </td>
                <td className="border border-gray-300 p-2">{member.type}</td>
                <td className="border border-gray-300 p-2">{member.email}</td>
                <td className="border border-gray-300 p-2">
                  {member.validity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

TeachingCenter.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingCenter;
