"use client";

import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import FormNewService from "./form-new-service";

const NewServiceButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="primary"
          className="flex items-center text-[13px] gap-1 min-h-8"
        >
          <FaPlus />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-950/50 inset-0 fixed backdrop-blur-sm" />
        <Dialog.Content className="fixed  top-0 right-0 h-screen space-y-2 w-max min-w-[500px]  bg-slate-900 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-slate-200 font-bold text-2xl">
            {" "}
            Novo Serviço{" "}
          </Dialog.Title>
          <Dialog.Description className="text-slate-500 text-sm">
            Adicione as informações nescessárias abaixo{" "}
          </Dialog.Description>
          <FormNewService />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewServiceButton;
