import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";

const Values = [
  {
    name: "Respeito",
  },
  {
    name: "Democracia",
  },
  {
    name: "Comprometimento",
  },
  {
    name: "Humanismo",
  },
  {
    name: "Inovação",
  },
  {
    name: "Sustentabilidade",
  },
];

const Principles = [
  {
    name: "Honrar os critérios éticos e de cidadania",
  },
  {
    name: "Transparência em todas atividades e processos",
  },
  {
    name: "Garantir a aceitação do pluralismo de ideias e saberes",
  },
  {
    name: "Respeitar e priorizar decisões colegiadas",
  },
  {
    name: "Excelência na formação de profissionais e cidadãos responsáveis",
  },
  {
    name: "Compromisso no desenvolvimento e projetos em prol da sociedade",
  },
  {
    name: "Valorização humana e profissional",
  },
  {
    name: "Justiça, liberdade, igualdade e cidadania",
  },
  {
    name: "Priorizar e incentivar a criatividade e o empreendedorismo na comunidade acadêmica",
  },
  {
    name: "Promoção da ciência e tecnologia na sociedade",
  },
  {
    name: "Respeito ao meio ambiente e a sustentabilidade na execução das atividades e projetos acadêmicos",
  },
];

const CoursePurpose: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2 pl-4">
      <h1 className="pl-4 text-xl">
        Propósito do Curso de Sistemas de Informação
      </h1>
      <div className="h-[60vh] w-full justify-start border pl-4 pr-10">
        <h2 className="">MISSÃO</h2>
        <p>
          Contribuir com a sociedade na formação de profissionais com
          habilidades técnicas, inovadoras, social, ética e humanística no que
          tange a gestão de tecnologia e informática para a construção de uma
          sociedade democrática, participativa e sustentável.
        </p>
      </div>
      <div className="h-[60vh] w-full justify-start border pl-4 pr-10">
        <h2>VISÃO DE FUTURO</h2>
        <p>
          Ser reconhecido com excelência no ensino, pesquisa e extensão na
          ciência e tecnologia (C&T) pela sociedade.
        </p>
      </div>
      <div className="flex h-[60vh] w-full justify-start gap-12 pl-4 pr-10">
        <div className="flex w-1/5 flex-col justify-center">
          <table className="flex flex-col border ">
            <thead className="gap-4 ">
              <tr className="flex">
                <th className="">VALORES</th>
              </tr>
            </thead>
            <tbody className="">
              {Values.map((value, index) => (
                <tr key={index} className="flex border">
                  <td className=" text-left">{value.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <table className="flex flex-col border">
            <thead className="gap-4 ">
              <tr className="flex ">
                <th className="">PRINCÍPIOS</th>
              </tr>
            </thead>
            <tbody className="">
              {Principles.map((value, index) => (
                <tr key={index} className="flex border">
                  <td className=" text-left">{value.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

CoursePurpose.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurpose;
