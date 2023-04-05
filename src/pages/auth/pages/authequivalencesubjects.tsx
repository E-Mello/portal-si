import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "~/components/ProtectedRoute";
import type { ReactElement } from "react";
import { Separator } from "~/components/ui/separator";

const siSubjects = [
  {
    name: "Cálculo",
    ch: 60,
  },
  {
    name: "Economia",
    ch: 60,
  },
  {
    name: "Eletiva Livre",
    ch: 60,
  },
  {
    name: "Eletiva Obrigatória I &U+2013 Introdução aos Microcontroladores",
    ch: 60,
  },
  {
    name: "Eletiva Obrigatória V &U+2013 Programação Linear",
    ch: 60,
  },
  {
    name: "Eletiva Obrigatória V &U+2013 LIBRAS &U+2013 Língua Brasileira de Sinais &U+2013 LBS",
    ch: 60,
  },
  {
    name: "Fundamentos da Matemática Elementar",
    ch: 60,
  },
  {
    name: "Fundamentos de Sistemas de Informação",
    ch: 60,
  },
  {
    name: "Introdução a Metodologia Científica",
    ch: 60,
  },
  {
    name: "Língua Portuguesa",
    ch: 60,
  },
  {
    name: "Lógica",
    ch: 60,
  },
  {
    name: "Probabilidade e Estatística",
    ch: 60,
  },
  {
    name: "Produção de Texto e Leitura",
    ch: 60,
  },
  {
    name: "Psicologia Aplicada a Sistemas de Informação",
    ch: 60,
  },
  {
    name: "Sistemas Digitaiss",
    ch: 60,
  },
];

const equivalence = [
  {
    name: "Cálculo Diferencial e Integral I (MAT); Cálculo Diferencial e Integral I (EC); Cálculo Diferencial e Integral I (EE); Matemática II (ECO)",
    ch: 60,
  },
  {
    name: "Introdução à Economia (ADM); Introdução à Economia (ECO); ECONOMIA I (CC)",
    ch: 60,
  },
  {
    name: "Uma disciplina com no mínimo 60 horas em qualquer curso do campus de Sinop",
    ch: 60,
  },
  {
    name: "Introdução aos Microcontroladores (EE)",
    ch: 60,
  },
  {
    name: "Otimização Linear de Sistemas (EE)",
    ch: 60,
  },
  {
    name: "LIBRAS (ADM), LIBRAS (CC); LIBRAS (ECO); LIBRAS (MAT); LIBRAS (LET); LIBRAS &U+2013 Língua Brasileira de Sinais(PED);",
    ch: 60,
  },
  {
    name: "Fundamentos de Matemática I (MAT); Fundamentos de Matemática (EC); Fundamentos de Matemática (EE)",
    ch: 60,
  },
  {
    name: "Sistemas de Informação (ADM)",
    ch: 60,
  },
  {
    name: "Metodologia e Técnicas de Pesquisa (ADM); Metodologia e Técnicas de Pesquisa em Ciências Sociais Aplicadas (CC); Metodologia Científica e Redação Científica (EC); Metodologia Científica e Redação Científica (EE)",
    ch: 60,
  },
  {
    name: "Português Instrumental (CC); Português Instrumental (ECO); Leitura e Produção de Textos (EC); Leitura e Produção de Textos (EE); L P: Leitura e produção de textos I (LET)",
    ch: 60,
  },
  {
    name: "Raciocínio Lógico e Analítico (CC); Introdução à Lógica Matemática (MAT)",
    ch: 60,
  },
  {
    name: "Probabilidade e Estatística (MAT); Probabilidade e Estatística (EC); Probabilidade e Estatística (EE);",
    ch: 60,
  },
  {
    name: "Leitura e Produção de Textos (MAT); Leitura e produção de textos II (LET)",
    ch: 60,
  },
  {
    name: "Psicologia (ADM); Psicologia do Trabalho e Ética Profissional (ECO); Psicologia do Trabalho (CC); ",
    ch: 60,
  },
  {
    name: "Circuitos Digitais I (EE)",
    ch: 60,
  },
];

const AuthenticatedEquivalenceSubjects: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
        <h1 className="pl-4 text-xl">Tabela de Equivalência de Disciplinas</h1>
        <div className="flex flex-col items-center justify-center gap-4 pl-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Disciplina em SI</th>
                <th className="px-4 py-2">Carga Horária</th>
                <th className="px-4 py-2">
                  Disciplina (Curso) - Equivalências no campus de Sinop
                </th>
                <th className="px-4 py-2">Carga Horária</th>
              </tr>
            </thead>
            <tbody>
              {siSubjects.map((subject, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{subject.name}</td>
                  <td className="border px-4 py-2">{subject.ch}</td>
                  <td className="border px-4 py-2">
                    {equivalence?.[index]?.name}
                  </td>
                  <td className="border px-4 py-2">
                    {equivalence?.[index]?.ch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Separator />
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedEquivalenceSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedEquivalenceSubjects;
