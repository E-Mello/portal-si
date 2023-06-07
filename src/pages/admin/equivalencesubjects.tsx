/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EquivalenceUpdateSchema } from "~/server/common/Schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SyncLoader from "react-spinners/SyncLoader";

const EquivalenceSubjectsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.equivalence.getAll.useQuery();

  const [subjectObject, setSubjectSubject] = useState({
    id: "",
    name: "",
    ch: "",
    credits: "",
    prerequisites: "",
    equivalenceSubjects: "",
  });

  const [openDialogSubject, setOpenDialogSubject] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [idEquivalence, setIdEquivalence] = useState("");
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const selectedSubjectData = pageData?.find(
    (data) => data.name === selectedSubject
  );

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (selectedSubjectData) {
      selectedSubjectData.equivalenceSubjects = event.target.value;
    }
  };

  const [open, setOpen] = useState(false);

  /**
   * Below is the code for the update subject (equivalence)
   */
  const { mutateAsync: update } = api.equivalence.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.equivalence.getAll.invalidate();
      toast.success("Materia atualizada com sucesso!");
    },
    onError: () => {
      // show error toast
      toast.error("Erro ao atualizar materia!");
    },
  });

  const {
    register: registerUpdateSubject,
    handleSubmit: handleSubmitUpdateSubject,
    reset: resetUpdateEquivalence,
    formState: {
      errors: errorsUpdateSubject,
      isSubmitting: isUpdatetingCreateSubject,
    },
  } = useForm<z.infer<typeof EquivalenceUpdateSchema>>({
    resolver: zodResolver(EquivalenceUpdateSchema),
  });
  const handleUpdateSubject: SubmitHandler<
    z.infer<typeof EquivalenceUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    setOpenDialogSubject(false);
    setOpenDialogEdit(false);
    resetUpdateEquivalence();
  };

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
        <Dialog open={openDialogSubject} onOpenChange={setOpenDialogSubject}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpenDialogSubject(true);
                resetUpdateEquivalence();
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
            <form onSubmit={handleSubmitUpdateSubject(handleUpdateSubject)}>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Input
                    type="hidden"
                    defaultValue={subjectObject.id}
                    {...registerUpdateSubject("id")}
                  />
                  <Label htmlFor="name" className="text-right">
                    Matéria
                  </Label>
                  <Select
                    value={selectedSubject}
                    onValueChange={handleSubjectChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="w-full text-left"
                        placeholder="Selecione uma matéria"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 text-white">
                      {pageData?.map((subject) => (
                        <SelectItem
                          key={subject.id}
                          value={subject.name}
                          className="text-white hover:bg-neutral-600"
                          onClick={() => {
                            setSubjectSubject(subject);
                          }}
                        >
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedSubjectData && (
                  <div className="flex columns-1 flex-col items-start gap-3">
                    <Label htmlFor="name" className="text-right">
                      Editar equivalência(s)
                    </Label>
                    <Textarea
                      id="name"
                      defaultValue={selectedSubjectData.equivalenceSubjects}
                      onChange={handleTextAreaChange}
                      {...registerUpdateSubject("equivalenceSubjects")}
                    />
                  </div>
                )}

                <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                  <Button
                    className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                    onClick={() => {
                      setOpen(false);
                      console.log("o id selecionado eh", subjectObject.id);
                      console.log(
                        "o data eh",
                        selectedSubjectData?.equivalenceSubjects
                      );
                    }}
                  >
                    {isUpdatetingCreateSubject ? (
                      <SyncLoader />
                    ) : (
                      "Editar equivalencia"
                    )}
                  </Button>
                </DialogFooter>
              </section>
            </form>
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
              <TableHead className="w-44 border border-gray-300 p-2 text-center">
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
                      {data.equivalenceSubjects == ""
                        ? "Não possui"
                        : data.equivalenceSubjects}
                    </TableCell>
                    <TableCell className="w-52 gap-2 border border-gray-300 py-2 text-center ">
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
                              setSubjectSubject(data);
                              resetUpdateEquivalence();
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
                          <form
                            onSubmit={handleSubmitUpdateSubject(
                              handleUpdateSubject
                            )}
                            className=""
                          >
                            <section className="grid h-full grid-cols-1 items-center gap-2 ">
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Input
                                  type="hidden"
                                  defaultValue={subjectObject.id}
                                  {...registerUpdateSubject("id")}
                                />
                                <Label htmlFor="name" className="text-right">
                                  Nome
                                </Label>
                                <Input
                                  id="name"
                                  type="text"
                                  defaultValue={subjectObject.name}
                                  {...registerUpdateSubject("name")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="ch">CH</Label>
                                <Input
                                  id="ch"
                                  type="text"
                                  defaultValue={subjectObject.ch}
                                  {...registerUpdateSubject("ch")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="credits">Créditos</Label>
                                <Input
                                  id="credits"
                                  type="text"
                                  defaultValue={subjectObject.credits}
                                  {...registerUpdateSubject("credits")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="prerequisites">
                                  Pré-Requisitos
                                </Label>
                                <Input
                                  id="prerequisites"
                                  type="text"
                                  defaultValue={subjectObject.prerequisites}
                                  {...registerUpdateSubject("prerequisites")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="equivalenceSubjects">
                                  Materia Equivalente
                                </Label>
                                <Textarea
                                  id="equivalenceSubjects"
                                  defaultValue={
                                    subjectObject.equivalenceSubjects
                                  }
                                  {...registerUpdateSubject(
                                    "equivalenceSubjects"
                                  )}
                                />
                              </div>
                              <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                                <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                                  {isUpdatetingCreateSubject ? (
                                    <SyncLoader />
                                  ) : (
                                    "Salvar edição"
                                  )}
                                </Button>
                              </DialogFooter>
                            </section>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                        <AlertDialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setOpenAlert(true);
                            }}
                            className=" hover:bg-red-500"
                            variant="outline"
                          >
                            Deletar
                          </Button>
                        </AlertDialogTrigger>
                        <form
                          onSubmit={handleSubmitUpdateSubject(
                            handleUpdateSubject
                          )}
                        >
                          <AlertDialogContent className="bg-zinc-800 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Voce tem certeza que deseja deletar essa
                                informacao?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Lembre que, deletando essa informacao, nao sera
                                possivel recupera-la.
                              </AlertDialogDescription>
                              <Input
                                type="hidden"
                                defaultValue={subjectObject.id}
                                {...registerUpdateSubject("id")}
                              />
                              <Input
                                type="hidden"
                                defaultValue={" "}
                                {...registerUpdateSubject(
                                  "equivalenceSubjects"
                                )}
                              />
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
                                type="submit"
                                className="hover:bg-cyan-700"
                              >
                                {isUpdatetingCreateSubject ? (
                                  <SyncLoader />
                                ) : (
                                  "Deletar"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </form>
                      </AlertDialog>
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
