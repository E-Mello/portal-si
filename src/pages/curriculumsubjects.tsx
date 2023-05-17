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
import { Separator } from "~/components/ui/separator";
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

  const phases: Phase[] = [];

  pageData?.forEach((subject) => {
    const phase = phases.find((p) => p.phaseId === subject.phaseId);
    if (phase) {
      phase.subjects.push(subject);
    } else {
      phases.push({
        id: phases.length,
        phaseId: subject.phaseId,
        subjects: [subject],
      });
    }
  });
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Grade Curricular</h1>
      <Image width={500} height={500} alt="test" src={allSubjects} />
      <span>
        Os quadro a seguir apresenta a sequência curricular do curso de
        Bacharelado em Sistemas de Informação, compreendendo oito fases
        (semestres) letivas.
      </span>
      <section className="flex flex-col items-center justify-center gap-4 pl-4">
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
      <section className="grid w-full grid-cols-2 gap-4 pl-4 pr-10">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="flex flex-col justify-center gap-4 pb-2 pl-4 pt-2"
          >
            <legend className="flex justify-center text-xl">
              {phase.phaseId} Semestre
            </legend>
            <Table className="text-[1rem]">
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
                {phase.subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="border px-4 py-2">
                      {subject.name}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {subject.CH}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {subject.Credits}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {subject.Prerequisites}
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
