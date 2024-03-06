"use client";
import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FaPen, FaTrash } from "react-icons/fa6";

type TableItemProps = {
  items: ItemType[]; // Defina o tipo correto para as props
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<ItemType | undefined>>;
  setModeAddItem: React.Dispatch<React.SetStateAction<boolean>>;
};
const TableItem = ({
  items,
  setItems,
  setCurrentItem,
  setModeAddItem,
}: TableItemProps) => {
  const handleEditItem = (item: ItemType) => {
    setCurrentItem(item);
    setModeAddItem(true);
  };

  const handleDeleteItem = (item: ItemType) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };
  console.log(items);

  return (
    <div className="flex flex-col  overflow-x-auto">
      {items.length > 0 ? (
        <Table className="w-full min-w-screen-sm overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tecnico</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-nowrap text-slate-200 font-bold">
                    {item.item}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-nowrap text-slate-200 font-bold">
                    {item.brand}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-nowrap text-slate-200 font-bold">
                    {item.model}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-nowrap text-slate-200 font-bold">
                    {item.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-nowrap text-slate-200 font-bold">
                    {item.tecnico}
                  </span>
                </div>
              </TableCell>
              <TableCell className="flex gap-2">
                <span
                  className="cursor-pointer"
                  onClick={() => handleEditItem(item)}
                >
                  <FaPen />
                </span>
                <span
                  onClick={() => handleDeleteItem(item)}
                  className="cursor-pointer"
                >
                  <FaTrash />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-slate-200">Nenhum item encontrado</p>
        </div>
      )}
    </div>
  );
};

export default TableItem;
