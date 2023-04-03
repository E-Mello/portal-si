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

const AuthenticatedClassSchedule: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
        <h1 className="pl-4 text-xl">
          Link de acesso aos horários de cada semestre
        </h1>
        <span className="pl-4">
          Os links abaixo direcionam para os horários de cada semestre do curso
          de Bacharelado em Sistemas de Informação.
        </span>
        <div className="h-[60vh] w-full justify-start pl-4 pr-10">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border border-black">Ano</th>
                <th className="border border-black">Semestre</th>
                <th className="border border-black">Link</th>
              </tr>
            </thead>
            <tbody>
              {time.map((semester, index) => (
                <tr key={index}>
                  <td className="border border-black">{semester.Ano}</td>
                  <td className="border border-black">{semester.Semestre}</td>
                  <td className="border border-black">
                    <a href={semester.Link} target="_blank" rel="noreferrer">
                      Acessar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedClassSchedule.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedClassSchedule;
