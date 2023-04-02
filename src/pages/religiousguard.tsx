import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

const ReligiousGuard: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">Guarda Religiosa</h1>
        <p className="text-white">
          A Instrução Normativa 01/2018 estabelece normas para a realização do
          regime de guarda religiosa e Regulamenta o art. 2o da{" "}
          <a href="http://www.al.mt.gov.br/storage/webdisco/leis/lei-9274-2009.pdf">
            <b className="text-blue-900">Lei Estadual n. 9.274</b>
          </a>
          , de 16 de dezembro de 2009, no âmbito do curso de Bacharelado em
          Sistemas de Informação do Campus Universitário de Sinop, da
          Universidade do Estado de Mato Grosso.
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1LrTihI7WYStTvcEpVUhQKUuqQlMs3Jb8/view?usp=sharing">
            <b className="text-blue-900"> Instrução Normativa 01/2018 </b>
          </a>
        </li>
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1LsQ6Fds0vRHt9EEbIOHlJ_ebcfqFVyGN/view?usp=sharing">
            <b className="text-blue-900">
              {" "}
              Instrução Normativa 01/2018 - Anexo I
            </b>
          </a>
        </li>
        <li className="text-white">
          <a href="https://drive.google.com/file/d/1Lu4VhS68y80V09rsgLTpj7yrxEFB-KLc/view?usp=sharing">
            <b className="text-blue-900">
              {" "}
              Instrução Normativa 01/2018 - Anexo II{" "}
            </b>
          </a>
        </li>
      </div>
      <Separator />
    </section>
  );
};

ReligiousGuard.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ReligiousGuard;
