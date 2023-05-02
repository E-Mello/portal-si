import Image from "next/image";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "../utils/api";

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
  } = api.subjectsgrid.getAll.useQuery();

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
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        <h1 className="pl-4 text-xl">Grade Curricular</h1>
        <Image width={500} height={500} alt="test" src={allSubjects} />
        <h1>
          Os quadro a seguir apresenta a sequência curricular do curso de
          Bacharelado em Sistemas de Informação, compreendendo oito fases
          (semestres) letivas.
        </h1>
      </div>
      <br />
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="flex flex-col items-center justify-center gap-4 pl-4"
          >
            <h1 className="pl-4 text-xl">Fase {phase.phaseId}</h1>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Disciplina</th>
                  <th className="border px-4 py-2">Carga Horária</th>
                  <th className="border px-4 py-2">Créditos</th>
                  <th className="border px-4 py-2">Pré-requisitos</th>
                </tr>
              </thead>
              <tbody>
                {phase.subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2">{subject.CH}</td>
                    <td className="border px-4 py-2">{subject.Credits}</td>
                    <td className="border px-4 py-2">
                      {subject.Prerequisites}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <br />
        <div className="flex flex-col items-center justify-center gap-4 pl-4">
          <h1>Resumo</h1>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  Carga horária de disciplinas
                </td>
                <td className="border px-4 py-2">2.820</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Estágio Supervisionado</td>
                <td className="border px-4 py-2">180</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Atividades Complementares</td>
                <td className="border px-4 py-2">150</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Carga Horária Total da Matriz
                </td>
                <td className="border px-4 py-2">3.150 horas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Separator />
    </section>
  );
};

CurriculumSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjects;
