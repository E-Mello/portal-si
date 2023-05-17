import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

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
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Colegiado de Curso</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="border text-center">Nome</TableHead>
              <TableHead className="border text-center">Segmento</TableHead>
              <TableHead className="border text-center">Email</TableHead>
              <TableHead className="border text-center">Vigência</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="border ">{data.teacher}</TableCell>
                <TableCell className="border ">{data.segment}</TableCell>
                <TableCell className="border ">{data.email}</TableCell>
                <TableCell className="border ">{data.validity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

Colegiado.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Colegiado;
