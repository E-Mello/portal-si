import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { HiOutlineCursorClick } from "react-icons/hi";
import Layout from "~/components/Layout";
import Link from "next/link";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import { api } from "~/utils/api";

type Teacher = {
  id: number;
  name: string;
  qualification: string;
  area: string;
  email: string;
  lattes: string;
};

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


  // Group teachers by school year and class
  const teachersByClass: { [key: string]: Teacher[] } = {};
  pageData.forEach((teacher) => {
    teacher.schoolYear.forEach((schoolYear) => {
      const classKey = `${schoolYear.class.year}/${schoolYear.class.semester}`;
      if (!teachersByClass[classKey]) {
        teachersByClass[classKey] = [];
      }
      teachersByClass[classKey]?.push(teacher);
    });
  });

  return (
    <section className="relative  flex h-[80vh] w-full flex-col items-start justify-center py-2">
      <h1 className="pl-4 text-lg">Docentes por semestre</h1>
      <div className="h-[60vh] w-full justify-start pl-4 pr-10">
        <Accordion type="single" className="flex flex-col" collapsible>
          {Object.keys(teachersByClass).map((classKey) => (
            <AccordionItem key={classKey} value={classKey}>
              <AccordionTrigger>{classKey}</AccordionTrigger>
              <AccordionContent>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border">Name</th>
                      <th className="border">Qualification</th>
                      <th className="border">Area</th>
                      <th className="border">Email</th>
                      <th className="border">Lattes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachersByClass[classKey]?.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="border">{teacher.name}</td>
                        <td className="border">{teacher.qualification}</td>
                        <td className="border">{teacher.area}</td>
                        <td className="border">{teacher.email}</td>
                        <td className=" border pl-3 ">
                          <Link target="_blank" href={`${teacher.lattes}`}>
                            <HiOutlineCursorClick />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
