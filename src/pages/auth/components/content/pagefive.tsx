import Layout from "../Layout";
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";

const PageFive: NextPageWithLayout = () => {
  return (
    <section className="flex w-full">
      <section
        className={`relative flex h-full w-full flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
      >
        <h1 className="text-[2rem] font-bold">Pagina cinco</h1>
      </section>
    </section>
  );
};

PageFive.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PageFive;
