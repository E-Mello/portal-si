import Layout from "../../../components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import type { ReactElement } from "react";
import { Separator } from "../../../components/ui/separator";

interface Subject {
  Name: string;
  CH: number;
  Créditos: number;
  Prerequisites?: string;
}

interface Phase {
  name: string;
  subjects: Subject[];
}

type Phases = Array<Phase>;

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

const phases: Phases = [
  {
    name: "Fase 1",
    subjects: [
      {
        Name: "Fundamentos de Matemática Elementar",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Fundamentos de Sistemas de Informação",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Introdução à Computação",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Língua Portuguesa (Nivelamento)",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Lógica",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Psicologia Aplicada a Sistemas de Informação",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
    ],
  },
  {
    name: "Fase 2",
    subjects: [
      {
        Name: "Algoritmos I",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Geometria Analítica",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Introdução a Metodologia Científica",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Matemática Discreta",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Produção de Texto e Leitura",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Teoria Geral da Administração",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
    ],
  },
  {
    name: "Fase 3",
    subjects: [
      {
        Name: "Algoritmos II",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Algoritmos I",
      },
      {
        Name: "Arquitetura e Organização de Computadores",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Cálculo",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Economia",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Programação Orientada a Objetos",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Sistemas Digitais",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Matemática Discreta",
      },
    ],
  },
  {
    name: "Fase 4",
    subjects: [
      {
        Name: "Banco de Dados",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Computador e Sociedade",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Engenharia de Software",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Estruturas de Dados I",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Probabilidade e Estatística",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Sistemas Operacionais",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
    ],
  },
  {
    name: "Fase 5",
    subjects: [
      {
        Name: "Contabilidade e Custos",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Estruturas de Dados II",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Estruturas de Dados I",
      },
      {
        Name: "Interação Homem e Computador",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Linguagens Formais e Autômatos",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Qualidade de Software",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Redes de Computadores",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
    ],
  },
  {
    name: "Fase 6",
    subjects: [
      {
        Name: "Desenvolvimento de Sistemas Web",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Eletiva Obrigatória I",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Estruturas de Dados I",
      },
      {
        Name: "Eletiva Obrigatória II",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Empreendedorismo e Ética",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Sistemas Distribuídos",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Sistemas Operacionais",
      },
      {
        Name: "Trabalho de Conclusão de Curso I",
        CH: 60,
        Créditos: 4,
        Prerequisites: "50% de créditos do curso",
      },
    ],
  },
  {
    name: "Fase 7",
    subjects: [
      {
        Name: "Eletiva Obrigatória III",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Eletiva Obrigatória IV",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Estágio Supervisionado",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Inteligência Computacional",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Marketing em Informática",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Segurança e Auditoria de Sistemas",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
    ],
  },
  {
    name: "Fase 8",
    subjects: [
      {
        Name: "Eletiva Obrigatória V",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Eletiva Obrigatória VI",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Eletiva Obrigatória VII",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Eletiva Livre",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Governança em Tecnologia da Informação",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Nenhum",
      },
      {
        Name: "Trabalho de Conclusão de Curso II",
        CH: 60,
        Créditos: 4,
        Prerequisites: "Trabalho de Conclusão de Curso I",
      },
    ],
  },
];

const AuthenticatedCurriculumSubjects: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
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
          {phases?.map((phase: Phase, key) => (
            <div
              key={key}
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
                  {phase.subjects.map((subject: Subject, key) => (
                    <tr key={key}>
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
                  <td className="border px-4 py-2">
                    Atividades Complementares
                  </td>
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
    </ProtectedRoute>
  );
};

AuthenticatedCurriculumSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedCurriculumSubjects;
