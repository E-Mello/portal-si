import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement, useEffect } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
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

import { HiOutlinePlus } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import NewSubject from "~/components/Forms/CurriculumSubjects/NewSubject";
import EditSubject from "~/components/Forms/CurriculumSubjects/EditSubject";

import { toast } from "react-toastify";

const allSubjects =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/disciplinas-1024x655.png?t=2023-03-18T20%3A45%3A37.075Z";

type Subject = {
  id: number;
  name: string;
  CH: number;
  Credits: number;
  Prerequisites: string;
  phaseId: number;
};

type Phase = {
  id: number;
  phaseId: number;
  subjects: Subject[];
};

const CurriculumSubjectsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [currentSubjectId, setCurrentSubjectId] = useState("");
  const [commandListHeight, setCommandListHeight] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".command-input-container")) {
        setCommandListHeight(0);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.curriculumSubjects.getAll.useQuery();

  const { mutate } = api.curriculumSubjects.delete.useMutation({
    onSuccess: () => {
      void utils.curriculumSubjects.getAll.invalidate();
      toast.success("Materia deletada com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao deletar materia !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteData() {
    try {
      mutate({ id: currentSubjectId });
    } catch (error) {
      console.log("Error deleting provider:", error);
    }
  }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const phaseIds = [
    ...new Set(
      pageData?.map((subject: { phaseId: string }) => subject.phaseId)
    ),
  ];

  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <h1 className=" text-xl">Grade Curricular</h1>
      <Image width={500} height={500} alt="test" src={allSubjects} />
      <span>
        Os quadro a seguir apresenta a sequência curricular do curso de
        Bacharelado em Sistemas de Informação, compreendendo oito fases
        (semestres) letivas.
      </span>
      <section className="flex flex-col items-center justify-center gap-4 ">
        <h1>Resumo</h1>
        <Table className="table-auto">
          <TableBody>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga horária de disciplinas
              </TableCell>
              <TableCell className="border px-4 py-2">2.820</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Estágio Supervisionado
              </TableCell>
              <TableCell className="border px-4 py-2">180</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Atividades Complementares
              </TableCell>
              <TableCell className="border px-4 py-2">150</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border px-4 py-2">
                Carga Horária Total da Matriz
              </TableCell>
              <TableCell className="border px-4 py-2">3.150 horas</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <section className="flex w-2/5 flex-col items-center justify-center pt-4">
        <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
          <DialogTrigger asChild>
            <Button
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
              onClick={() => {
                setOpenDialogCreate(true);
              }}
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <p className="ml-2">Cadastrar nova matéria</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 p-4 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>
                Cadastrar uma nova matéria para esse semestre
              </DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <NewSubject
              afterSubmit={() => {
                setOpenDialogCreate(false);
                void utils.curriculumSubjects.getAll.invalidate();
              }}
            />
          </DialogContent>
        </Dialog>
      </section>
      <br />
      <section className="grid w-full grid-cols-2 gap-4 pl-4 pr-10">
        {phaseIds.map((phaseId) => (
          <div
            key={phaseId}
            className="flex flex-col justify-center gap-4 pb-2 pl-4 pt-2"
          >
            <legend className="flex justify-center text-xl">
              {phaseId} Semestre
            </legend>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="border border-gray-300 ">
                    Disciplina
                  </TableHead>
                  <TableHead className="border border-gray-300 ">
                    Carga Horária
                  </TableHead>
                  <TableHead className="border border-gray-300 ">
                    Créditos
                  </TableHead>
                  <TableHead className=" border border-gray-300 ">
                    Pré-requisitos
                  </TableHead>
                  <TableHead className="w-44 border border-gray-300 text-center">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {pageData
                  ?.filter((subject) => subject.phaseId === phaseId)
                  .map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="border ">{subject.name}</TableCell>
                      <TableCell className="border ">{subject.ch}</TableCell>
                      <TableCell className="border ">
                        {subject.credits}
                      </TableCell>
                      <TableCell className="border ">
                        {subject.prerequisites}
                      </TableCell>
                      <TableCell className="w-48 border text-center">
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
                                setCurrentSubjectId(subject.id);
                              }}
                            >
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 p-4 text-white shadow-2xl  shadow-zinc-700">
                            <DialogHeader className="flex items-center ">
                              <DialogTitle>Edicao de professores</DialogTitle>
                              <DialogDescription>
                                Edicao de professores
                              </DialogDescription>
                            </DialogHeader>

                            {pageData
                              ?.filter(
                                (subject) => subject.id === currentSubjectId
                              )
                              .map((subject) => (
                                <section
                                  key={currentSubjectId}
                                  className="flex w-full"
                                >
                                  <EditSubject
                                    subject={subject}
                                    afterSubmit={() => {
                                      void utils.curriculumSubjects.getAll.invalidate();
                                      setOpenDialogEdit(false);
                                    }}
                                    key={subject.id}
                                  />
                                </section>
                              ))}
                          </DialogContent>
                        </Dialog>
                        <AlertDialog
                          open={openAlert}
                          onOpenChange={setOpenAlert}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setOpenAlert(true);
                                setCurrentSubjectId(subject.id);
                              }}
                              className="ml-2 hover:bg-red-500"
                              variant="outline"
                            >
                              Excluir
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-zinc-800 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Voce tem certeza que deseja desvincular essa
                                materia desse semestre?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Lembre que, para a materia aparecer novamente
                                nesse semestre e necessario vincular de novo.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => {
                                  setOpenAlert(false);
                                }}
                                className="hover:bg-red-600"
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteData}
                                className="hover:bg-cyan-700"
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </section>
    </section>
  );
};

CurriculumSubjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CurriculumSubjectsAdmin;
