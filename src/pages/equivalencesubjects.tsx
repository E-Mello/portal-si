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
    <section className="flex h-[100vh] w-[80vw] flex-col  items-start justify-start gap-4 py-2 pt-5  max-sm:w-full max-sm:py-0">
      <h1 className="flex self-center pl-4 text-xl max-sm:pl-2 max-sm:pt-5 ">
        Tabela de Equivalência de Disciplinas
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-4 pl-4">
        <Table className="text-[1rem] ">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Disciplina em SI</TableHead>
              <TableHead className="px-4 py-2">Carga Horária</TableHead>
              <TableHead className="px-4 py-2">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </TableHead>
              <TableHead className="px-4 py-2">Carga Horária</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="border px-4 py-2">{data.name}</TableCell>
                <TableCell className="border px-12 py-2 ">{data.ch}</TableCell>
                <TableCell className="border px-4 py-2">
                  {data.equivalence}
                </TableCell>
                <TableCell className="border px-12 py-2">
                  {data.chequivalence}
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
