import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

const SupervisedInternship: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Estágio Supervisionado
        </h1>
        <p className="text-white">
          O Estágio Curricular Supervisionado no curso de Bacharelado em
          Sistemas de Informação, do Campus Universitário de Sinop é componente
          obrigatório para conclusão da vida acadêmica. As normas sobre o
          Estágio Curricular Supervisionado para os cursos de Bacharelado na
          UNEMAT, estão Regulamentadas pela{" "}
          <a href="http://portal.unemat.br/media/oldfiles/proeg/docs/resolucoes/resolucao_028-2012-conepe_estagio_curricular_bacharelado.pdf">
            <b className="text-blue-900">RESOLUÇÃO Nº 028/2012 - CONEPE</b>
          </a>{" "}
          de 03 de junho de 2012.
        </p>
        <p className="text-white">
          Para efeito de realização do Estágio Curricular Supervisionado, o
          acadêmico só poderá iniciar suas atividades, caso tenha concluído 50%
          de créditos no curso, assim estando apto em matricular-se na
          disciplina de estágio supervisionado.
        </p>
      </div>
      <Separator />
    </section>
  );
};

SupervisedInternship.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default SupervisedInternship;
