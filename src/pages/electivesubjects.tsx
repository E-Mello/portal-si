import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

interface Subject {
  Name: string;
  CH: number;
  Creditos: number;
  Prerequisites: string;
}

const subjects: Subject[] = [
  {
    Name: "Acessibilidade e inclusão digital: interfaces para a inclusão social",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Análise de Algoritmos",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Análise de Desempenho",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Automação e Controle",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Compiladores",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Computação Assistiva",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Computação Forense",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Computação Gráfica",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Criptografia Avançada",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Desenvolvimento de Software para Dispositivos Móveis",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Engenharia de Software II",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Estrutura e Comportamento Organizacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Algoritmos II",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Física I",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Cálculo",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Gestão de Projetos",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Informática Aplicada à Educação",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Inovações tecnológicas na educação",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Introdução à Big Data",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Introdução à Criptografia",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Introdução a Robótica",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Introdução aos Microcontroladores",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Introdução aos Sistemas Multimídias",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Inteligência Computacional II",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Laboratório de Banco de Dados",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Introdução a Banco de Dados",
  },
  {
    Name: "Laboratório de Microcontroladores",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Introdução aos Microcontroladores",
  },
  {
    Name: "Laboratório de Processamento de Alto Desempenho",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Processamento de Alto Desempenho",
  },
  {
    Name: "Laboratório de Processamento de Imagem",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Processamento de Imagem",
  },
  {
    Name: "Laboratório de Programação Orientada a Objetos",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Programação Orientada a Objetos",
  },
  {
    Name: "Laboratório de Realidade Virtual",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Realidade Virtual",
  },
  {
    Name: "Laboratório de Redes de Computadores",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Introdução às Redes de Computadores",
  },
  {
    Name: "Laboratório de Sistemas Digitais",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Sistemas Digitais",
  },
  {
    Name: "Laboratório de Sistemas Multimídias",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Introdução aos Sistemas Multimídias",
  },
  {
    Name: "Libras - Língua Brasileira de Sinais - LBS",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Métodos Computacionais da Álgebra Linear",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Metodologias no Enfoque de Educação e Tecnologia",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Modelagem e Simulação Computacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Organização e Métodos e Auditoria de Sistemas",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Pesquisa Operacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Processamento de Alto Desempenho",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Processamento de Imagem",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Programação linear",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Projetos em tecnologia educacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Realidade virtual",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Redes de Sensores",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Segurança computacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Sistemas Embarcados",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Sistemas de Informações Geográficas",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Software Educacional",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Teoria da Computação e Computabilidade",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Teoria dos Grafos",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Tecnologias da Informação e Comunicação",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Telecomunicações",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Tópicos Especiais em Computação Aplicada",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Nenhum",
  },
  {
    Name: "Tópicos Especiais em Redes de Computadores - Redes Móveis",
    CH: 60,
    Creditos: 4,
    Prerequisites: "Introdução às Redes de Computadores",
  },
];

const ElectiveSubjects: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Rol de Disciplinas Eletivas
        </h1>
        <p className="text-white">
          O quadro a seguir apresenta o rol de disciplinas eletivas do curso, no
          qual poderão ser definidas nas disciplinas eletivas obrigatórias de I
          a VII. A oferta de disciplinas, de acordo com as possibilidades
          constantes no rol de disciplinas, será definida em conjunto entre o
          Colegiado de Curso e o Núcleo Docente Estruturante (NDE).
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CH</th>
              <th className="px-4 py-2">Créditos</th>
              <th className="px-4 py-2">Pré-requisitos</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject: Subject) => (
              <tr>
                <td className="border px-4 py-2">{subject.Name}</td>
                <td className="border px-4 py-2">{subject.CH}</td>
                <td className="border px-4 py-2">{subject.Creditos}</td>
                <td className="border px-4 py-2">{subject.Prerequisites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Separator />
    </section>
  );
};

ElectiveSubjects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjects;
