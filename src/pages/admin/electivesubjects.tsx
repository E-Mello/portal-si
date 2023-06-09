/* eslint-disable @typescript-eslint/no-misused-promises */
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement, useEffect } from "react";
import { api } from "~/utils/api";
import { HiOutlinePlus } from "react-icons/hi";
import { EditElectiveSubjectForm } from "~/components/Forms/ElectivesSubjects/EditElectiveSubjectForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { MarkNewElectiveForm } from "~/components/Forms/ElectivesSubjects/MarkNewElectiveForm";

const ElectiveSubjectsAdmin: NextPageWithLayout = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInsertSubject, setOpenInsertSubject] = useState(false);
  const [currentElectiveSubject, setCurrentElectiveSubject] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.electivesubject.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // Filter the pageData to show only subjects where isElective is true
  const filteredPageData = pageData.filter((data) => data.isElective);

  return (
    <section className="flex w-full flex-col items-start gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="items-start text-3xl font-bold text-white">
        Rol de Disciplinas Eletivas
      </h1>
      <p className="text-white">
        O quadro a seguir apresenta o rol de disciplinas eletivas do curso, no
        qual poderão ser definidas nas disciplinas eletivas obrigatórias de I a
        VII. A oferta de disciplinas, de acordo com as possibilidades constantes
        no rol de disciplinas, será definida em conjunto entre o Colegiado de
        Curso e o Núcleo Docente Estruturante (NDE).
      </p>
      <section className="flex w-2/3 justify-center gap-10">
        <Dialog open={openInsertSubject} onOpenChange={setOpenInsertSubject}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenInsertSubject(true);
              }}
              className="group flex w-1/2 cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Incluir nova matéria eletiva</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white  shadow-2xl shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Inclusão de matéria eletiva</DialogTitle>
              <DialogDescription className="">
                Selecione qual materia você deseja incluir como eletiva
              </DialogDescription>
            </DialogHeader>
            <section>
              <MarkNewElectiveForm pageData={pageData} afterSubmit={()=> {
                setOpenInsertSubject(false);
              }}/>
            </section>
          </DialogContent>
        </Dialog>
      </section>
      <section className="flex w-2/3 flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">Nome</TableHead>
              <TableHead className="border border-gray-300 p-2">CH</TableHead>
              <TableHead className="border border-gray-300 p-2">
                Créditos
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Pré-requisitos
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Eletiva ?
              </TableHead>
              <TableHead className=" border border-gray-300 p-2 text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPageData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="border border-gray-300 p-2">
                  {data.name}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.ch}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.credits}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.prerequisites}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {data.isElective ? "Sim" : "Não"}
                </TableCell>
                <TableCell className=" justify-center gap-1 space-x-2 border border-gray-300 px-4 py-2 text-center">
                  <Dialog
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenEditDialog(true);
                          setCurrentElectiveSubject(data.id);
                        }}
                        variant="outline"
                        className="hover:bg-cyan-800"
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                      <DialogHeader className="flex items-center ">
                        <DialogTitle>Edicao de professores</DialogTitle>
                        <DialogDescription>
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
                      {pageData
                        ?.filter(
                          (elective) => elective.id === currentElectiveSubject
                        )
                        .map((elective) => (
                          <section
                            className="grid h-full grid-cols-1 items-center gap-2"
                            key={currentElectiveSubject}
                          >
                            <EditElectiveSubjectForm
                              electivesSubjects={elective}
                              key={elective.id}
                              afterSubmit={() => {
                                setOpenEditDialog(false);
                              }}
                            />
                          </section>
                        ))}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </section>
  );
};

ElectiveSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ElectiveSubjectsAdmin;
