import { Navbar } from "../components/Navbar";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import { Separator } from "~/components/ui/separator";

export default function PanelConfig() {
  return (
    <ProtectedRoute>
      <section className="flex ">
        <Navbar />
        <section
          className={`relative flex h-full w-[100vw] flex-col  items-center justify-between gap-10 bg-zinc-800 pt-[10vh] text-white`}
        >
          <h1 className="text-[2rem] font-bold">Painel de edição dos links</h1>
          <div className="hover:bg-silver flex w-[81vw] flex-col justify-between gap-5 ">
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas ao curso
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas a Estrutura Curricular
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas aos Eventos do Curso
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas as Regulamentacoes Internas
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas aos projetos do curso
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-bold">
                  Paginas relacionadas as Publicacoes do curso
                </h1>
              </div>
              <div className="flex h-[20vh] w-[80vw] flex-row gap-5 whitespace-pre-line"></div>
            </div>
            <Separator />
          </div>
        </section>
      </section>
    </ProtectedRoute>
  );
}
