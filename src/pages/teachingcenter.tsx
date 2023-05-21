import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const TeachingCenter: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.facultyCore.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante (NDE)</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante (NDE) do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <Table className="w-full text-[1rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="border text-center">Nome</TableHead>
              <TableHead className="border text-center">Tipo</TableHead>
              <TableHead className="border text-center">Email</TableHead>
              <TableHead className="w-[12vw] border text-center">
                Vigência
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="border">{member.teachers}</TableCell>
                <TableCell className="border">{member.type}</TableCell>
                <TableCell className="border">{member.email}</TableCell>
                <TableCell className="border text-center">
                  {member.validity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

TeachingCenter.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingCenter;
