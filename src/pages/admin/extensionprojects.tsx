import Layout from "~/components/admin/Layout";
import type { NextPageWithLayout } from "~/types/layout";
import { useState, type ReactElement } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Card from "~/components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/utils/cn";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { CardUpdateSchema } from "~/server/common/CardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SyncLoader from "react-spinners/SyncLoader";
import { Separator } from "~/components/ui/separator";

const ExtensionProjectsAdmin: NextPageWithLayout = () => {
  const [cardNameSelected, setCardNameSelected] = useState("");
  const [cardInfoSelected, setCardInfoSelected] = useState("");
  const [cardIdSelected, setCardIdSelected] = useState<number>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: pageData,
    isLoading: pageIsLoading,
    isError,
  } = api.gca.getAll.useQuery();

  if (pageIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // const { mutateAsync: updateCard } = api.dashboard.updateCard.useMutation({
  //   onSuccess: () => {
  //     toast.success("Card updated successfully");
  //   },
  //   onError: () => {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data "
  //     );
  //   },
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm<z.infer<typeof CardUpdateSchema>>({
  //   resolver: zodResolver(CardUpdateSchema),
  //   defaultValues: {
  //     name: cardNameSelected,
  //     info: cardInfoSelected,
  //   },
  // });

  // const changeCard: SubmitHandler<z.infer<typeof CardUpdateSchema>> = async (
  //   data
  // ) => {
  //   const res = await updateCard(data);
  //   console.log("res:", res);
  //   if (res) {
  //     toast.success("Card updated successfully");
  //     reset();
  //   } else {
  //     toast.error(
  //       "Something is wrong in update data, please validate the data"
  //     );
  //   }
  // };

  return (
    <section className="flex w-full flex-col items-center gap-4 bg-zinc-800 p-4 text-white">
      <div className="flex flex-col gap-4 pl-4">
        <h1 className="text-3xl font-bold text-white">
          Grupo de Computação apliCada (GCC)
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
        <table className="table-auto border">
          <thead>
            <tr className="border">
              <th className="border">Docente</th>
              <th className="border">Edital</th>
              <th className="border">Agência de Fomento</th>
              <th className="border">Valor</th>
              <th className="border">Ações</th>
            </tr>
          </thead>
          <tbody className="border">
            {pageData?.map((data) => (
              <tr key={data.id}>
                <td className="border">{data.name}</td>
                <td className="border">{data.notice}</td>
                <td className="border">{data.developmentagency}</td>
                <td className="border">
                  {parseFloat(data.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="w-16 border">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edicao de professores</DialogTitle>
                        <DialogDescription>
                          Edicao de professores
                        </DialogDescription>
                      </DialogHeader>
                      <section className="flex justify-between">
                        <div className="flex flex-col items-start justify-start gap-3">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Nome"
                            // {...register("name")}
                          />
                          {/* {errors.name && (
                                <span className="text-red-500">
                                  {errors.name.message}
                                </span>
                              )} */}
                          <Label htmlFor="type">Tipo</Label>
                          <Input
                            id="type"
                            type="text"
                            placeholder="Tipo"
                            // {...register("type")}
                          />
                          {/* {errors.type && (
                            <span className="text-red-500">
                              {errors.type.message}
                            </span>
                          )} */}
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            // {...register("email")}
                          />
                          {/* {errors.email && (
                            <span className="text-red-500">
                              {errors.email.message}
                            </span>
                          )} */}
                          <Label htmlFor="validity">Vigência</Label>
                          <Input
                            id="validity"
                            type="text"
                            placeholder="Vigência"
                            // {...register("validity")}
                          />
                          {/* {errors.validity && (
                            <span className="text-red-500">
                              {errors.validity.message}
                            </span>
                          )} */}
                        </div>
                      </section>
                      <DialogFooter>
                        <Button
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => setOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => setOpen(false)}
                        >
                          Salvar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
            <tr>
              <td />
            </tr>
            <tr>
              <td className="border text-end" colSpan={4}>
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
          </tbody>
        </table>
      </div>
      <Separator />
    </section>
  );
};

ExtensionProjectsAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ExtensionProjectsAdmin;
