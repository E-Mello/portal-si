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
    <section className="flex h-[100vh] w-[80vw] flex-col items-start  justify-start gap-4 py-2 pl-5 pt-5  max-sm:w-full max-sm:py-0">
      <h1 className="flex self-center pl-4 text-xl max-sm:pl-2 max-sm:pt-5 ">
        Tabela de Equivalência de Disciplinas
      </h1>
      <div className="flex w-full flex-col gap-4 pl-4 ">
        <Table className="w-full text-[1rem] ">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 py-2 text-center">
                Disciplina em SI
              </TableHead>
              <TableHead className="border border-gray-300 py-2 text-center">
                Carga Horária
              </TableHead>
              <TableHead className="border border-gray-300 py-2 text-center">
                Créditos
              </TableHead>
              <TableHead className="border border-gray-300 py-2 text-center">
                Pré-requisitos
              </TableHead>
              <TableHead className="border border-gray-300 py-2 text-center">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData
              .filter((data) => data.equivalenceSubjects !== "")
              .map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="border border-gray-300 py-2">
                    {data.name}
                  </TableCell>
                  <TableCell className="border border-gray-300 py-2 text-center ">
                    {data.ch}
                  </TableCell>
                  <TableCell className="border border-gray-300 py-2 text-center">
                    {data.credits}
                  </TableCell>
                  <TableCell className="border border-gray-300 py-2 text-center">
                    {data.prerequisites}
                  </TableCell>
                  <TableCell className="border border-gray-300 py-2">
                    {data.equivalenceSubjects}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Separator />
    </section>
  );
};

EquivalenceSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EquivalenceSubjects;
