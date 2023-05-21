import { Check, ChevronsUpDown } from "lucide-react";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { HiOutlineCursorClick, HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";

import { api } from "~/utils/api";
import SyncLoader from "react-spinners/SyncLoader";
import {
  SchoolYearCreateSchema,
  TeachersCreateSchema,
  TeachersSchema,
  TeachersUpdateSchema,
} from "~/server/common/PageSchema";
import { cn } from "~/utils/cn";

const DocentsAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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

  const { mutateAsync: createSchoolYear } =
    api.teachers.createSchoolYear.useMutation({
      onSuccess: () => {
        void utils.teachers.getAll.invalidate();
        resetSchoolYear();
        setOpen(false);
        toast.success("SchoolYear created successfully", { autoClose: 2000 });
      },
      onError: () => {
        resetSchoolYear();
        setOpen(false);
        toast.error(
          "Something is wrong in create data, please validate the data ",
          { autoClose: 2000 }
        );
      },
    });

  /**
   * Form to update a teacher data in the database
   */
  const {
    register: updateForm,
    handleSubmit: handleUpdateTeacherForm,
    formState: {
      errors: errorsUpdateTeacherForm,
      isSubmitting: isUpdatingTeacherForm,
    },
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
    formState: {
      errors: errorsSubmitForm,
      isSubmitting: isSubmittingTeacherForm,
    },
    reset: resetSubmitTeacherForm,
  } = useForm<z.infer<typeof TeachersCreateSchema>>({
    resolver: zodResolver(TeachersCreateSchema),
  });

  /**
   * Form to submit a new school year to the database
   */
  const {
    register: registerSchoolYear,
    handleSubmit: handleSubmitSchoolYear,
    formState: {
      errors: errorsSchoolYear,
      isSubmitting: isSubmittingSchoolYear,
    },
    reset: resetSchoolYear,
  } = useForm<z.infer<typeof SchoolYearCreateSchema>>({
    resolver: zodResolver(SchoolYearCreateSchema),
  });

  /**
   * Function to update a teacher data in the database
   */
  const updateFormTeacher: SubmitHandler<
    z.infer<typeof TeachersUpdateSchema>
  > = async (data) => {
    const res = await updateTeacher(data);
    if (res) {
      console.log("res", res);
      resetUpdateTeacherForm();
      setOpen(false);
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
      setOpen(false);
    }
  };

  /**
   * Function to submit a new school year to the database
   */
  const submitSchoolYear: SubmitHandler<
    z.infer<typeof SchoolYearCreateSchema>
  > = async (data) => {
    const res = await createSchoolYear(data);
    if (res) {
      console.log("res", res);
      resetUpdateTeacherForm();
      setOpen(false);
    }
  };

  async function deleteTeacherData(id: number) {
    try {
      await deleteTeacher({ id: id });
      setOpen(false);
    } catch (error) {}
  }

  // Group teachers by school year and semester
  const teachersByClass = {};
  if (!teachersLoading && !teachersError) {
    teachersData.forEach((schoolYear) => {
      const { year, semester } = schoolYear;
      const classKey = `${year}/${semester}`;
      if (!teachersByClass[classKey]) {
        teachersByClass[classKey] = [];
      }
      schoolYear.teachers.forEach((teacher) => {
        teachersByClass[classKey].push(teacher);
      });
    });
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="group flex w-full cursor-default items-center  justify-center gap-2 rounded-xl border p-2 hover:outline-double ">
                <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                Cadastro de ano letivo
              </Button>
            </DialogTrigger>
            <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
              <DialogHeader className="flex items-center justify-center">
                <DialogTitle> Cadastrar novo semestre</DialogTitle>
                <DialogDescription className="">
                  Preencher todos os campos{" "}
                  {"(Os campos são em formato string)"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitSchoolYear(submitSchoolYear)}>
                <section className="grid h-full grid-cols-1 items-center gap-2 ">
                  <div className="flex columns-1 flex-col items-start gap-3">
                    <Label htmlFor="name" className="text-right">
                      Ano
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      {...registerSchoolYear("year")}
                    />
                  </div>
                  <div className="flex columns-1 flex-col items-start gap-3">
                    <Label htmlFor="type">Semestre</Label>
                    <Input
                      id="type"
                      type="text"
                      {...registerSchoolYear("semester")}
                    />
                  </div>
                  <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                    <Button
                      type="submit"
                      className="bg-green-700 text-black hover:bg-green-600 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Cadastrar
                    </Button>
                  </DialogFooter>
                </section>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setValue("");
                }}
                className="group flex w-full cursor-default items-center  justify-center gap-2 rounded-xl border p-2 hover:outline-double "
              >
                <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                Cadastrar professor
              </Button>
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
                      {...updateForm("name")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="qualification" className="text-right">
                      Qualificação do professor
                    </Label>
                    <Input
                      id="teacher-qualification"
                      className=""
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
                      {...updateForm("email")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-3">
                    <Label htmlFor="lattes" className="text-right">
                      Lattes do professor
                    </Label>
                    <Input
                      id="teacher-lattes"
                      className=""
                      {...updateForm("lattes")}
                    />
                  </div>
                  <div className="flex items-center justify-start pt-6">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-60 justify-between"
                        >
                          {value
                            ? teachersData.find(
                                (schoolYear) => schoolYear.id === value
                              )
                              ? `${
                                  teachersData.find(
                                    (schoolYear) => schoolYear.id === value
                                  ).year
                                } - ${
                                  teachersData.find(
                                    (schoolYear) => schoolYear.id === value
                                  ).semester
                                } Semestre`
                              : "Selecione o periodo letivo"
                            : "Selecione o periodo letivo"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] bg-zinc-800 p-0 text-white">
                        <Command>
                          <CommandInput placeholder="School term..." />
                          <CommandEmpty>No school year found.</CommandEmpty>
                          <CommandGroup>
                            {teachersData.map((schoolYear) => (
                              <CommandItem
                                className="hover:bg-zinc-700"
                                key={schoolYear.id}
                                onSelect={() => {
                                  setValue(schoolYear.id);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === schoolYear.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`${schoolYear.year} - ${schoolYear.semester} Semestre`}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </section>

                <DialogFooter className="flex ">
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
        </div>
        <Accordion type="single" className="flex flex-col" collapsible>
          {Object.keys(teachersByClass).map((classKey) => {
            const [year, semester] = classKey.split("/");
            return (
              <AccordionItem key={classKey} value={classKey} className="">
                <AccordionTrigger className="h-10">
                  {year} - Semester {semester}
                </AccordionTrigger>
                <AccordionContent className="">
                  {teachersByClass[classKey]?.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border">Name</th>
                          <th className="border">Qualification</th>
                          <th className="border">Area</th>
                          <th className="border">Email</th>
                          <th className="border ">Lattes</th>
                          <th className="w-40 border ">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachersByClass[classKey]?.map((teacher: any) => (
                          <tr key={teacher.id} className="">
                            <td className="border pl-2">{teacher.name}</td>
                            <td className="border pl-2">
                              {teacher.qualification}
                            </td>
                            <td className="border pl-2">{teacher.area}</td>
                            <td className="border pl-2">{teacher.email}</td>
                            <td className="items-center justify-center border pl-2">
                              <Link
                                className="flex "
                                target="_blank"
                                href={`${teacher.lattes}`}
                              >
                                <HiOutlineCursorClick className="flex w-full" />
                              </Link>
                            </td>
                            <td className="flex w-40 justify-around gap-1 border px-4 py-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="hover:bg-cyan-800"
                                    onClick={() => {
                                      resetUpdateTeacherForm();
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </DialogTrigger>
                                <ScrollArea className="h-full w-full">
                                  <DialogContent className="top-20 flex flex-col rounded-md bg-zinc-800 text-white shadow-2xl shadow-zinc-700  sm:max-w-[50vw]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Editar as informações dos docentes
                                      </DialogTitle>
                                      <DialogDescription>
                                        Será mostrado no placeholder as
                                        informações atuais e ao salvar, as
                                        informações serão substituidas.
                                      </DialogDescription>
                                    </DialogHeader>
                                    {/* <form onSubmit={handleSubmit(updateTeacher)}> */}
                                    <form
                                      onSubmit={handleUpdateTeacherForm(
                                        updateFormTeacher
                                      )}
                                    >
                                      <section className="grid h-full grid-cols-2 gap-2">
                                        <div className="flex columns-1 flex-col items-start gap-3">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Nome do professor
                                          </Label>
                                          <Input
                                            id="teacher-name"
                                            className=""
                                            {...updateForm("name")}
                                            defaultValue={teacher.name}
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
                                            defaultValue={teacher.qualification}
                                            {...updateForm("qualification")}
                                          />
                                        </div>
                                        <div className="flex flex-col items-start justify-start gap-3">
                                          <Label
                                            htmlFor="area"
                                            className="text-right"
                                          >
                                            Area de atuação do professor
                                          </Label>
                                          <Input
                                            id="teacher-area"
                                            className=""
                                            defaultValue={teacher.area}
                                            {...updateForm("area")}
                                          />
                                        </div>
                                        <div className="flex flex-col items-start justify-start gap-3">
                                          <Label
                                            htmlFor="email"
                                            className="text-right"
                                          >
                                            Email do professor
                                          </Label>
                                          <Input
                                            id="teacher-email"
                                            className=""
                                            defaultValue={teacher.email}
                                            {...updateForm("email")}
                                          />
                                        </div>
                                        <div className="flex flex-col items-start justify-start gap-3">
                                          <Label
                                            htmlFor="lattes"
                                            className="text-right"
                                          >
                                            Lattes do professor
                                          </Label>
                                          <Input
                                            id="teacher-lattes"
                                            className=""
                                            defaultValue={teacher.lattes}
                                            {...updateForm("lattes")}
                                          />
                                        </div>
                                      </section>

                                      <DialogFooter className="flex ">
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
                                </ScrollArea>
                              </Dialog>
                              <Button
                                variant={"outline"}
                                className="hover:bg-red-500"
                                type="button"
                                // onClick={deleteTeacherData(teacher.id)}
                              >
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className=" mt-4 flex  justify-center text-gray-500">
                      No teachers registered for this semester.
                    </div>
                  )}
                  <div className="flex pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setValue("");
                          }}
                          className="group flex w-full cursor-default  items-center justify-center gap-2 rounded-xl  border p-2 hover:outline-double "
                        >
                          <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
                          Vincular professor nesse periodo letivo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="top-20 flex w-96 flex-col items-center rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
                        <DialogHeader className="flex items-center justify-center">
                          <DialogTitle>Vinculo de professor</DialogTitle>
                          <DialogDescription className="">
                            Selecione o professor para esse periodo letivo
                            
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleSubmitTeacherForm(submitTeacher)}
                          className="flex w-full flex-col items-center justify-center gap-4"
                        >
                          <div className="flex flex-col  items-center gap-3">
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-60 justify-between"
                                >
                                  {value
                                    ? teachersData.find(
                                        (schoolYear) => schoolYear.id === value
                                      )
                                      ? `${
                                          teachersData.find(
                                            (schoolYear) =>
                                              schoolYear.id === value
                                          ).year
                                        } - ${
                                          teachersData.find(
                                            (schoolYear) =>
                                              schoolYear.id === value
                                          ).semester
                                        } Semestre`
                                      : "Selecione o periodo letivo"
                                    : "Selecione o periodo letivo"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] bg-zinc-800 p-0 text-white">
                                <Command>
                                  <CommandInput placeholder="School term..." />
                                  <CommandEmpty>
                                    No school year found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {teachersData.map((schoolYear) => (
                                      <CommandItem
                                        className="hover:bg-zinc-700"
                                        key={schoolYear.id}
                                        onSelect={() => {
                                          setValue(schoolYear.id);
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            value === schoolYear.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {`${schoolYear.year} - ${schoolYear.semester} Semestre`}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>

                          <DialogFooter className="flex flex-col items-center justify-center gap-4 pt-2">
                            <Button
                              type="submit"
                              className="bg-cyan-800 text-black hover:bg-cyan-600 hover:text-white"
                              onClick={() => setOpen(false)}
                            >
                              Vincular
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </section>
  );
};

DocentsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default DocentsAdmin;
