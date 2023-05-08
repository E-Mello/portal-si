import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";

const AboutCourse: NextPageWithLayout = () => {
  return (
    <section className="relative flex w-full flex-col items-start justify-center gap-4 py-2 pl-4 pt-10">
      <div>
        <h1 className=" pb-4 text-xl">Sobre o curso</h1>
        <div className="flex  w-full flex-col pr-10">
          <p className="pb-4">
            O curso de de Bacharelado em Sistemas de informação (BSI) é
            considerado de atividade-fim, que visa a formação de profissionais
            em computação ou informática com intuito principal de automatizar
            sistemas para gerência de informação nas organizações. A área de
            Sistemas de Informação lida com sistemas complexos em empresas e
            governo, com a necessidade de conhecimentos técnicos e
            organizacionais em seu projeto, desenvolvimento e gerenciamento para
            trazer suporte na tomada de decisão e nas estratégias das
            organizações. Os Sistemas de Informação e as Tecnologias da
            Informação e Comunicação nas organizações destacam-se pelo uso
            eficiente de recursos oferecendo um impacto significativo na
            produtividade e na competitividade das empresas nacionais e
            internacionais, em um mundo globalizado e competitivo. Em Sistemas
            de Informação abrange-se em sua formação a aquisição de conhecimento
            teórico e prático, de técnicas e ferramentas computacionais
            necessárias para desenvolver, selecionar, aplicar e gerir soluções
            de forma a atender às necessidades da sociedade. Os conhecimentos
            adquiridos na formação do Bacharelado em Sistemas de informação
            estão vinculados principalmente as áreas de Ciência da Computação,
            Matemática e Administração. O curso visa uma formação sólida na área
            da computação, com uma grande diversidade de conteúdos como:
            <br />
            <br /> Algoritmos e complexidade;
            <br /> Arquitetura e organização de computadores;
            <br /> Banco de dados;
            <br /> Circuitos digitais;
            <br /> Computação gráfica;
            <br /> Engenharia de software;
            <br /> Estruturas de dados;
            <br /> Fundamentos de linguagens;
            <br /> Inteligência artificial e computacional;
            <br /> Interação humano-computador;
            <br /> Linguagens formais e autômatos;
            <br /> Lógica;
            <br /> Sistemas multimídias e hipermídias;
            <br /> Processamento de imagens;
            <br /> Processamento distribuído;
            <br /> Processamento paralelo;
            <br /> Programação;
            <br /> Realidade virtual;
            <br /> Redes de computadores;
            <br /> Robótica;
            <br /> Segurança;
            <br /> Sistemas embarcados;
            <br /> Sistemas operacionais;
            <br /> Entre outros..
          </p>
        </div>
      </div>
    </section>
  );
};

AboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourse;
