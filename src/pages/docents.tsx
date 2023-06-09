import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { HiOutlineCursorClick } from "react-icons/hi";
import Layout from "~/components/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const Docentes: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.teachers.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex h-[100vh] w-full flex-col gap-4 py-2 pr-6">
      <h1 className="pl-4 text-2xl font-bold">Docentes por semestre</h1>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10 max-sm:pr-0">
        <Table className="text-[1rem] max-sm:text-[0.6rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="border">Name</TableHead>
              <TableHead className="border">Qualification</TableHead>
              <TableHead className="border">Area</TableHead>
              <TableHead className="border">Email</TableHead>
              <TableHead className="border">Periodo de Serviço</TableHead>
              <TableHead className="border">Lattes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData?.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="border">{teacher.name}</TableCell>
                <TableCell className="border">
                  {teacher.qualification}
                </TableCell>
                <TableCell className="border">{teacher.area}</TableCell>
                <TableCell className="border">{teacher.email}</TableCell>
                <TableCell className="border">
                  {teacher.periodOfService}
                </TableCell>
                <TableCell className=" w-[5vw] items-center border">
                  <Link
                    target="_blank"
                    className="flex items-center justify-center"
                    href={`${teacher.lattes}`}
                  >
                    <HiOutlineCursorClick />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

Docentes.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Docentes;
