import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

const AdditionalActivities: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Atividades Complementares
        </h1>
        <p className="text-white">
          Os acadêmicos matriculados no curso de Bacharelado em Sistemas de
          Informação deverão cumprir a carga horária de 150 horas em atividades
          complementares que envolvam atividades em ensino, pesquisa ou
          extensão, devendo ser desenvolvidas pelo acadêmico durante a
          integralização do Curso. As Atividades Complementares são de total
          responsabilidade dos acadêmicos, cabendo à Coordenação do Curso cobrar
          o cumprimento da carga horária no decorrer do curso.
        </p>
        <p className="text-white">
          As Atividades Complementares são componentes curriculares
          enriquecedores e implementadores do próprio perfil do formando e
          deverão possibilitar o desenvolvimento de habilidades, conhecimentos,
          competências e atitudes do aluno, inclusive as adquiridas fora do
          ambiente acadêmico, que serão reconhecidas mediante processo de
          avaliação. As Atividades Complementares podem incluir atividades
          desenvolvidas na própria Instituição ou em outras instituições e
          variados ambientes sociais, técnico-científicos ou profissionais de
          formação profissional, incluindo experiências de trabalho, estágios
          não obrigatórios, extensão universitária, iniciação científica,
          participação em eventos técnico-científicos, publicações científicas,
          programas de monitoria e tutoria, disciplinas de outras áreas,
          representação discente em comissões e comitês, participação em
          empresas juniores, incubadoras de empresas ou outras atividades de
          empreendedorismo e inovação.
        </p>
        <p className="text-white">
          As Atividades Complementares devem ser realizadas em área específica
          ou afim do curso e/ou relacionados aos temas transversais, sendo
          desenvolvidas na instituição ou fora dela. As normas para o
          cumprimento das Atividades Complementares do Curso de Bacharelado em
          Sistemas de Informação do Campus Universitário de Sinop, estão
          Regulamentadas pela{" "}
          <a href="http://www.unemat.br/resolucoes/resolucoes/conepe/1748_res_conepe_297_2004.pdf">
            <b className="text-blue-900">RESOLUÇÃO Nº 297/2004 - CONEPE</b>
          </a>{" "}
          de 14 de dezembro de 2004 e as normas internas, a serem definidas pelo
          NDE, coordenação de curso e docentes.
        </p>
      </div>
      <Separator />
    </section>
  );
};

AdditionalActivities.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AdditionalActivities;
