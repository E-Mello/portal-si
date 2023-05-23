import Image from "next/image";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from ".././types/layout";
import type { ReactElement } from "react";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";

const LogoUnematSupabase =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/LogoUnemat.png?t=2023-02-22T23%3A57%3A16.417Z";

const Home: NextPageWithLayout = () => {
  return (
    <section className="flex h-full w-full flex-col justify-evenly bg-zinc-800">
      <div
        className={`flex h-[75vh] items-center justify-center max-sm:h-[55vh] ${
          isActiveNavAtom ? "max-sm:h-[71vh]" : ""
        }`}
      >
        <Image
          src={LogoUnematSupabase}
          width={500}
          height={500}
          alt=""
          className={`opacity-10 `}
        />
      </div>
      <footer
        className={`bottom-0 flex h-[25vh] w-full flex-col items-center overflow-hidden pt-16  text-center max-sm:overflow-hidden max-sm:pt-0 max-sm:h-[40vh]${
          isActiveNavAtom ? "" : "text-center "
        } `}
      >
        <div className={`flex h-full w-full flex-col items-center`}>
          <div className=" max-sm:flex max-sm:h-full max-sm:flex-col max-sm:justify-evenly ">
            <div className="flex flex-row items-center justify-center pb-5 text-center max-sm:pb-0">
              <span className="flex w-full flex-row items-center justify-center text-center">
                Universidade do Estado de Mato Grosso - UNEMAT
              </span>
            </div>
            <div
              className={`${
                isActiveNavAtom ? "" : "text-center"
              } flex w-full flex-row items-center justify-center  `}
            >
              <div
                className={`${
                  isActiveNavAtom ? "" : "text-center"
                } flex flex-col items-center justify-between`}
              >
                <h1>Câmpus Sinop - IMPERIAL</h1>

                <span
                  className={`flex ${
                    isActiveNavAtom ? "" : "text-center"
                  } flex flex-col items-center justify-between`}
                >
                  Endereço: Av. dos Ingás, 3001 - Jardim Imperial, Sinop - MT
                </span>
                <span
                  className={`flex ${
                    isActiveNavAtom ? "" : "text-center"
                  } flex flex-col items-center justify-between`}
                >
                  CEP: 78555-000
                </span>
                <span
                  className={`flex ${
                    isActiveNavAtom ? "" : "text-center"
                  } flex flex-col items-center justify-between`}
                >
                  Telefone: 66 3511-2100
                </span>
                <span>
                  Funcionamento Administrativo: 7h00 às 11h00 e 13h00 às 17h00
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Home;
