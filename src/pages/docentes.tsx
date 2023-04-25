import { type NextPage } from "next";

import { api } from "../utils/api";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

import { Separator } from "../components/ui/separator";
import Link from "next/link";

const Docentes: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.teachers.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="relative  flex h-[80vh] w-full flex-col items-start justify-center py-2">
      <h1 className="pl-4 text-lg">Docentes por semestre</h1>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <Accordion type="single" className="flex flex-col" collapsible>
          {Object.keys(semesters).map((year) => (
            <AccordionItem key={year} value={year}>
              <AccordionTrigger>{year}</AccordionTrigger>
              <AccordionContent>
                {semesters?.[year]?.map((semester) => (
                  <div key={`${year}-${semester.Semestre}`}>
                    <Link href={semester.Link}>
                      Semester {semester.Semestre}
                    </Link>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

Docentes.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Docentes;
