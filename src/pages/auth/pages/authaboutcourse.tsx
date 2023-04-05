import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "~/components/ProtectedRoute";
import type { ReactElement } from "react";
interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}


const AuthenticatedAboutCourse: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <section className="relative top-0 flex h-[150vh] w-full flex-col items-start justify-center gap-4 py-2">
        <h1 className="pl-4 text-xl">Sobre o Curso</h1>
        <div className="flex h-[50vh] w-full flex-col justify-start pl-4 pr-10">
          <p>
            O curso de de Bacharelado em Sistemas de informação (BSI) é
            considerado de atividade-fim, que visa a formação de profissionais
            em computação ou informática com intuito principal de automatizar
            sistemas para gerência de informação nas organizações. A área de
            Sistemas de Informação lida com sistemas complexos em empresas e
            governo, com a necessidade de conhecimentos técnicos e
            organizacionais em seu projeto, desenvolvimento e gerenciamento para
            trazer suporte na tomada de decisão e nas estratégias das
            organizações.
          </p>
          <p>
            Os Sistemas de Informação e as Tecnologias da Informação e
            Comunicação nas organizações destacam-se pelo uso eficiente de
            recursos oferecendo um impacto significativo na produtividade e na
            competitividade das empresas nacionais e internacionais, em um mundo
            globalizado e competitivo.
          </p>
          <p>
            Em Sistemas de Informação abrange-se em sua formação a aquisição de
            conhecimento teórico e prático, de técnicas e ferramentas
            computacionais necessárias para desenvolver, selecionar, aplicar e
            gerir soluções de forma a atender às necessidades da sociedade.
          </p>
          <p>
            Os conhecimentos adquiridos na formação do Bacharelado em Sistemas
            de informação estão vinculados principalmente as áreas de Ciência da
            Computação, Matemática e Administração. O curso visa uma formação
            sólida na área da computação, com uma grande diversidade de
            conteúdos como:
          </p>
          <br />
          <ul>
            <li>Algoritmos e complexidade;</li>
            <li>Arquitetura e organização de computadores;</li>
            <li>Banco de dados;</li>
            <li>Circuitos digitais;</li>
            <li>Computação gráfica;</li>
            <li>Engenharia de software;</li>
            <li>Estruturas de dados;</li>
            <li>Fundamentos de linguagens;</li>
            <li>Inteligência artificial e computacional;</li>
            <li>Interação humano-computador;</li>
            <li>Linguagens formais e autômatos;</li>
            <li>Lógica;</li>
            <li>Sistemas multimídias e hipermídias;</li>
            <li>Processamento de imagens;</li>
            <li>Processamento distribuído;</li>
            <li>Processamento paralelo;</li>
            <li>Programação;</li>
            <li>Realidade virtual;</li>
            <li>Redes de computadores;</li>
            <li>Robótica;</li>
            <li>Segurança;</li>
            <li>Sistemas embarcados;</li>
            <li>Sistemas operacionais; entre outros.</li>
          </ul>
          <br />
        </div>
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedAboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedAboutCourse;
