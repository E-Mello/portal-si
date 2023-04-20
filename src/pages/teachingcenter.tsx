import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";

const members = [
  {
    Nome: "Prof. Dr. José Carlos de Oliveira",
    Tipo: "Membro",
    Email: "jose.pereira@unemat.br",
    Vigencia: "01/01/2019 - 31/12/2021",
  },
  {
    Nome: "Édio de Melo Pereira",
    Tipo: "Membro Nato",
    Email: "edio.pereira@unemat.br",
    Vigencia: "01/01/2019 - 31/12/2021",
  },
  {
    Nome: "Prof John Doe",
    Tipo: "Cordenador",
    Email: "john.doe@unemat.br",
    Vigencia: "01/01/2019 - 31/12/2021",
  },
];

const TeachingCenter: NextPageWithLayout = () => {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
      <h1 className="pl-4 text-xl">Núcleo Docente Estruturante (NDE)</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros designados ao Núcleo
        Docente Estruturante (NDE) do curso de Bacharelado em Sistemas de
        Informação.
      </span>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Vigência</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.Nome}>
                <td className="border border-gray-300 p-2">{member.Nome}</td>
                <td className="border border-gray-300 p-2">{member.Tipo}</td>
                <td className="border border-gray-300 p-2">{member.Email}</td>
                <td className="border border-gray-300 p-2">
                  {member.Vigencia}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

TeachingCenter.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TeachingCenter;
