"use client";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { ImageCircle } from "./ui/imageCircle";
import Logo from "./ui/logo";
import { FaAngleDown } from "react-icons/fa6";
import { useSession, signIn, signOut } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  console.log(session);

  const pathname = usePathname().split("/")[2];
  const pathnameExact =
    pathname === "servicos"
      ? "Serviços"
      : pathname === "vendas"
      ? "Vendas"
      : pathname === undefined
      ? ""
      : pathname === "relatorios"
      ? "Relatórios"
      : pathname === "configuracoes"
      ? "Configurações"
      : "Clientes";
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
              !pathname && "hidden"
            }`}
          >
            {pathnameExact} <FaAngleDown className="text-sm text-slate-300" />
          </span>
        </div>
      </div>

      <div className="user  flex  justify-center items-center gap-2">
        <div className="top flex text-slate-200 items-center gap-2">
          <div className="flex max-md:hidden flex-col gap-1">
            <div className="flex gap-2">
              <span className="text-sm font-semibold">Vinicios Ragazzi</span>
              <Badge variant="primary" className="text-xs">
                {" "}
                Admin{" "}
              </Badge>
            </div>
            <span className="text-xs   block max-w-min w-min font-semibold text-slate-500">
              {session?.user?.email}
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
    </header>
  );
};

export default Header;
