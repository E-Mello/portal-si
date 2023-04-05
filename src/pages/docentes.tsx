import { type NextPage } from "next";

import { api } from "../utils/api";
// import { Layout } from "../components/Layout";
import type { NextPageWithLayout } from ".././types/layout";
import type {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
} from "react";
import Layout from "../components/Layout";
import Image from "next/image";
// import LogoUnemat from "../assets/LogoUnemat.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
interface Semesters {
  [key: string]: {
    Ano: number;
    Semestre: number;
    Link: string;
  }[];
  // other properties
}

import { Separator } from "../components/ui/separator";
import Link from "next/link";

const semesters: Semesters = {
  2018: [
    {
      Ano: 2018,
      Semestre: 1,
      Link: "/docentes/2018/1",
    },
    {
      Ano: 2018,
      Semestre: 2,
      Link: "/docentes/2018/2",
    },
  ],
  2019: [
    {
      Ano: 2019,
      Semestre: 1,
      Link: "/docentes/2019/1",
    },
    {
      Ano: 2019,
      Semestre: 2,
      Link: "/docentes/2019/2",
    },
  ],
  2020: [
    {
      Ano: 2020,
      Semestre: 1,
      Link: "/docentes/2020/1",
    },
    {
      Ano: 2020,
      Semestre: 2,
      Link: "/docentes/2020/2",
    },
  ],
  2021: [
    {
      Ano: 2021,
      Semestre: 1,
      Link: "/docentes/2021/1",
    },
    {
      Ano: 2021,
      Semestre: 2,
      Link: "/docentes/2021/2",
    },
  ],
  2022: [
    {
      Ano: 2022,
      Semestre: 1,
      Link: "/docentes/2022/1",
    },
    {
      Ano: 2022,
      Semestre: 2,
      Link: "/docentes/2022/2",
    },
  ],
  2023: [
    {
      Ano: 2023,
      Semestre: 1,
      Link: "/docentes/2023/1",
    },
  ],
};

const Docentes: NextPageWithLayout = () => {
  return (
    <section className="relative  flex h-[80vh] w-full flex-col items-start justify-center py-2">
      <h1 className="text-lg pl-4">Docentes por semestre</h1>
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
