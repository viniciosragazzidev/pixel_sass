"use client";

import React from "react";
import { FaHammer, FaHome, FaList, FaWallet } from "react-icons/fa";
import { FaGear, FaPersonCane, FaX } from "react-icons/fa6";

import { HiMenu } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname().split("/")[2];
  const pathnameExact =
    pathname === "servicos"
      ? "serviços"
      : pathname === "vendas"
      ? "vendas"
      : pathname === "clientes"
      ? "clientes"
      : pathname === "relatorios"
      ? "relatórios"
      : pathname === "configuracoes"
      ? "configurações"
      : "home";

  //console.log(pathname, pathnameExact);

  const items = [
    {
      name: "Home",
      icon: <FaHome />,
      href: "/dashboard/home",
    },
    {
      name: "Serviços",
      icon: <FaHammer />,
      href: "/dashboard/servicos",
    },
    {
      name: "Vendas",
      icon: <FaWallet />,
      href: "/dashboard/vendas",
    },
    {
      name: "Clientes",
      icon: <FaPersonCane />,
      href: "/dashboard/clientes",
    },
    {
      name: "Relatórios",
      icon: <FaList />,
      href: "/dashboard/relatorios",
    },
  ];
  return (
    <>
      <div
        className={`w-full h-screen fixed top-0 left-0 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="flex  w-[74px] h-screen relative top-0 left-0 bg-slate-950  ">
        <div
          className={`fixed w-full flex space-y-10  flex-col  px-4 justify-between  py-10   ${
            isOpen ? "max-w-[200px]" : "max-w-[74px]"
          } h-full top-0 left-0 bg-slate-950 z-50 border-r border-slate-700 border-opacity-30 transition-all`}
        >
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-slate-700 cursor-pointer self-center hover:text-teal-400 transition-all"
          >
            {!isOpen ? <HiMenu /> : <FaX className="text-2xl" />}
          </span>

          <nav>
            <ul className="flex space-y-10 flex-col">
              {items.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`text-lg  cursor-pointer text-teal-400 transition-all  flex items-center gap-4 `}
                >
                  <span
                    className={`bg-slate-900  ${
                      pathnameExact === item.name.toLowerCase() &&
                      "bg-teal-200 text-slate-900"
                    }   p-2 rounded-lg `}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-sm text-slate-200 ${
                      !isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="w-full flex items-center gap-4 ">
            <span className="text-xl  cursor-pointer text-teal-400 transition-all  ">
              <FaGear />
            </span>
            <span className={`text-sm text-slate-200 ${!isOpen && "hidden"}`}>
              Configurações
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
