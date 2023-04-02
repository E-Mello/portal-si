import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";

interface Members {
  Docente: string;
  Valor: number;
  Edital: string;
  AgFomento: string;
}

const members: Members[] = [
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 21800,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 5000,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 16402,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 34783,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 39500,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
  {
    Docente: "Prof. Dr. José Carlos de Oliveira",
    Valor: 123500,
    Edital: "Edital Nº. 006/2010",
    AgFomento: "FAPEMAT",
  },
];

const AppliedComputingGroup: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-full w-[80vw] flex-col items-start justify-center gap-4 py-2">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Grupo de Computação apliCada (GCC)
        </h1>
        <p>
          As atividades de Pesquisa e Desenvolvimento (P&D) do curso de Sistemas
          de Informação estão relacionadas principalmente ao Grupo de Computação
          apliCada (GCC). Os membros do grupo GCC, lotados na Faculdade de
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
        <p>
          O grupo de pesquisa GCC, no qual os docentes estão relacionados, está
          institucionalizado na UNEMAT e no Diretório de Grupos de Pesquisa
          (DGP) do CNPQ, pode ser acessado aqui. Porém, os docentes do curso de
          Sistemas de Informação estão presentes em diversos outros grupos de
          pesquisa em diferentes instituições do país, como:GIE/FACIN- Grupo de
          pesquisa em Informática na Educação da FACIN
        </p>
        {
          <code className="text-white">
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
        <p>
          A Aquisição de Recursos Externos por meio de agências de fomento ao
          longo de 6 anos chega a aproximadamente R$ 240.000,00, isso devido ao
          empenho dos professores vinculados ao curso de Sistemas de Informação.
          Esses recursos são utilizados no desenvolvimento dos projetos de
          pesquisa e auxiliam no desenvolvimento do curso, além de trazer
          oportunidades de bolsas aos estudantes e os materiais permanentes
          posteriormente tornam-se patrimônio da universidade.
        </p>
        <p>
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
        <table className="table-auto border">
          <thead>
            <tr className="border">
              <th className="border">Docente</th>
              <th className="border">Valor</th>
              <th className="border">Edital</th>
              <th className="border">Agência de Fomento</th>
            </tr>
          </thead>
          <tbody className="border">
            {members?.map((member: Members) => (
              <tr>
                <td className="border">{member.Docente}</td>
                <td className="border">{member.Valor}</td>
                <td className="border">{member.Edital}</td>
                <td className="border">{member.AgFomento}</td>
              </tr>
            ))}
            <tr>
              <td className="border">Total</td>
              {<td className="border">R$ 240.000,00</td>}
            </tr>
          </tbody>
        </table>
      </div>
      <Separator />
    </section>
  );
};

AppliedComputingGroup.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AppliedComputingGroup;
