import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

const CoursePurpose: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.coursePurpose.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const fieldsets = [
    { title: pageData?.info, content: pageData?.content },
    { title: pageData?.info02, content: pageData?.content02 },
    { title: pageData?.info03, content: pageData?.content03 },
    { title: pageData?.info04, content: pageData?.content04 as string },
  ];
  return (
    <section className="flex h-[100vh] w-full  items-start justify-center gap-4 pl-4 pt-4 max-sm:h-full">
      <div className="flex flex-col gap-2 pr-4">
        <h1 className="text-2xl font-bold">{pageData?.title}</h1>
        {fieldsets.map((fieldset, index) => (
          <section key={index} className="flex flex-col gap-4">
            <fieldset className="justify-start border pb-2 pl-4 pt-2">
              <legend className="text-xl">{fieldset.title}</legend>
              {fieldset.content?.split(";").map((item, key) => (
                <p key={key}>{item.trim()}</p>
              ))}
            </fieldset>
            <div className="flex"></div>
          </section>
        ))}
      </div>
    </section>
  );
};

CoursePurpose.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CoursePurpose;
