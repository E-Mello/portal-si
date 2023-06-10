/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { HiOutlineCursorClick, HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";

import { api } from "~/utils/api";
import SyncLoader from "react-spinners/SyncLoader";
import {
  TeachersCreateSchema,
  TeachersUpdateSchema,
} from "~/server/common/Schemas";

const DocentsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDocent, setOpenCreateDocent] = useState(false);
  const [openUpdateDocent, setOpenUpdateDocent] = useState(false);
  const [objectDocent, setObjectDocent] = useState({
    id: "",
    email: "",
    name: "",
    qualification: "",
    area: "",
    lattes: "",
    periodOfService: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [idTeacher, setIdTeacher] = useState("");

  const {
    data: teachersData,
    isLoading: teachersLoading,
    isError: teachersError,
  } = api.teachers.getAll.useQuery();

  const { mutateAsync: updateTeacher } = api.teachers.updateTeacher.useMutation(
    {
      onSuccess: () => {
        void utils.teachers.getAll.invalidate();
        resetUpdateTeacherForm();
        toast.success("Teacher data update successfully");
      },
      onError: () => {
        toast.error(
          "Something is wrong in update data, please validate the data "
        );
      },
    }
  );
  const { mutateAsync: createTeacher } = api.teachers.createTeacher.useMutation(
    {
      onSuccess: () => {
        void utils.teachers.getAll.invalidate();
        resetSubmitTeacherForm();
        toast.success("Teacher ted successfully", { autoClose: 2000 });
      },
      onError: () => {
        toast.error(
          "Something is wrong in create data, please validate the data ",
          { autoClose: 2000 }
        );
      },
    }
  );

  /**
   * Form to update a teacher data in the database
   */
  const {
    register: updateForm,
    handleSubmit: handleUpdateTeacherForm,
    formState: { isSubmitting: isUpdatingTeacherForm },
    reset: resetUpdateTeacherForm,
  } = useForm<z.infer<typeof TeachersUpdateSchema>>({
    resolver: zodResolver(TeachersUpdateSchema),
  });

  /**
   * Form to submit a new teacher data to the database
   */
  const {
    register: registerForm,
    handleSubmit: handleSubmitTeacherForm,
    formState: { isSubmitting: isSubmittingTeacherForm },
    reset: resetSubmitTeacherForm,
  } = useForm<z.infer<typeof TeachersCreateSchema>>({
    resolver: zodResolver(TeachersCreateSchema),
  });

  /**
   * Function to update a teacher data in the database
   */
  const updateFormTeacher: SubmitHandler<
    z.infer<typeof TeachersUpdateSchema>
  > = async (data) => {
    console.log(data);
    const res = await updateTeacher(data);
    if (res) {
      console.log("res", res);
      resetUpdateTeacherForm();
      setOpenUpdateDocent(false);
    }
  };

  /**
   * Function to submit a new teacher data to the database
   */
  const submitTeacher: SubmitHandler<
    z.infer<typeof TeachersCreateSchema>
  > = async (data) => {
    const res = await createTeacher(data);
    if (res) {
      console.log("res", res);
      resetUpdateTeacherForm();
      setOpenCreateDocent(false);
    }
  };

  const { mutateAsync: deleteTeacher } = api.teachers.deleteTeacher.useMutation(
    {
      onSuccess: () => {
        void utils.teachers.getAll.invalidate();
        toast.success("Teacher deleted successfully", { autoClose: 2000 });
      },
      onError: () => {
        toast.error(
          "Something is wrong in delete data, please validate the data ",
          { autoClose: 2000 }
        );
      },
    }
  );

  async function handleDeleteTeacher(idTeacher: string) {
    try {
      await deleteTeacher({ id: idTeacher });
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (teachersLoading) {
    return <div>Loading...</div>;
  }

  if (teachersError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex  w-full flex-col gap-4 py-2 pr-6">
      <h1 className="pl-4 text-center text-xl font-bold">
        Docentes por semestre
      </h1>
      <section className="flex flex-col justify-start gap-2 pl-4">
        <div className="flex justify-between gap-10">
          <Dialog open={openCreateDocent} onOpenChange={setOpenCreateDocent}>
            <DialogTrigger asChild>
              <div className="flex w-full items-center justify-center">
                <Button
                  className="group flex w-1/2 cursor-default items-center justify-center  gap-2 rounded-xl border p-2 text-center hover:outline-double "
                  onClick={() => setOpenCreateDocent(true)}
                >
                  <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                  Cadastrar professor
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="top-20 flex flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700 sm:max-w-[50vw]">
              <DialogHeader className="flex items-center justify-center">
                <DialogTitle> Cadastrar novo professor</DialogTitle>
                <DialogDescription className="">
                  Preencher todos os campos{" "}
                  {"(Os campos são em formato string)"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitTeacherForm(submitTeacher)}>
                <section className="grid h-full grid-cols-2 gap-2">
                  <div className="flex columns-1 flex-col items-start gap-3">
                    <Label htmlFor="name" className="text-right">
                      Nome do professor
                    </Label>
                    <Input
                      id="teacher-name"
                      className=""
                      {...registerForm("name")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="qualification" className="text-right">
                      Qualificação do professor
                    </Label>
                    <Input
                      id="teacher-qualification"
                      className=""
                      {...registerForm("qualification")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="area" className="text-right">
                      Area de atuação do professor
                    </Label>
                    <Input
                      id="teacher-area"
                      className=""
                      {...registerForm("area")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="email" className="text-right">
                      Email do professor
                    </Label>
                    <Input
                      id="teacher-email"
                      className=""
                      {...registerForm("email")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="lattes" className="text-right">
                      Lattes do professor
                    </Label>
                    <Input
                      id="teacher-lattes"
                      className=""
                      {...registerForm("lattes")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="lattes" className="text-right">
                      Período de atuação do professor
                    </Label>
                    <Input
                      id="teacher-lattes"
                      className=""
                      {...registerForm("periodOfService" || "")}
                    />
                  </div>
                  <div className="flex items-center justify-start pt-6"></div>
                </section>

                <DialogFooter className="flex ">
                  <Button
                    type="submit"
                    className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600"
                  >
                    {isSubmittingTeacherForm ? (
                      <SyncLoader color="white" />
                    ) : (
                      "Cadastrar"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border">Name</th>
              <th className="border">Qualification</th>
              <th className="border">Area</th>
              <th className="border">Email</th>
              <th className="border">Periodo de Serviço</th>
              <th className="border ">Lattes</th>
              <th className="w-40 border ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachersData?.map((teacher) => (
              <tr key={teacher.id} className="">
                <td className="border pl-2">{teacher.name}</td>
                <td className="border pl-2">{teacher.qualification}</td>
                <td className="border pl-2">{teacher.area}</td>
                <td className="border pl-2">{teacher.email}</td>
                <td className=" border pl-2 text-center">
                  {teacher.periodOfService}
                </td>
                <td className="items-center justify-center border pl-2">
                  <Link
                    className="flex "
                    target="_blank"
                    href={`${teacher.lattes}`}
                  >
                    <HiOutlineCursorClick className="flex w-full" />
                  </Link>
                </td>
                <td className="w-52 border py-2 text-center">
                  <Dialog
                    open={openUpdateDocent}
                    onOpenChange={setOpenUpdateDocent}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2 hover:bg-cyan-800"
                        onClick={() => {
                          resetUpdateTeacherForm();
                          setOpenUpdateDocent(true);
                          setObjectDocent(teacher);
                        }}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="top-20 flex w-full flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700 sm:max-w-[50vw]">
                      <DialogHeader>
                        <DialogTitle>
                          Editar as informações dos docentes
                        </DialogTitle>
                        <DialogDescription>
                          Será mostrado no placeholder as informações atuais e
                          ao salvar, as informações serão substituidas.
                        </DialogDescription>
                      </DialogHeader>
                      {/* <form onSubmit={handleSubmit(updateTeacher)}> */}
                      <form
                        onSubmit={handleUpdateTeacherForm(updateFormTeacher)}
                      >
                        <section className="grid h-full grid-cols-2 gap-2">
                          <input
                            type="hidden"
                            defaultValue={objectDocent.id}
                            {...updateForm("id")}
                          />
                          <div className="flex columns-1 flex-col items-start gap-3">
                            <Label htmlFor="name" className="text-right">
                              Nome do professor
                            </Label>
                            <Input
                              id="teacher-name"
                              className=""
                              {...updateForm("name")}
                              defaultValue={objectDocent.name}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label
                              htmlFor="qualification"
                              className="text-right"
                            >
                              Qualificação do professor
                            </Label>
                            <Input
                              id="teacher-qualification"
                              className=""
                              defaultValue={objectDocent.qualification}
                              {...updateForm("qualification")}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label htmlFor="area" className="text-right">
                              Area de atuação do professor
                            </Label>
                            <Input
                              id="teacher-area"
                              className=""
                              defaultValue={objectDocent.area}
                              {...updateForm("area")}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label htmlFor="email" className="text-right">
                              Email do professor
                            </Label>
                            <Input
                              id="teacher-email"
                              className=""
                              defaultValue={objectDocent.email}
                              {...updateForm("email")}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label
                              htmlFor="periodOfService"
                              className="text-right"
                            >
                              Periodo de Serviço do professor
                            </Label>
                            <Input
                              id="periodOfService"
                              className=""
                              defaultValue={objectDocent.periodOfService}
                              {...updateForm("periodOfService")}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-3">
                            <Label htmlFor="lattes" className="text-right">
                              Lattes do professor
                            </Label>
                            <Input
                              id="teacher-lattes"
                              className=""
                              defaultValue={objectDocent.lattes}
                              {...updateForm("lattes")}
                            />
                          </div>
                        </section>

                        <DialogFooter className="flex pt-2">
                          <Button
                            type="submit"
                            className="flex border border-zinc-700 bg-zinc-700 text-white hover:border-zinc-600 hover:bg-zinc-600"
                          >
                            {isUpdatingTeacherForm ? (
                              <SyncLoader color="white" />
                            ) : (
                              "Salvar Alterações"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setOpenAlert(true);
                          setIdTeacher(teacher.id);
                        }}
                        className=" hover:bg-red-500"
                        variant="outline"
                      >
                        Deletar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-1/2 bg-zinc-800 text-white ">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Voce tem certeza que deseja deletar essa informacao?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Lembre que, deletando essa informacao, nao sera
                          possivel recupera-la.
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
                          onClick={() => {
                            void handleDeleteTeacher(idTeacher);
                          }}
                          className="hover:bg-cyan-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

DocentsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DocentsAdmin;
