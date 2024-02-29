// EditServiceForm.tsx

import React from "react";
import ServiceFormContainer, { formSchema } from "./ServiceFormContainer";
import { ItemType, ServiceType } from "@/lib/types";
import { deleteService, editClient, editService } from "@/lib/requisicoes";
import { toast } from "sonner";

interface EditServiceFormProps {
  service: ServiceType;
  setServiceN: any;
  setOpen: any;
  openAlert: boolean;
  setOpenAlert: any;
}

const EditServiceForm = ({
  service,
  setServiceN,
  setOpen,
}: EditServiceFormProps) => {
  const [listItems, setListItems] = React.useState<ItemType[]>([]);
  const handleSubmit = async (data: any) => {
    const verifyData = formSchema.safeParse(data);

    if (verifyData.success) {
      if (listItems.length > 0) {
        const confirm = window.confirm("Deseja editar o serviço?");

        if (confirm) {
          const clientEdit = await editClient(data);
          const buildService = {
            id: service.id,
            created_at: service.created_at,

            client: {
              id: clientEdit.id,
              name: clientEdit.name,
              contact: clientEdit.contact,
            },
            items: listItems,
          };

          const serviceEdit = await editService(buildService);
          setServiceN(serviceEdit);
          setOpen(false);
          toast("#" + serviceEdit.id + " editado com sucesso", {
            icon: "✅",
          });
        }
      } else {
        alert("Adicione pelo menos um item ao serviço");
      }
    } else {
      console.log(verifyData.error);
    }
  };

  const handleDeleteService = async () => {
    const confirm = window.confirm("Deseja excluir o serviço?");

    if (confirm) {
      const serviceDelete = await deleteService(service.id);
      const random = Math.floor(Math.random() * 1000);
      setServiceN(serviceDelete + random);
      setOpen(false);

      toast("#" + serviceDelete.id + " excluido com sucesso", {
        icon: "🗑️",
      });
    }
  };

  return (
    <ServiceFormContainer
      listItems={listItems}
      setListItems={setListItems}
      isNew={false}
      onSubmit={handleSubmit}
      deleteService={handleDeleteService}
      service={service}
    />
  );
};

export default EditServiceForm;
