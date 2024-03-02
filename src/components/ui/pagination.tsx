"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

type PaginationProps = {
  items: number;
  page: number;
  pages: number;
  itemsPerPage: number;
  setPerPage: (value: number) => void;
};

const Pagination = ({
  items,
  page,
  pages,
  itemsPerPage,
  setPerPage,
}: PaginationProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const current = new URLSearchParams(searchParams.toString());
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setPerPage(Number(e.target.value));
    //console.log(itemsPerPage);

    const newQueryString = createQueryString("page", "1");

    router.replace("?" + newQueryString);
  };

  const changeItems = (name: string) => {
    let pageC = null;
    setPerPage(10);
    const newQueryString = (pageC?: any, itemsPerPageC?: any) => {
      return `?${createQueryString("page", String(pageC || "1"))} `;
    };
    if (name === "first") {
      pageC = "1";
      router.push(newQueryString(pageC));
    }
    if (name === "last") {
      pageC = pages;
      router.push(newQueryString(pageC));
    }
    if (name === "next") {
      if (page < pages) {
        pageC = page + 1;
        //console.log(page, pageC);

        router.push(newQueryString(page == 0 ? pageC + 1 : pageC));
      }
    }
    if (name === "previous") {
      if (page > 1) {
        pageC = page - 1;
        router.push(newQueryString(pageC));
      }
    }
  };

  return (
    <div className="flex justify-between flex-col md:flex-row     items-center gap-4 py-4">
      <span className="text-slate-400 text-xs">
        Mostrando {itemsPerPage} de {items} registros
      </span>

      <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-xs">
        <div className="flex gap-2 items-center">
          <span>Linhas por pagina</span>
          <select
            value={itemsPerPage}
            onChange={changeItemsPerPage}
            className="bg-slate-800 w-14 rounded-lg px-1 py-2 cursor-pointer text-slate-400"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <span className="text-slate-400 text-xs">
          Pagina {page || 1} de {pages}
        </span>

        <div className="flex items-center  text-xs gap-2">
          <span
            id="first"
            onClick={(e) => changeItems("first")}
            className="bg-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-900 active:scale-95 transition-all"
          >
            <FaAnglesLeft />
          </span>
          <span
            id="previous"
            onClick={(e) => changeItems("previous")}
            className="bg-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-900 active:scale-95 transition-all"
          >
            <FaAngleLeft />
          </span>
          <span
            id="next"
            onClick={(e) => changeItems("next")}
            className="bg-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-900 active:scale-95 transition-all"
          >
            <FaAngleRight />
          </span>
          <span
            id="last"
            onClick={(e) => changeItems("last")}
            className="bg-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-900 active:scale-95 transition-all"
          >
            <FaAnglesRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
