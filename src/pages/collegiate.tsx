import Layout from "~/components/Layout";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const Colegiado: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.collegiate.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
      <h1 className="pl-4 text-xl">Colegiado do curso</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border border-black">Nome</th>
              <th className="border border-black">Segmento</th>
              <th className="border border-black">Email</th>
              <th className="border border-black">Vigência</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data) => (
              <tr key={data.id}>
                <td className="border border-black">{data.teacher}</td>
                <td className="border border-black">{data.segment}</td>
                <td className="border border-black">{data.email}</td>
                <td className="border border-black">{data.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Colegiado.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Colegiado;
