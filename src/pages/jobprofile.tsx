import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const JobProfile: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.jobProfile.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-[100vh] w-full items-start justify-center pl-4 pt-4 max-sm:h-full ">
      <div className="flex flex-col gap-4 ">
        <h1 className=" text-2xl font-bold">{pageData?.title}</h1>
        <span>
          {pageData?.content?.split("+").map((item, index) => (
            <p key={index}>{item.trim()}</p>
          ))}
        </span>
      </div>
    </section>
  );
};

JobProfile.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default JobProfile;
