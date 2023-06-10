import { api } from "~/utils/api";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";

const AboutCourse: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.aboutcourse.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex h-[100vh] items-start justify-center gap-4 bg-zinc-800 pl-4 pt-4 max-sm:h-full">
      {pageData && (
        <div className="flex flex-col ">
          <h1 className=" pb-4 text-3xl font-bold">{pageData.title}</h1>
          <div className="flex  w-full flex-col pr-4">
            {pageData?.content?.split(/[;:]/).map((item, index) => (
              <p className="text-justify" key={index}>
                {item.trim()}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

AboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourse;
