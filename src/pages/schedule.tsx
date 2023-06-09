import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Layout from "../components/Layout";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import { api } from "../utils/api";

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
    <section className="flex h-[100vh] w-full flex-col items-center bg-zinc-800  text-white max-sm:p-0">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="pl-4 pt-2 text-2xl font-bold ">
          Link de acesso aos horários de cada semestre
        </h1>
        <span className="pl-4 text-justify max-sm:pr-4">
          Os links abaixo direcionam para os horários de cada semestre do curso
          de Bacharelado em Sistemas de Informação.
        </span>
        <div className="w-96 justify-start pl-4 pr-10 max-sm:w-full">
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="border text-center">Ano</TableHead>
                <TableHead className="border text-center">Semestre</TableHead>
                <TableHead className="border text-center">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="border">{data.year}</TableCell>
                  <TableCell className="border text-center">
                    {data.semester} Semestre
                  </TableCell>
                  <TableCell className="w-[5vw] border text-center hover:bg-zinc-700">
                    <a
                      href={data.link}
                      target="_blank"
                      className="hover:text-cyan-400"
                    >
                      Acessar
                    </a>
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

ClassSchedule.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ClassSchedule;
