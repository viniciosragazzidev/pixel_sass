"use client";

import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import CreateServiceForm from "./CreateServiceForm";
import { IoIosMore } from "react-icons/io";
import EditServiceForm from "./EditServiceForm";

const ServiceTriggerButton = ({
  serviceN,
  setServiceN,
  service,
  openAlert,
  setOpenAlert,
}: {
  serviceN: any;
  setServiceN: any;
  service?: any;
  openAlert: boolean;
  setOpenAlert: any;
}) => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean | undefined>();

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <Button
          variant="primary"
          className="flex items-center text-[13px] gap-1 min-h-8"
        >
          {service ? <IoIosMore /> : <FaPlus />}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-950/80 inset-0 fixed backdrop-blur-sm" />
        <div className="fixed  h-screen   top-0 right-0 ">
          <Dialog.Content className=" relative h-screen overflow-y-auto space-y-2 w-full max-w-xl bg-slate-950  rounded-lg shadow-lg">
            <div className="flex fixed bg-slate-950 z-50 w-full p-4 flex-col gap-2">
              <Dialog.Title className="text-slate-200 font-bold text-2xl">
                {" "}
                {service ? "Editar Serviço" : "Adicionar Serviço"}
              </Dialog.Title>
              <Dialog.Description className="text-slate-500 text-sm">
                {service
                  ? "Edit as informações nescessárias abaixo"
                  : " Adicione as informações nescessárias abaixo"}
              </Dialog.Description>
            </div>
            {service ? (
              <EditServiceForm
                service={service}
                setServiceN={setServiceN}
                setOpen={setDialogOpen}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
              />
            ) : (
              <CreateServiceForm
                setServiceN={setServiceN}
                setOpen={setDialogOpen}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
              />
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ServiceTriggerButton;
