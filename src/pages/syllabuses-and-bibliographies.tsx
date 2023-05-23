import Layout from "~/components/Layout";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const Ementas: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.syllabusesAndBibliographies.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-[100vh] w-full flex-col items-start justify-start gap-4 pl-4 pt-4 ">
      <div className="flex flex-col gap-4">
        <legend className="text-xl">{pageData[0]?.title}</legend>
        <p className="">{pageData[0]?.info}</p>
        <div className="flex h-full w-full flex-col gap-2">
          <legend className="text-xl">{pageData[0]?.content02}</legend>
          <Link
            target="_blank"
            href={pageData[0]?.info02 || "/"}
            className="flex "
          >
            <span>Acessar</span>
            <LinkIcon />
          </Link>
        </div>

        <div className="flex h-full w-full flex-col gap-2">
          <legend className="text-xl">{pageData[0]?.content03}</legend>
          <Link
            target="_blank"
            href={pageData[0]?.info03 || "/"}
            className="flex gap-2"
          >
            <span className="flex">Acessar</span>
            <LinkIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

Ementas.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Ementas;
