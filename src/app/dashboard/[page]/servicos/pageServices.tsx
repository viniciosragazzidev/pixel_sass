// Importação de módulos e componentes necessários
"use client";
import { Button } from "@/components/ui/button";
import { CgExport } from "react-icons/cg";
import { FaFilter, FaPlus } from "react-icons/fa6";
import TableService from "./Table";
import Pagination from "@/components/ui/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getServices } from "@/lib/requisicoes";
import { useNavigateWithQuery } from "@/lib/navigationUtils";
import { removeQueryParam } from "@/lib/queryStringUtils";
import AlertDialogTrigger from "@/components/ui/AlertDialog";
import ButtonDrawerService from "./manager_services/ServiceDrawer";
// Componente Servicos
const Servicos = (data: any) => {
  // Hooks para gerenciar o estado e a navegação
  const searchParams = useSearchParams();

  // Extração de itens e páginas dos serviços
  const page = searchParams.get("page");
  const [perPage, setPerPage] = useState(10);
  const items = 0;
  const pages = 0;
  ///////////////////////////////////////////////////////

  // Estados de filtro
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<string | null>();
  let urlFilter = searchParams.get("filter");
  ///////////////////////////////////////////////////////

  //=== Estado de loading
  const [isLoading, setIsLoading] = useState(false);
  ///////////////////////////////////////////////////////

  //===== Estados compartilhados
  const [isNewUser, setIsNewUser] = useState(true);
  ///////////////////////////////////////////////////////

  // Função para criar uma string de consulta
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },

    [searchParams]
  );
  ///////////////////////////////////////////////////////

  // Função para alterar o filtro de entrada
  const navigateWithQuery = useNavigateWithQuery();
  ///////////////////////////////////////////////////////

  const services: any = {
    data: [],
  };

  return (
    <main className="w-full">
      <section className="w-full container mx-auto px-4 py-4 flex flex-col justify-between   pb-6">
        <div className="flex gap-4 max-sm:justify-between py-4">
          <h1 className="text-xl font-semibold text-slate-200">Serviços</h1>{" "}
          <ButtonDrawerService
            isNewUser={isNewUser}
            setIsNewUser={setIsNewUser}
          />
        </div>
        <div className="flex gap-2 max-sm:gap-4 flex-wrap justify-between max-sm:justify-start">
          <div className="flex gap-2">
            <div className="inputWrapper">
              <span className="inputIcon text-teal-400">
                <FaFilter />
              </span>
              <input
                className="inputC "
                type="search"
                name="filter"
                onChange={(e) => setInputText(e.target.value)}
                value={inputText}
                placeholder="Pesquisar"
              />
            </div>
            <Button
              onClick={() => setFilter(inputText)}
              className="flex gap-1"
              variant="primary"
            >
              <FaFilter /> Filtrar
            </Button>
          </div>

          <Button className="flex gap-1  py-2" variant="primary">
            Exportar <CgExport />
          </Button>
        </div>

        <div className="py-10 ">
          {isLoading ? (
            <div className="flex w-full min-h-96 justify-center items-center">
              <span className="text-4xl animate-spin block text-slate-200 ">
                <VscLoading />{" "}
              </span>
            </div>
          ) : (
            <TableService
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
              services={services.data}
            />
          )}
          <Pagination
            itemsPerPage={Number(perPage)}
            items={items}
            page={Number(page)}
            pages={pages}
            setPerPage={setPerPage}
          />
        </div>
      </section>
    </main>
  );
};

// Exportação do componente
export default Servicos;
