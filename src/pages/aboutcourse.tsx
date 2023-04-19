import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { type ReactElement } from "react";
import { api } from "~/utils/api";

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
    <section className="relative top-0 flex h-[150vh] w-full flex-col items-start justify-center gap-4 py-2">
      {pageData?.map((data) => (
        <>
          <h1 key={data.id} className="pl-4 text-xl">
            {data.title}
          </h1>
          <div className="flex h-[50vh] w-full flex-col justify-start pl-4 pr-10">
            <p>{data.content}</p>
          </div>
        </>
      ))}
    </section>
  );
};

AboutCourse.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AboutCourse;
