import Layout from "../../../components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import type { ReactElement } from "react";

interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

const collegiate = [
  {
    Nome: "Prof. Dr. José Carlos de Oliveira",
    Segmento: "Docente",
    Email: "jose.pereira@unemat.br",
    Vigencia: "2021-2023",
  },
  {
    Nome: "Édio de Melo Pereira",
    Segmento: "Docente",
    Email: "edio.pereira@unemat.br",
    Vigencia: "2021-2023",
  },
];

const AuthenticatedColegiado: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
        <h1 className="pl-4 text-xl">Colegiado do curso</h1>
        <span className="pl-4">
          O quadro a seguir apresenta a relação de membros do colegiado do curso
          de Bacharelado em Sistemas de Informação.
        </span>
        <div className="h-[60vh] w-full justify-start pl-4 pr-10">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border border-black">Nome</th>
                <th className="border border-black">Segmento</th>
                <th className="border border-black">Email</th>
                <th className="border border-black">Vigência</th>
              </tr>
            </thead>
            <tbody>
              {collegiate.map((member, key) => (
                <tr key={key}>
                  <td className="border border-black">{member.Nome}</td>
                  <td className="border border-black">{member.Segmento}</td>
                  <td className="border border-black">{member.Email}</td>
                  <td className="border border-black">{member.Vigencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedColegiado.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedColegiado;
