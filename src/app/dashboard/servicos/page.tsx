// Importação de módulos e componentes necessários
"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input, InputController } from "@/components/ui/input";
import { CgExport } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { FaFilter, FaPlus } from "react-icons/fa6";
import TableService from "./Table";
import Pagination from "@/components/ui/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ServiceTriggerButton from "./components/ServiceTrigger";
import { getServices } from "@/utils/lib";
import { useNavigateWithQuery } from "@/utils/navigationUtils";
import { removeQueryParam } from "@/utils/queryStringUtils";
import AlertDialogTrigger from "@/components/ui/AlertDialog";
// Componente Servicos
const Servicos = () => {
  const [openAlert, setOpenAlert] = useState(false);

  // Hooks para gerenciar o estado e a navegação
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  let urlFilter = searchParams.get("filter");
  const [perPage, setPerPage] = useState(10);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<string | null>();
  const [serviceN, setServiceN] = useState({} as any);

  // Utilização de useQuery para buscar dados do servidor
  const { isLoading, data: services } = useQuery({
    queryKey: ["get-services", page, perPage, filter, serviceN],
    queryFn: () => getServices(Number(page) || 1, perPage, urlFilter, filter),
    placeholderData: keepPreviousData,
  });

  // Extração de itens e páginas dos serviços
  const items = services?.items || 0;
  const pages = services?.pages || 0;

  // Função para criar uma string de consulta
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },

    [searchParams]
  );

  // Utilização do hook useRouter para navegação

  // Função para alterar o filtro de entrada
  const navigateWithQuery = useNavigateWithQuery();

  // Função para lidar com a mudança do filtro de busca
  const changeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    if (value) {
      const queryParams = createQueryString("filter", value);
      navigateWithQuery(queryParams);

      if (value.length < 2) {
        setFilter("");
      }
    } else {
      const queryParams = removeQueryParam(searchParams, "filter");
      navigateWithQuery(queryParams);
    }
  };
  useEffect(() => {
    console.log(serviceN);
    console.log(services);
  }, []);

  return (
    <main className="w-full">
      <Header />
      <section className="w-full container mx-auto px-4 py-4 flex flex-col justify-between   pb-6">
        <div className="flex gap-4 max-sm:justify-between py-4">
          <h1 className="text-xl font-semibold text-slate-200">Serviços</h1>{" "}
          <ServiceTriggerButton
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            serviceN={serviceN}
            setServiceN={setServiceN}
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
                value={inputText}
                onChange={changeInputFilter}
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
        <>
          <AlertDialogTrigger
            open={openAlert}
            setOpen={setOpenAlert}
            handleConfirm
          />
        </>
        <div className="py-10 ">
          {isLoading ? (
            <div className="flex w-full min-h-96 justify-center items-center">
              <span className="text-4xl animate-spin block text-slate-200 ">
                <VscLoading />{" "}
              </span>
            </div>
          ) : (
            <TableService
              services={services.data}
              serviceN={serviceN}
              setServiceN={setServiceN}
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
