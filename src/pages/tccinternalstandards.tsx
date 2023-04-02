import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

const TCCInternalStandards: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">TCC</h1>
        <p className="text-white">
          O Trabalho de Conclusão de Curso - TCC no Curso de Bacharelado em
          Sistemas de Informação do Campus Universitário de Sinop, está
          regulamentado pela{" "}
          <a href="http://portal.unemat.br/media/oldfiles/proeg/docs/resolucoes/resolucao_030_2012_conepe_tcc.pdf">
            <b className="text-blue-900">RESOLUÇÃO Nº 030/2012 - CONEPE</b>
          </a>{" "}
          de 03 de junho de 2012.
        </p>
        <p className="text-white">
          Os alunos do curso de Bacharelado em Sistemas de Informação podem se
          matricular na disciplina de Trabalho de Conclusão de Curso I quando
          integralizarem no mínimo 50% (cinquenta por cento) dos créditos
          previstos no curso.
        </p>
        <p className="text-white">
          Os critérios para se ministrar as disciplinas de Trabalho de Conclusão
          de Curso I e II, bem como a vinculação dos TCCs às linhas de pesquisa
          do curso de Sistemas de Informação, e demais questões inerentes ao
          processo de orientação e desenvolvimento do TCC, serão normatizadas
          por meio de resolução específica a ser proposta pelo corpo docente e
          aprovadas pelo colegiado de curso e demais instâncias competentes.
        </p>
      </div>
      <Separator />
    </section>
  );
};

TCCInternalStandards.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TCCInternalStandards;
