import { type NextPage } from "next";

import { api } from "../../../utils/api";
// import { Layout } from "../components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import type { ReactElement } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
// import LogoUnemat from "../assets/LogoUnemat.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

import { Separator } from "../../../components/ui/separator";
import Link from "next/link";

const JobProfile: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
      <h1 className="pl-4 text-xl">
        Perfil Profissional de um profissional de Sistemas de Informação
      </h1>
      <p className="pl-4">
        O bacharel em Sistemas de Informação (BSI) é uma evolução natural do
        profissional de tecnologia da informação, o curso proporciona o
        alinhamento dos conhecimentos em computação e o conhecimento em gestão.
        Sua formação é focada no desenvolvimento, manutenção e gestão de
        sistemas de informação dos dados de uma organização, seja para capturar,
        armazenar ou processar estes dados.
      </p>
      <p className="pl-4">
        O profissional formado no curso de Bacharelado em Sistemas de Informação
        poderá atuar em empresas de diferentes ramos de atividades, no setor
        específico de computação e/ou desenvolvimento, implementação e
        gerenciamento de sistemas computacionais, desempenhando as funções de
        analista de sistemas, projetista de sistemas, analista de suporte de
        sistemas, de chefia intermediária e superior.
      </p>
      <p className="pl-4">
        Esses profissionais atuam em empresas da área computacional que prestam
        serviços e produtos, como exemplo: empresas de consultorias e em
        empresas dedicadas ao desenvolvimento tanto de hardware quanto de
        software. Além disso, o profissional poderá atuar em pesquisa
        científica, bem como ser capaz de inovar, planejar e gerenciar a
        infraestrutura de tecnologia da informação em organizações.
      </p>
      <p className="pl-4">
        Esses profissionais atuam em empresas da área computacional que prestam
        serviços e produtos, como exemplo: empresas de consultorias e em
        empresas dedicadas ao desenvolvimento tanto de hardware quanto de
        software. Além disso, o profissional poderá atuar em pesquisa
        científica, bem como ser capaz de inovar, planejar e gerenciar a
        infraestrutura de tecnologia da informação em organizações.
      </p>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10"></div>
    </section>
  );
};

JobProfile.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default JobProfile;
