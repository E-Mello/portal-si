import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";

const JobProfile: NextPageWithLayout = () => {
  return (
    <section className="flex h-[100vh] w-full items-start justify-center gap-4 max-sm:h-full ">
      <section className=" flex flex-col gap-4 pl-4 pr-3">
        <h1 className="pt-2 text-2xl font-bold">
          Perfil Profissional de um profissional de Sistemas de Informação
        </h1>
        <p className="text-justify">
          O bacharel em Sistemas de Informação (BSI) é uma evolução natural do
          profissional de tecnologia da informação, o curso proporciona o
          alinhamento dos conhecimentos em computação e o conhecimento em
          gestão. Sua formação é focada no desenvolvimento, manutenção e gestão
          de sistemas de informação dos dados de uma organização, seja para
          capturar, armazenar ou processar estes dados.
        </p>
        <p className="text-justify">
          O profissional formado no curso de Bacharelado em Sistemas de
          Informação poderá atuar em empresas de diferentes ramos de atividades,
          no setor específico de computação e/ou desenvolvimento, implementação
          e gerenciamento de sistemas computacionais, desempenhando as funções
          de analista de sistemas, projetista de sistemas, analista de suporte
          de sistemas, de chefia intermediária e superior.
        </p>
        <p className="text-justify">
          Esses profissionais atuam em empresas da área computacional que
          prestam serviços e produtos, como exemplo: empresas de consultorias e
          em empresas dedicadas ao desenvolvimento tanto de hardware quanto de
          software. Além disso, o profissional poderá atuar em pesquisa
          científica, bem como ser capaz de inovar, planejar e gerenciar a
          infraestrutura de tecnologia da informação em organizações.
        </p>
        <p className="text-justify">
          Esses profissionais atuam em empresas da área computacional que
          prestam serviços e produtos, como exemplo: empresas de consultorias e
          em empresas dedicadas ao desenvolvimento tanto de hardware quanto de
          software. Além disso, o profissional poderá atuar em pesquisa
          científica, bem como ser capaz de inovar, planejar e gerenciar a
          infraestrutura de tecnologia da informação em organizações.
        </p>
      </section>
    </section>
  );
};

JobProfile.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default JobProfile;
