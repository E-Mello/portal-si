import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
// import { Layout } from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
} from "react";
import Layout from "../components/Layout";
import Image from "next/image";
// import LogoUnemat from "../assets/LogoUnemat.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

import { Separator } from "../components/ui/separator";
import Link from "next/link";

const CoursePurpose: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
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
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <table>
          <thead>
            <tr>
              <th>VALORES</th>
              <th>PRINCÍPIOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Respeito</td>
              <td>2. Democracia</td>
              <td>3. Comprometimento</td>
              <td>4. Humanismo</td>
              <td>5. Inovação</td>
              <td>6. Sustentabilidade</td>
            </tr>
            <tr>
              <td>
                <p>1. Honrar os critérios éticos e de cidadania</p>
                <p>2. Transparência em todas atividades e processos</p>
              </td>
              <td>
                <p>3. Garantir a aceitação do pluralismo de ideias e saberes</p>
                <p>4. Respeitar e priorizar decisões colegiadas</p>
              </td>
              <td>
                <p>
                  5. Excelência na formação de profissionais e cidadãos
                  responsáveis
                </p>
                <p>
                  6. Compromisso no desenvolvimento e projetos em prol da
                  sociedade
                </p>
              </td>
              <td>
                <p>7. Valorização humana e profissional.</p>
                <p>8. Justiça, liberdade, igualdade e cidadania</p>
              </td>
              <td>
                <p>
                  9. Priorizar e incentivar a criatividade e o empreendedorismo
                  na comunidade acadêmica
                </p>
                <p> 10. Promoção da ciência e tecnologia na sociedade</p>
              </td>
              <td>
                <p>
                  11. Respeito ao meio ambiente e a sustentabilidade na execução
                  das atividades e projetos acadêmicos
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

CoursePurpose.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurpose;
