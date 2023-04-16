import Layout from "../Layout";
import type { NextPageWithLayout } from "~/types/layout";
import type { ReactElement } from "react";

const PageThree: NextPageWithLayout = () => {
  return (
    <section className="flex ">
      <section
        className={`relative flex h-full w-[100vw] flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
      >
        <h1 className="text-[2rem] font-bold">Pagina tres</h1>
      </section>
    </section>
  );
};

PageThree.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PageThree;
