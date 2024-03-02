"use client";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { ImageCircle } from "./ui/imageCircle";
import Logo from "./ui/logo";
import { FaAngleDown } from "react-icons/fa6";
import { useSession, signIn, signOut } from "next-auth/react";
import { getRoles, getUser } from "@/lib/requisicoes";
import { useQueries, useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";
const Header = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const pathname = usePathname().split("/")[2];
  const pathnameExact =
    pathname === "servicos"
      ? "Serviços"
      : pathname === "vendas"
      ? "Vendas"
      : pathname === "clientes"
      ? "Clientes"
      : pathname === "relatorios"
      ? "Relatórios"
      : pathname === "configuracoes"
      ? "Configurações"
      : "Home";

  return (
    <header className="w-full container mx-auto px-8 py-4 flex justify-between items-center border-b border-slate-900 pb-6 ">
      <div className="flex items-center flex-wrap gap-2 justify-center">
        <Logo />
        <div className="flex">
          <span className="text-2xl text-slate-900">/</span>
          <span className="text-slate-300 flex items-center gap-2 ">
            Dashboard{" "}
            <Badge variant="primary" className="font-semibold text-[10px]">
              PRO
            </Badge>
            <FaAngleDown className="text-sm text-slate-300" />
          </span>
          <span className="text-2xl text-slate-900">/</span>
          <span
            className={`text-slate-300 flex items-center gap-2 ${
              pathnameExact === "Home" && "hidden"
            }`}
          >
            {pathnameExact} <FaAngleDown className="text-sm text-slate-300" />
          </span>
        </div>
      </div>
      <>
        {isLoading ? (
          <span className="flex justify-center items-center text-teal-300 ">
            <VscLoading className="animate-spin text-2xl" />
          </span>
        ) : (
          <>
            <div className="user  flex  justify-center items-center gap-2">
              <div className="top flex text-slate-200 items-center gap-2">
                <div className="flex max-md:hidden flex-col gap-1">
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold">
                      {data?.users[0].name}
                    </span>
                    <Badge variant="primary" className="text-xs capitalize">
                      {data?.users[0]?.Role?.name}
                    </Badge>
                  </div>
                  <span className="text-xs   block max-w-min w-min font-semibold text-slate-500">
                    {data?.users[0].email}
                  </span>
                </div>
                <ImageCircle variant="base" alt="user" />
              </div>
              <span
                className="cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <FaAngleDown className="text-sm text-slate-400" />
              </span>
            </div>
          </>
        )}
      </>
    </header>
  );
};

export default Header;
