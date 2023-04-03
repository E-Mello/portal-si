import Layout from "../../../components/Layout";
import type { NextPageWithLayout } from "../../../types/layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import type { ReactElement } from "react";
import { Separator } from "../../../components/ui/separator";

interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

const data = [
  {
    id: 1,
    desc: "Ementas de todas as disciplinas do curso",
    link: "/ementa",
  },
  {
    id: 2,
    desc: "Bibliografias de todas as disciplinas do curso",
    link: "/bibliografia",
  },
];

const AuthenticatedEmentas: NextPageWithLayout = () => {
  return (
    <ProtectedRoute>
      <section className="relative flex h-[80vh] w-full flex-col items-start justify-center gap-4 py-2">
        <h1 className="pl-4 text-xl">Ementas e Bibliografias</h1>
        <p className="pl-4">
          Aqui você encontra as ementas e bibliografias de todas as disciplinas
          do curso.
        </p>
        <Separator />
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <p key={item.id}>
              {item.desc} Link para visualização
              <a href={`${item.link}`}>Link para visualização</a>
            </p>
          ))}
        </div>
      </section>
    </ProtectedRoute>
  );
};

AuthenticatedEmentas.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AuthenticatedEmentas;
