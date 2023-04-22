import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "../utils/api";

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

const CurriculumSubjects: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.gca.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        <h1 className="pl-4 text-xl">Grade Curricular</h1>
        <img src={allSubjects} />
        <h1>
          Os quadro a seguir apresenta a sequência curricular do curso de
          Bacharelado em Sistemas de Informação, compreendendo oito fases
          (semestres) letivas.
        </h1>
      </div>
      <br />
      <div className="flex flex-col items-center justify-center gap-4 pl-4">
        {phases?.map((phase: Phase) => (
          <div
            key={phase.name}
            className="flex flex-col items-center justify-center gap-4 pl-4"
          >
            <h1 className="pl-4 text-xl">{phase.name}</h1>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Disciplina</th>
                  <th className="px-4 py-2">Carga Horária</th>
                  <th className="px-4 py-2">Créditos</th>
                  <th className="px-4 py-2">Pré-requisitos</th>
                </tr>
              </thead>
              <tbody>
                {phase.subjects.map((subject: Subject) => (
                  <tr key={subject.Name}>
                    <td className="border px-4 py-2">{subject.Name}</td>
                    <td className="border px-4 py-2">{subject.CH}</td>
                    <td className="border px-4 py-2">{subject.Créditos}</td>
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
