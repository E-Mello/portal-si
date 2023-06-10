import Layout from "../components/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const ReligiousGuard: NextPageWithLayout = () => {
  const {
    data: pageData,
    isError,
    isLoading: pageIsLoading,
  } = api.religiousGuard.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-[100vh] w-full flex-col gap-4 py-2 pl-2 pr-4 max-sm:pl-0">
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <h1 className="pb-4 text-3xl font-bold text-white">
              {pageData.title}
            </h1>
            {pageData.content?.split("+").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 pl-4">
        {pageData && (
          <div>
            <li className="text-white">
              <Link target="_blank" href={pageData.link || ""}>
                <b className="text-blue-900">{pageData.nameLink}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info02 || ""}>
                <b className="text-blue-900">{pageData.content02}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info03 || ""}>
                <b className="text-blue-900">{pageData.content03}</b>
              </Link>
            </li>
            <li className="text-white">
              <Link target="_blank" href={pageData.info04 || ""}>
                <b className="text-blue-900">{pageData.content04}</b>
              </Link>
            </li>
          </div>
        )}
      </div>
    </section>
  );
};

ReligiousGuard.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ReligiousGuard;
