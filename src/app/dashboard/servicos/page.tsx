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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useState } from "react";
import NewServiceButton from "./components/newServiceButton";
const Servicos = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  let urlFilter = searchParams.get("filter");
  const [perPage, setPerPage] = useState(10);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<string | null>();

  const { isLoading, data: services } = useQuery({
    queryKey: ["get-services", page, perPage, filter],
    queryFn: () =>
      fetch(
        `http://localhost:3333/services?_page=${page || 1}&_per_page=${
          perPage || 10
        }${
          urlFilter && urlFilter?.length > 2
            ? `&id=${urlFilter}`
            : filter && filter?.length > 2
            ? `&id=${filter}`
            : ""
        }`,
        {
          next: {
            revalidate: 5,
          },
        }
      ).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });

  const items = services?.items || 0;
  const pages = services?.pages || 0;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const route = useRouter();
  const changeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value.length > 0) {
      setInputText(e.target.value);
      route.replace("?" + createQueryString("filter", e.target.value));
    } else {
      setFilter(e.target.value);
      setInputText(e.target.value);
      params.delete("filter");
      route.replace(pathname + "?" + params.toString());

      console.log(params.toString(), urlFilter, filter, e.target.value);
    }
  };
  return (
    <main>
      <Header />
      <section className="w-full container mx-auto px-4 py-4 flex flex-col justify-between   pb-6">
        <div className="flex gap-4 max-sm:justify-between py-4">
          <h1 className="text-xl font-semibold text-slate-200">Serviços</h1>{" "}
          <NewServiceButton />
        </div>
        <div className="flex gap-2 max-sm:gap-4 flex-wrap justify-between max-sm:justify-start">
          <div className="flex gap-2">
            <Input
              variant="normal"
              icon={<FaSearch />}
              classNameIcon="text-teal-300"
              name="search"
              onChange={(e) => changeInputFilter(e)}
              value={urlFilter || filter || ""}
              placeholder="Pesquisar"
            />

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
            <TableService services={services.data} />
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

export default Servicos;
