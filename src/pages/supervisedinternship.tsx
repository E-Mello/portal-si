import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { Separator } from "../components/ui/separator";
import { api } from "~/utils/api";

const SupervisedInternship: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.supervisedInternship.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-[100vh] w-full  py-2">
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <h1 className="pb-4 text-3xl font-bold text-white">
              {pageData.title}
            </h1>
            {pageData.content?.split("+").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
            <br></br>
            <span className="text-white">{pageData.info} </span>
            <Link
              className="text-blue-900"
              target="_blank"
              href={pageData.link || "/"}
            >
              <b>{pageData.nameLink}</b>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

SupervisedInternship.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default SupervisedInternship;
