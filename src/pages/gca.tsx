import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Layout from "~/components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";

const AppliedComputingGroup: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.gca.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white max-sm:block">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Grupo de Computação apliCada (GCA)
        </h1>
        <p className="text-justify">
          As atividades de Pesquisa e Desenvolvimento (P&D) do curso de Sistemas
          de Informação estão relacionadas principalmente ao Grupo de Computação
          apliCada (GCA). Os membros do grupo GCC, lotados na Faculdade de
          Ciências Exatas e Tecnológica do Campus Universitário de Sinop
          concentram-se nas seguintes subáreas da Computação:
        </p>
        {
          <code className="text-white">
            <i>
              {`>> Sistemas Computacionais;`} <br />
              {`>> Sistemas Inteligentes;`} <br />
              {`>> Tecnologias Emergentes.`}
            </i>
          </code>
        }
        <p className="text-justify">
          O grupo de pesquisa GCC, no qual os docentes estão relacionados, está
          institucionalizado na UNEMAT e no Diretório de Grupos de Pesquisa
          (DGP) do CNPQ, pode ser acessado aqui. Porém, os docentes do curso de
          Sistemas de Informação estão presentes em diversos outros grupos de
          pesquisa em diferentes instituições do país, como:GIE/FACIN- Grupo de
          pesquisa em Informática na Educação da FACIN
        </p>
        {
          <code className="text-white ">
            <i>
              {`>> Grupo de Pesquisa em Aquisição e Representação de Dados Espaciais;`}{" "}
              <br />
              {`>> Grupo de Realidade Virtual;`} <br />
              {`>> Hu-S.ER - Human-System Experience Research group`} <br />
              {`>> IMAGE  Investigações em Matemática Aplicada e GeociênciasModelagem, `}{" "}
              <br />
              {`>> Síntese e Projeto de Microeletrônica e `} <br />
              {`>> Sistemas EmbarcadosSistemas Eletrônicos Digitais e Imagens `}
            </i>
          </code>
        }
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <h3 className="">Aquisição de Recursos:</h3>
        <p className="text-justify">
          A Aquisição de Recursos Externos por meio de agências de fomento ao
          longo de 6 anos chega a aproximadamente R$ 240.000,00, isso devido ao
          empenho dos professores vinculados ao curso de Sistemas de Informação.
          Esses recursos são utilizados no desenvolvimento dos projetos de
          pesquisa e auxiliam no desenvolvimento do curso, além de trazer
          oportunidades de bolsas aos estudantes e os materiais permanentes
          posteriormente tornam-se patrimônio da universidade.
        </p>
        <p className="text-justify">
          Atualmente, o grupo de pesquisa tem um projeto aprovado na CAPES
          intitulado “ Provas Presenciais Conectadas”, Edital/CAPES Nº 40/2017,
          e dois projetos de pesquisa vigentes na FAPEMAT, um sob a Coordenação
          do Prof. Dr. Maicon Aparecido Satin intitulado “Sistema Inteligente
          para a Identificação de Deficiência de Nutriente pela Folha da Soja”,
          Edital Universal/FAPEMAT Nº 042/2016, e outro sob a coordenação do
          Prof. Dr. Marcelo Leandro Holzschuh intitulado “Modelagem de dados do
          Cadastro Técnico Multifinalitário integrando dados bidimensionais e
          tridimensionais, servindo de subsídio para um Observatório de
          Geoprocessamento”, Edital Universal 005/2015. Na tabela a seguir
          destaca-se a evolução da aquisição de recursos por meio dos projetos.
        </p>
        <br />
        <Table className="w-full max-sm:w-3/5">
          <TableCaption>A list of your recent invoices</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="">Docente</TableHead>
              <TableHead className="">Edital</TableHead>
              <TableHead className="">Agência de Fomento</TableHead>
              <TableHead className="">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {pageData?.map((data) => (
              <TableRow key={data.id}>
                <TableCell className=" ">{data.name}</TableCell>
                <TableCell className="">{data.notice}</TableCell>
                <TableCell className="">{data.developmentagency}</TableCell>
                <TableCell className="">
                  {parseFloat(data.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className=" text-end" colSpan={4}>
                <span className="flex h-0.5 text-start">Total</span>
                R$
                {pageData
                  ?.reduce((total, data) => {
                    const value = parseFloat(data.value);
                    return isNaN(value) ? total : total + value;
                  }, 0)
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                <span className=""></span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

AppliedComputingGroup.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AppliedComputingGroup;
