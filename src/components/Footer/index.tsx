import { isActiveNavAtom } from "../../atoms/activeNavAtom";

export function Footer() {
  return (
    <footer
      className={`sticky flex w-full flex-col  items-center bg-zinc-900 pt-2 `}
    >
      <div className={`-ml-1 flex w-full flex-col items-center`}>
        <div className="flex flex-col items-center ">
          <img src="/LogoUnemat.ico" width={"40rem"} alt="Logo" />
          <span className="w-[calc(10rem)] text-center">
            Universidade do Estado de Mato Grosso
          </span>
        </div>
        <div className="flex w-3/4 flex-row items-center justify-between pb-2">
          <div className="flex flex-col items-start justify-end ">
            <h1>Redes Sociais</h1>
            <span>
              <a href="https://sigaa.unemat.br/sigaa/verTelaLogin.do;jsessionid=2AFB15EE6649F8E3DA07545D80045256.srv2inst1">
                SIGAA
              </a>
            </span>
            <span>
              <a href="https://ecosistema.unemat.br/login">
                BIBLIOTECA VIRTUAL
              </a>
            </span>
            <span>
              <a href="https://unemat.br/pro-reitoria/proeg/est%C3%A1gios">
                ESTAGIO ACADEMICO
              </a>
            </span>
          </div>
          <div className="flex flex-col items-start justify-end ">
            <h1>Outros Acessos</h1>
            <span>
              <a href="https://sigaa.unemat.br/sigaa/verTelaLogin.do;jsessionid=2AFB15EE6649F8E3DA07545D80045256.srv2inst1">
                SIGAA
              </a>
            </span>
            <span>
              <a href="https://ecosistema.unemat.br/login">
                BIBLIOTECA VIRTUAL
              </a>
            </span>
            <span>
              <a href="https://unemat.br/pro-reitoria/proeg/est%C3%A1gios">
                ESTAGIO ACADEMICO
              </a>
            </span>
          </div>
          <div className="flex flex-col items-start justify-between">
            <h1>Câmpus Sinop - IMPERIAL</h1>
            <span></span>
            <span>
              Endereço: Av. dos Ingás, 3001 - Jardim Imperial, Sinop - MT
            </span>
            <span>CEP: 78555-000</span>
            <span>Telefone: 66 3511-2100</span>
            <span>
              Funcionamento Administrativo 7h00 às 11h00 e 13h00 às 17h00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
