import React, { ReactElement, useRef } from "react";

import { HeaderPage } from "../components/HeaderPage";
import Image from "next/image";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../types/layout";
import { Separator } from "../components/ui/separator";
import { cn } from "../utils/cn";
import { isActiveMenuTCCAtom } from "../atoms/activeMenuTCCAtom";
import { useAtom } from "jotai";

const Tcc: NextPageWithLayout = () => {
  const imageRef = useRef(null);
  const [isActiveMenuTCC, setIsActiveMenuTCC] = useAtom(isActiveMenuTCCAtom);
  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-between text-white `}
    >
      <HeaderPage
        classNameImg="flex h-full w-full"
        src01="https://pngimg.com/d/book_PNG2109.png"
        src02="https://images.tcdn.com.br/img/img_prod/606732/produto_teste_3919_1_85010fa0e84b19ffcfe78386f6f702cd.jpg"
        nIMG={2}
      />
      <Separator
        className={cn("bg-gradient-to-b from-zinc-900 to-[#0e0e0f00]")}
      />
      <main
        className={`relative flex h-full w-full flex-col items-center justify-center`}
      >
        <div className="flex h-full w-full justify-start ">
          <div className="flex gap-5 pl-2">
            <button
              type="submit"
              className="rounded-md border-2 border-white"
              onClick={() => setIsActiveMenuTCC(!isActiveMenuTCC)}
            >
              TCC's Teoricos
            </button>
            <button
              type="submit"
              className="rounded-md border-2 border-white"
              onClick={() => setIsActiveMenuTCC(!isActiveMenuTCC)}
            >
              TCC's Praticos
            </button>
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-start pt-6">
          {isActiveMenuTCC == true ? (
            <div>
              <div
                className={`group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Estudo do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start justify-center gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Estudo do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
              <div
                className={`group flex cursor-pointer flex-col items-start gap-1 rounded-md p-2 pl-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-800`}
              >
                <span className={`text-lg font-bold`}>
                  DASHBOARD INTERATIVO DE INFORMAÇÕES ACADÊMICAS
                </span>
                <span className={`flex text-start  text-xs `}>
                  Resumo: O presente trabalho tem como objetivo desenvolver um
                  sistema web para a gestão de informações acadêmicas de alunos
                  e professores de uma instituição de ensino superior. O sistema
                  será desenvolvido utilizando a linguagem de programação PHP, o
                  framework Laravel e o banco de dados MySQL. O sistema será
                  composto por um dashboard interativo, que será responsável por
                  apresentar informações sobre o desempenho acadêmico dos alunos
                  e professores, além de informações sobre a instituição de
                  ensino. O sistema também contará com um sistema de login, que
                  será responsável por autenticar os usuários do sistema. O
                  sistema será desenvolvido utilizando a metodologia ágil SCRUM.
                </span>
                <span className={`text-start text-xs`}>
                  Area de Aplicacao do projeto: Web Development
                </span>
                <span className={`text-start text-xs`}>
                  Nome do aluno: Edio de Melo Pereira
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

Tcc.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Tcc;
