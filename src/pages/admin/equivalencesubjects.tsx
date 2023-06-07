/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubjectsCreateSchema,
  SubjectsUpdateSchema,
} from "~/server/common/Schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  } = api.subjects.getAll.useQuery();

  const [subjectObject, setSubjectSubject] = useState({
    phase: {},
    id: "",
    name: "",
    phaseId: "",
    ch: 0,
    credits: 0,
    prerequisites: "",
    isElective: false,
    equivalenceSubjects: "",
  });

  const [openDialogSubject, setOpenDialogSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
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
  const { mutateAsync: update } = api.subjects.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.subjects.getAll.invalidate();
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
    reset: resetUpdateSubject,
    formState: {
      errors: errorsUpdateSubject,
      isSubmitting: isUpdatetingCreateSubject,
    },
  } = useForm<z.infer<typeof SubjectsUpdateSchema>>({
    resolver: zodResolver(SubjectsUpdateSchema),
  });
  const handleUpdateSubject: SubmitHandler<
    z.infer<typeof SubjectsUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    resetUpdateSubject();
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
                resetUpdateSubject();
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
              <TableHead className="border border-gray-300 p-2 text-center">
                Eletiva
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
                    <TableCell className="border border-gray-300 p-2 text-center">
                      {data.isElective ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      {data.equivalenceSubjects == ""
                        ? "Não possui"
                        : data.equivalenceSubjects}
                    </TableCell>
                    <TableCell className="w-52 gap-2 border border-gray-300 py-2 text-center ">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="hover:bg-cyan-800"
                          >
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                          <DialogHeader className="flex items-center ">
                            <DialogTitle>Edição de professores</DialogTitle>
                            <DialogDescription>
                              Edição de professores
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            // onSubmit={handleSubmit(updateEquivalence)}
                            className=""
                          >
                            <section className="grid h-full grid-cols-1 items-center gap-2 ">
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="name" className="text-right">
                                  Nome
                                </Label>
                                <Input
                                  id="name"
                                  type="text"
                                  placeholder={data.name}
                                  {...registerUpdateSubject("name")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="ch">CH</Label>
                                <Input
                                  id="ch"
                                  type="text"
                                  // placeholder={data.ch || "Erro ao carregar"}
                                  {...registerUpdateSubject("ch")}
                                />
                              </div>
                              <div className="flex columns-1 flex-col items-start gap-3">
                                <Label htmlFor="equivalence">
                                  Materia Equivalente
                                </Label>
                                <Input
                                  id="equivalence"
                                  type="text"
                                  placeholder={data.equivalence}
                                  {...registerUpdateSubject("equivalence")}
                                />
                              </div>
                              <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                                <Button
                                  className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                                  onClick={() => setOpen(false)}
                                >
                                  Salvar
                                </Button>
                              </DialogFooter>
                            </section>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant={"outline"}
                        className=" ml-2 hover:bg-red-500"
                        // onClick={handleDeleteData}
                      >
                        {/*
                         */}
                        Excluir
                      </Button>
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
