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
    <section className="flex h-[100vh] w-[80vw] flex-col gap-4 py-2  max-sm:w-full">
      <section className="flex flex-col gap-4">
        <div className="flex h-full w-full flex-col gap-4 pl-4 max-sm:pr-4">
          <h1 className="text-3xl font-bold text-white">
            Rol de Disciplinas Eletivas
          </h1>
          <p className="text-justify text-white">
            O quadro a seguir apresenta o rol de disciplinas eletivas do curso,
            no qual poderão ser definidas nas disciplinas eletivas obrigatórias
            de I a VII. A oferta de disciplinas, de acordo com as possibilidades
            constantes no rol de disciplinas, será definida em conjunto entre o
            Colegiado de Curso e o Núcleo Docente Estruturante (NDE).
          </p>
        </div>
        <div className="flex h-full w-full gap-4 pl-4">
          <Table className=" border text-[1rem]">
            <TableHeader className="">
              <TableRow>
                <TableHead className="px-4 py-2">Nome</TableHead>
                <TableHead className="px-4 py-2">CH</TableHead>
                <TableHead className="px-4 py-2">Créditos</TableHead>
                <TableHead className="px-4 py-2">Pré-requisitos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {pageData.map((data) => (
                <TableRow key={data.id} className="">
                  <TableCell className=" px-4 py-2">{data.name}</TableCell>
                  <TableCell className=" px-4 py-2">{data.ch}</TableCell>
                  <TableCell className=" px-4 py-2">{data.credits}</TableCell>
                  <TableCell className=" px-4 py-2">
                    {data.prerequisites}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </section>
  );
};

ElectiveSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjects;
