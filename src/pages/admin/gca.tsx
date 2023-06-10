/* eslint-disable @typescript-eslint/no-misused-promises */
import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
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
  Table,
  TableBody,
  TableCaption,
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

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import {
  ApliedGroupCreateSchema,
  ApliedGroupUpdateSchema,
} from "~/server/common/Schemas";
import { HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";

const GcaAdmin: NextPageWithLayout = () => {
  const utils = api.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [idReq, setIdReq] = useState("");
  const [reqObject, setReqObject] = useState({
    id: "",
    name: "",
    notice: "",
    developmentagency: "",
    value: "",
    link: "",
  });
  const [openAlert, setOpenAlert] = useState(false);

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.gca.getAll.useQuery();

  const { mutateAsync: create } = api.gca.create.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.gca.getAll.invalidate();
      setOpenCreateDialog(false);
      toast.success("Membro criado com sucesso!!!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao criar membro !!!", {
        autoClose: 2000,
      });
    },
  });
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { isSubmitting: isSubmittingCreate },
  } = useForm<z.infer<typeof ApliedGroupCreateSchema>>({
    resolver: zodResolver(ApliedGroupCreateSchema),
  });
  const createRequisition: SubmitHandler<
    z.infer<typeof ApliedGroupCreateSchema>
  > = async (data) => {
    const res = await create(data);
    console.log("res", res);
  };

  const { mutateAsync: update } = api.gca.update.useMutation({
    onSuccess: () => {
      // show success toast
      void utils.gca.getAll.invalidate();
      resetUpdate();
      toast.success("Conteúdo da página atualizado com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar conteúdo da página !!!", {
        autoClose: 2000,
      });
    },
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { isSubmitting: isSubmittingUpdate },
  } = useForm<z.infer<typeof ApliedGroupUpdateSchema>>({
    resolver: zodResolver(ApliedGroupUpdateSchema),
  });
  const updateRequisition: SubmitHandler<
    z.infer<typeof ApliedGroupUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    console.log("res", res);
    resetUpdate();
    setOpenEditDialog(false);
  };

  const { mutate: deleteMember } = api.gca.delete.useMutation({
    onSuccess: () => {
      void utils.gca.getAll.invalidate();
      toast.success("Requisição deletada com sucesso!", {
        autoClose: 2000,
      });
    },
    onError: () => {
      toast.error("Erro ao deletar requisição !!!", {
        autoClose: 2000,
      });
    },
  });

  function handleDeleteMember() {
    try {
      deleteMember({ id: idReq });
    } catch (error) {
      console.log("Error deleting requisition:", error);
    }
  }

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Grupo de Computação apliCada (GCA)
        </h1>
        <p>
          As atividades de Pesquisa e Desenvolvimento (P&D) do curso de Sistemas
          de Informação estão relacionadas principalmente ao Grupo de Computação
          apliCada (GCA). Os membros do grupo GCC, lotados na Faculdade de
          Ciências Exatas e Tecnológica do Campus Universitário de Sinop
          concentram-se nas seguintes subáreas da Computação:
        </p>
        {
          <code className="text-white">
            <i>
              {`>> Sistemas Computacionais;`} <br />
              {`>> Sistemas Inteligentes;`} <br />
              {`>> Tecnologias Emergentes.`}
            </i>
          </code>
        }
        <p>
          O grupo de pesquisa GCC, no qual os docentes estão relacionados, está
          institucionalizado na UNEMAT e no Diretório de Grupos de Pesquisa
          (DGP) do CNPQ, pode ser acessado aqui. Porém, os docentes do curso de
          Sistemas de Informação estão presentes em diversos outros grupos de
          pesquisa em diferentes instituições do país, como:GIE/FACIN- Grupo de
          pesquisa em Informática na Educação da FACIN
        </p>
        {
          <code className="text-white">
            <i>
              {`>> Grupo de Pesquisa em Aquisição e Representação de Dados Espaciais;`}{" "}
              <br />
              {`>> Grupo de Realidade Virtual;`} <br />
              {`>> Hu-S.ER - Human-System Experience Research group`} <br />
              {`>> IMAGE  Investigações em Matemática Aplicada e GeociênciasModelagem, `}{" "}
              <br />
              {`>> Síntese e Projeto de Microeletrônica e `} <br />
              {`>> Sistemas EmbarcadosSistemas Eletrônicos Digitais e Imagens `}
            </i>
          </code>
        }
      </div>
      <div className="flex flex-col gap-4 pl-4">
        <h3 className="">Aquisição de Recursos:</h3>
        <p>
          A Aquisição de Recursos Externos por meio de agências de fomento ao
          longo de 6 anos chega a aproximadamente R$ 240.000,00, isso devido ao
          empenho dos professores vinculados ao curso de Sistemas de Informação.
          Esses recursos são utilizados no desenvolvimento dos projetos de
          pesquisa e auxiliam no desenvolvimento do curso, além de trazer
          oportunidades de bolsas aos estudantes e os materiais permanentes
          posteriormente tornam-se patrimônio da universidade.
        </p>
        <p>
          Atualmente, o grupo de pesquisa tem um projeto aprovado na CAPES
          intitulado “ Provas Presenciais Conectadas”, Edital/CAPES Nº 40/2017,
          e dois projetos de pesquisa vigentes na FAPEMAT, um sob a Coordenação
          do Prof. Dr. Maicon Aparecido Satin intitulado “Sistema Inteligente
          para a Identificação de Deficiência de Nutriente pela Folha da Soja”,
          Edital Universal/FAPEMAT Nº 042/2016, e outro sob a coordenação do
          Prof. Dr. Marcelo Leandro Holzschuh intitulado “Modelagem de dados do
          Cadastro Técnico Multifinalitário integrando dados bidimensionais e
          tridimensionais, servindo de subsídio para um Observatório de
          Geoprocessamento”, Edital Universal 005/2015. Na tabela a seguir
          destaca-se a evolução da aquisição de recursos por meio dos projetos.
        </p>
        <br />
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetCreate();
                setOpenCreateDialog(true);
              }}
              className="group flex w-full cursor-default items-center justify-center rounded-xl  border p-2 hover:outline-double "
            >
              <HiOutlinePlus className=" h-6 w-6 rounded-full border group-hover:outline-double" />
              <span className="ml-2">Adicionar Requisição</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="top-20 flex w-96 flex-col rounded-md bg-zinc-800 text-white shadow-2xl  shadow-zinc-700">
            <DialogHeader className="flex items-center justify-center">
              <DialogTitle>Cadastro de membro do colegiado</DialogTitle>
              <DialogDescription className="">
                Preencher todos os campos {"(Os campos são em formato string)"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitCreate(createRequisition)}>
              <section className="grid h-full grid-cols-1 items-center gap-2 ">
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="name" className="text-right">
                    Nome do requisitante
                  </Label>
                  <Input id="name" type="text" {...registerCreate("name")} />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="notice">Edital de solicitação</Label>
                  <Input
                    id="notice"
                    type="text"
                    {...registerCreate("notice")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="developmentagency">Agência de fomento</Label>
                  <Input
                    id="developmentagency"
                    type="text"
                    {...registerCreate("developmentagency")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="validity">Valor de aquisição</Label>
                  <Input
                    id="validity"
                    type="text"
                    {...registerCreate("value")}
                  />
                </div>
                <div className="flex columns-1 flex-col items-start gap-3">
                  <Label htmlFor="link">Link de acesso</Label>
                  <Input id="link" type="text" {...registerCreate("link")} />
                </div>
                <DialogFooter className="flex columns-1 flex-col items-start gap-4 pt-2">
                  <Button className="bg-green-700 text-black hover:bg-green-600 hover:text-white">
                    {isSubmittingCreate ? <SyncLoader /> : "Criar Membro"}
                  </Button>
                </DialogFooter>
              </section>
            </form>
          </DialogContent>
        </Dialog>
        <Table className="">
          <TableCaption>A list of your recent invoices</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="">Docente</TableHead>
              <TableHead className="">Edital</TableHead>
              <TableHead className="">Agência de Fomento</TableHead>
              <TableHead className="">Valor</TableHead>
              <TableHead className="">Link de Acesso</TableHead>
              <TableHead className="">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {pageData?.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="">{data.name}</TableCell>
                <TableCell className="">{data.notice}</TableCell>
                <TableCell className="">{data.developmentagency}</TableCell>
                <TableCell className="">
                  {parseFloat(data.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="">
                  <Link href={data.link} target="_blank">
                    Link
                  </Link>
                </TableCell>
                <TableCell className="w-48 ">
                  <Dialog
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2 hover:bg-blue-500"
                        onClick={() => {
                          setOpenEditDialog(true);
                          setReqObject(data);
                          resetUpdate();
                        }}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-800  text-white">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Edicao de professores
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitUpdate(updateRequisition)}>
                        <section className="flex  justify-between pb-2">
                          <div className="flex w-full flex-col items-start justify-start gap-3">
                            <Input
                              type="hidden"
                              defaultValue={reqObject.id}
                              {...registerUpdate("id")}
                            />
                            <Label htmlFor="name">Docente</Label>
                            <Input
                              id="name"
                              type="text"
                              defaultValue={reqObject.name}
                              {...registerUpdate("name")}
                            />
                            <Label htmlFor="notice">Edital</Label>
                            <Input
                              id="notice"
                              type="text"
                              defaultValue={reqObject.notice}
                              {...registerUpdate("notice")}
                            />
                            <Label htmlFor="developmentagency">
                              Agencia de Fomento
                            </Label>
                            <Input
                              id="developmentagency"
                              type="text"
                              defaultValue={reqObject.developmentagency}
                              {...registerUpdate("developmentagency")}
                            />
                            <Label htmlFor="value">Valor</Label>
                            <Input
                              id="value"
                              type="text"
                              defaultValue={reqObject.value}
                              {...registerUpdate("value")}
                            />
                            <Label htmlFor="link">Link de acesso</Label>
                            <Input
                              id="link"
                              type="text"
                              defaultValue={reqObject.link}
                              {...registerUpdate("link")}
                            />
                          </div>
                        </section>
                        <DialogFooter>
                          <Button className="bg-green-500 hover:bg-green-600">
                            {isSubmittingUpdate ? (
                              <SyncLoader />
                            ) : (
                              "Salvar edição"
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
                          setIdReq(data.id);
                        }}
                        className=" hover:bg-red-500"
                        variant="outline"
                      >
                        Deletar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-800 text-white">
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
                            handleDeleteMember();
                          }}
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
            <tr>
              <td />
            </tr>
            <tr>
              <td className=" text-end" colSpan={4}>
                <span className="flex h-0.5 text-start">Total</span>
                R$
                {pageData
                  ?.reduce((total, data) => {
                    const value = parseFloat(data.value);
                    return isNaN(value) ? total : total + value;
                  }, 0)
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                <span className=""></span>
              </td>
            </tr>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

GcaAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default GcaAdmin;
