"use client";
// CreateServiceForm.tsx

import React, { useState } from "react";
import ServiceFormContainer, { formSchema } from "./ServiceFormContainer";
import { ItemType } from "@/lib/types";
import { createClient, createNewService } from "@/lib/requisicoes";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const CreateServiceForm = ({ setServiceN, setOpen, data }: any) => {
  const [loadingPost, setLoadingPost] = useState(false);
  // Estado local para controlar a lista de itens
  const [listItems, setListItems] = React.useState<ItemType[]>([]);
  const [newUser, setNewUser] = React.useState(false);

  const queryClient = new QueryClient();
  const userCompanyId = data.data.users[0].companyId;
  const handleSubmit = async (data: any) => {
    const verifyData = formSchema.safeParse(data);

    setLoadingPost(true);
    if (verifyData.success) {
      if (listItems.length > 0) {
        //console.log(verifyData.data, listItems);
        const alert = window.confirm("Deseja adicionar um novo cliente?");

        if (alert) {
          const serviceData = {
            created_at: new Date().toISOString(),
            client: {
              name: verifyData.data.name,
              contact: verifyData.data.contact,
            },
            items: listItems,
          };

          const clientFormat = {
            ...verifyData.data,
            companyId: userCompanyId,
          };

          if (newUser) {
            const data = await createClient(clientFormat);
          }
          const newService = await createNewService(serviceData);

          queryClient.invalidateQueries({
            queryKey: ["get-services"],
          });

          setServiceN(newService);
          // setOpen(false);
          setLoadingPost(false);
          toast("Serviço criado com sucesso!", {
            icon: "👏",
          });
        }
        // sendQueryParams({ name: "page", value: "1" });
      } else {
        alert("Adicione pelo menos um item na lista");
        setLoadingPost(false);
      }
    } else {
      //console.log(verifyData.error);
      setLoadingPost(false);
    }
  };

  return (
    <>
      <ServiceFormContainer
        isNew={true}
        onSubmit={handleSubmit}
        loadingPost={loadingPost}
        listItems={listItems}
        setListItems={setListItems}
        newUser={newUser}
        setNewUser={setNewUser}
      />
      {/* <AlertDialogTrigger open={openAlert} setOpen={setOpenAlert} /> */}
    </>
  );
};

export default CreateServiceForm;
