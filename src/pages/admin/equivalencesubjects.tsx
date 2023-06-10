/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "~/components/ui/button";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { EditEquivalenceForm } from "~/components/Forms/EquivalenceSubjects/EditEquivalenceForm";
import { MarkNewEquivalenceForm } from "~/components/Forms/EquivalenceSubjects/MarkNewEquivalenceForm";

const EquivalenceSubjectsAdmin: NextPageWithLayout = () => {
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.equivalence.getAll.useQuery();

  const [currentEquivalenceId, setCurrentEquivalenceId] = useState("");

  const [openDialogDefineEquivalence, setOpenDialogDefineEquivalence] =
    useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className="pl-4 text-xl">Tabela de Equivalência de Disciplinas</h1>
      <span className="pl-4">
        O quadro a seguir apresenta a relação de membros do colegiado do curso
        de Bacharelado em Sistemas de Informação.
      </span>
      <section className="flex w-1/2 gap-10">
        <Dialog
          open={openDialogDefineEquivalence}
          onOpenChange={setOpenDialogDefineEquivalence}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenDialogDefineEquivalence(true);
              }}
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Incluir nova Equivalência</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white  shadow-2xl shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Inclusão de equivalência</DialogTitle>
              <DialogDescription className="">
                Selecione qual materia você deseja editar a equivalência
              </DialogDescription>
            </DialogHeader>
            <section>
              <MarkNewEquivalenceForm
                equivalenceSubjects={pageData}
                afterSubmit={() => {
                  setOpenDialogDefineEquivalence(false);
                }}
              />
            </section>
          </DialogContent>
        </Dialog>
      </section>
      <div className="flex w-full flex-col gap-4 pl-4 pr-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-300 p-2">
                Disciplina em SI
              </TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">
                Carga Horária
              </TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">
                Créditos
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Pré-requisitos
              </TableHead>
              <TableHead className="border border-gray-300 p-2">
                Disciplina (Curso) - Equivalências no campus de Sinop
              </TableHead>
              <TableHead className="w-32 border border-gray-300 p-2 text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map(
              (data) =>
                data.equivalenceSubjects !== "" && (
                  <TableRow key={data.id}>
                    <TableCell className="border border-gray-300 p-2">
                      {data.name}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">
                      {data.ch}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">
                      {data.credits}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      {data.prerequisites}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      {data.equivalenceSubjects}
                    </TableCell>
                    <TableCell className="w-32 border border-gray-300 py-2 text-center ">
                      <Dialog
                        open={openDialogEdit}
                        onOpenChange={setOpenDialogEdit}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="hover:bg-cyan-800"
                            onClick={() => {
                              setOpenDialogEdit(true);
                              setCurrentEquivalenceId(data.id);
                            }}
                          >
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                          <DialogHeader className="flex items-center ">
                            <DialogTitle>
                              Edição das matérias relacionadas a equivalência
                            </DialogTitle>
                            <DialogDescription>
                              Edição de matérias
                            </DialogDescription>
                          </DialogHeader>

                          {pageData
                            ?.filter(
                              (equivalence) =>
                                equivalence.id === currentEquivalenceId
                            )
                            .map((equivalence) => (
                              <section
                                className="grid h-full grid-cols-1 items-center gap-2"
                                key={currentEquivalenceId}
                              >
                                <EditEquivalenceForm
                                  equivalenceSubjects={equivalence}
                                  key={equivalence.id}
                                  afterSubmit={() => {
                                    setOpenDialogEdit(false);
                                  }}
                                />
                              </section>
                            ))}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

EquivalenceSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EquivalenceSubjectsAdmin;
