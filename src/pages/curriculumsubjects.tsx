import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Image from "next/image";
import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

type Subject = {
  id: number;
  name: string;
  CH: number;
  Credits: number;
  Prerequisites: string;
  phaseId: number;
};

type Phase = {
  id: number;
  phaseId: number;
  subjects: Subject[];
};

const CurriculumSubjects: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.curriculumSubjects.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const phaseIds = [
    ...new Set(
      pageData?.map((subject: { phaseId: any }) => subject.phaseId as number)
    ),
  ];
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Grade Curricular</h1>
      <Image width={500} height={500} alt="test" src={allSubjects} />
      <span className="text-justify">
        Os quadro a seguir apresenta a sequência curricular do curso de
        Bacharelado em Sistemas de Informação, compreendendo oito fases
        (semestres) letivas.
      </span>
      <section className="flex flex-col items-center justify-center gap-4 pl-4 max-sm:pl-0">
        <h1>Resumo</h1>
        <Table className="table-auto text-[1rem]">
          <TableBody>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga horária de disciplinas
              </TableCell>
              <TableCell className="border px-4 py-2">2.820</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Estágio Supervisionado
              </TableCell>
              <TableCell className="border px-4 py-2">180</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Atividades Complementares
              </TableCell>
              <TableCell className="border px-4 py-2">150</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga Horária Total da Matriz
              </TableCell>
              <TableCell className="border px-4 py-2">3.150 horas</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <br />
      <section className="grid w-full grid-cols-2 gap-4 pl-4 pr-10 max-sm:grid-cols-1 max-sm:pl-0 max-sm:pr-0">
        {phaseIds.map((phaseId) => (
          <div
            key={phaseId}
            className="flex flex-col justify-center gap-4 pb-2 pl-4 pt-2 max-sm:pl-0"
          >
            <legend className="flex justify-center text-xl">
              {phaseId} Semestre
            </legend>
            <Table className="w-full text-[1rem] max-sm:text-[0.7rem]">
              <TableHeader>
                <TableRow>
                  <TableHead className="border border-gray-300 p-2">
                    Disciplina
                  </TableHead>
                  <TableHead className="border border-gray-300 p-2">
                    Carga Horária
                  </TableHead>
                  <TableHead className="border border-gray-300 p-2">
                    Créditos
                  </TableHead>
                  <TableHead className=" border border-gray-300 p-2">
                    Pré-requisitos
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {pageData
                  ?.filter((subject) => subject.phaseId === String(phaseId))
                  .map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="border px-4 py-2">
                        {subject.name}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.ch}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.credits}
                      </TableCell>
                      <TableCell className="border px-4 py-2">
                        {subject.prerequisites}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </section>
    </section>
  );
};

CurriculumSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjects;
