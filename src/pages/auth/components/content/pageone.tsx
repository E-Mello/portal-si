import { type NextPage } from "next";

import { api } from "~/utils/api";
// import { Layout } from "../components/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import type {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
} from "react";
import Layout from "../Layout";
import Image from "next/image";
// import LogoUnemat from "../assets/LogoUnemat.png";
interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

import { Separator } from "~/pages/auth/components/content/components/ui/separator";
import Link from "next/link";

const time = [
  {
    Ano: 2020,
    Semestre: 1,
    Link: "https://drive.google.com/drive/u/0/folders/14YTNvKNKe-tM7qMKmx0QmRUqREP8EyFh",
  },
  {
    Ano: 2020,
    Semestre: 2,
    Link: "https://drive.google.com/drive/u/0/folders/14YTNvKNKe-tM7qMKmx0QmRUqREP8EyFh",
  },
];

const PageOne: NextPageWithLayout = () => {
  return (
    <section className="flex w-full">
      <section
        className={`relative flex h-full w-full flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
      >
        <h1 className="text-[2rem] font-bold">Painel de teste</h1>
        <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas ao curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas a Estrutura Curricular
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas aos Eventos do Curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas as Regulamentacoes Internas
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas aos projetos do curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-bold">
                Paginas relacionadas as Publicacoes do curso
              </h1>
            </div>
            <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
          </div>
        </div>
      </section>
    </section>
  );
};

PageOne.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PageOne;
