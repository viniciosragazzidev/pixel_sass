"use client";

// ServiceFormContainer.tsx

import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ItemType } from "@/lib/types";
import { getClientsByDocumentOrId } from "@/lib/requisicoes";
import {
  FaCalendarMinus,
  FaGenderless,
  FaPen,
  FaPhone,
  FaPlus,
  FaSpinner,
  FaTrash,
  FaUserLarge,
} from "react-icons/fa6";
import { FaEdit, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ImBlocked } from "react-icons/im";
import * as Dialog from "@radix-ui/react-dialog";
import FormNewItem from "./FormNewItem";
import AlertDialogTrigger from "@/components/ui/AlertDialog";
import { VscLoading } from "react-icons/vsc";
interface ServiceFormContainerProps {
  isNew: boolean;
  service?: any;
  onSubmit: (data: any) => void;
  loadingPost?: boolean;
  listItems: ItemType[];
  setListItems: any;
  newUser?: boolean;
  setNewUser?: any;
  deleteService?: (item: ItemType) => void;
}
export const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  document: z.string().min(1, { message: "O documento é obrigatório" }),
  contact: z.string().min(1, { message: "O contato é obrigatório" }),
  gender: z.string().min(1, { message: "O genero é obrigatório" }),
  address: z.string().min(1, { message: "O endereço é obrigatório" }),
  cep: z.string().min(1, { message: "O CEP é obrigatório" }),
});
export type createServiceFormData = z.infer<typeof formSchema>;

const ServiceFormContainer: FC<ServiceFormContainerProps> = ({
  isNew,
  service,
  onSubmit,
  loadingPost,
  listItems,
  setListItems,
  newUser,
  setNewUser,
  deleteService,
}) => {
  // Estado local para controlar o Dialog Alert

  // Estado local para controlar a habilitação/desabilitação dos inputs do usuário
  const [disabledUserInputs, setDisabledUserInputs] = useState(
    isNew ? true : false
  );
  // Estado local para controlar a exibição do formulário para adicionar novo item
  const [modeAddNewItem, setModeAddNewItem] = useState(false);
  //Estado para guardar os dados da OS atual

  // React Hook Form para controle do formulário
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createServiceFormData>({
    resolver: zodResolver(formSchema),
  });
  // Função para limpar os inputs do formulário
  const resetInputs = () => {
    reset({
      name: "",
      contact: "",
      address: "",
      cep: "",

      gender: "Masculino",
    });
  };

  const sendValuesToFields = async (data: any) => {
    const document = data.client.document;
    const client = await getClientsByDocumentOrId(document);

    setValue("name", client.name);
    setValue("contact", client.contact);
    setValue("gender", client.gender);
    setValue("address", client.address);
    setValue("cep", client.cep);
    setValue("document", client.document);

    setListItems([...listItems, ...data.items]);
    if (client) {
      setLoadData(false);
    }
  };

  // Função para verificar o documento do cliente ao ser digitado

  const [loadClient, setLoadClient] = useState(false);
  const verifyDocumentByClient = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length === 11) {
      let document = e.target.value;
      const data = await getClientsByDocumentOrId(document);
      const client = data.client;
      setLoadClient(true);

      if (client) {
        setValue("name", client.name);
        setValue("contact", client.contact);
        setValue("gender", client.gender);
        setValue("address", client.address);
        setValue("cep", client.cep);
        setValue("document", client.document);
        isNew && setNewUser(false);
        setLoadClient(false);
      } else {
        isNew && setNewUser(true);
        setDisabledUserInputs(false);
      }
    } else {
      isNew && setDisabledUserInputs(true);
      resetInputs();
    }
  };

  // Estado local para controlar o item atual em edição
  const [currentItem, setCurrentItem] = React.useState<ItemType>();
  // Função para editar um item da lista
  const handleEditItem = (item: ItemType) => {
    setCurrentItem(item);
    setModeAddNewItem(!modeAddNewItem);
  };

  // Função para excluir um item da lista
  const handleDeleteItem = (item: ItemType) => {
    setListItems(listItems.filter((i) => i.id !== item.id));
  };

  // Função para lidar com a submissão do formulário

  const submitHandler = (data: any) => {
    onSubmit(data);
  };
  const genders = ["Masculino", "Feminino", "Outro"];

  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    if (service) {
      setLoadData(true);
      sendValuesToFields(service);
    }
  }, []);
  return (
    <div className="py-6 pt-32 px-4 space-y-6">
      {loadData ? (
        <span>Carregando...</span>
      ) : (
        <>
          {!isNew && deleteService && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="cancel"
                className="flex gap-2 items-center"
                onClick={() => {
                  deleteService(service);
                }}
              >
                <FaTrash />
                <span>Excluir</span>
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <label htmlFor="document" className="text-slate-300 text-sm ">
                  Documento{" "}
                </label>

                <div className={`inputWrapper `}>
                  <span className="text-teal-300">
                    <FaPen />
                  </span>
                  <input
                    type="text"
                    className="inputC"
                    {...register("document", {
                      onChange: (e) => verifyDocumentByClient(e),
                    })}
                    placeholder="000.000.000-00"
                  />
                  <span
                    className={` hidden ${loadClient && "block"} text-teal-300`}
                  >
                    <VscLoading className="animate-spin" />
                  </span>
                </div>
                {errors.document && errors.document.message && (
                  <span className="subtitle_error">
                    {errors.document.message.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 flex-1 w-full max-w-[280px]">
                <label htmlFor="client" className="text-slate-300 text-sm ">
                  Cliente
                </label>

                <div
                  className={`inputWrapper ${
                    disabledUserInputs && "opacity-50"
                  }`}
                >
                  <span className="text-teal-300">
                    <FaUserLarge />
                  </span>
                  <input
                    type=""
                    className="inputC w-full max-w-none "
                    disabled={disabledUserInputs}
                    {...register("name")}
                    placeholder="Jose da Silva"
                  />
                </div>
                {errors.name && errors.name.message && (
                  <span className="subtitle_error">
                    {errors.name.message.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-3 flex-1">
                <label htmlFor="contact" className="text-slate-300 text-sm ">
                  Contato{" "}
                </label>
                <div
                  className={`inputWrapper ${
                    disabledUserInputs && "opacity-50"
                  }`}
                >
                  <span className="text-teal-300">
                    <FaPhone />
                  </span>
                  <input
                    type=""
                    disabled={disabledUserInputs}
                    className="inputC"
                    {...register("contact")}
                    placeholder="(00)00000-0000"
                  />
                </div>
                {errors.contact && errors.contact.message && (
                  <span className="subtitle_error">
                    {errors.contact.message.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <label htmlFor="gender" className="text-slate-300 text-sm ">
                  Gênero
                </label>

                <div
                  className={`selectWrapper  ${
                    disabledUserInputs && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="text-teal-300">
                    <FaGenderless />
                  </span>
                  <select
                    className={`selectC `}
                    defaultValue={"Masculino"}
                    disabled={disabledUserInputs}
                    {...register("gender", { required: true })}
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                {errors.gender && errors.gender.message && (
                  <span className="subtitle_error">
                    {errors.gender.message.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-3 flex-1">
                <label htmlFor="andress" className="text-slate-300 text-sm ">
                  Endereço{" "}
                </label>

                <div
                  className={`inputWrapper ${
                    disabledUserInputs && "opacity-50"
                  }`}
                >
                  <span className="text-teal-300">
                    <FaHome />
                  </span>
                  <input
                    type=""
                    disabled={disabledUserInputs}
                    className="inputC"
                    {...register("address")}
                    placeholder="Rua das flores, 123 "
                  />
                </div>
                {errors.address && errors.address.message && (
                  <span className="subtitle_error">
                    {errors.address.message.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <label htmlFor="cep" className="text-slate-300 text-sm ">
                  CEP
                </label>

                <div
                  className={`inputWrapper ${
                    disabledUserInputs && "opacity-50"
                  }`}
                >
                  <span className="text-teal-300">
                    <FaCalendarMinus />
                  </span>
                  <input
                    type=""
                    disabled={disabledUserInputs}
                    {...register("cep")}
                    placeholder="00000-000"
                    className="inputC"
                  />
                </div>
                {errors.cep && errors.cep.message && (
                  <span className="subtitle_error">
                    {errors.cep.message.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-slate-300 text-lg font-semibold">
                  Itens adicionados
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setModeAddNewItem(!modeAddNewItem);
                    setCurrentItem(undefined);
                  }}
                >
                  <FaPlus />
                </Button>
              </div>
              {!modeAddNewItem && (
                <>
                  {listItems.length > 0 ? (
                    <div className="flex w-full pt-4">
                      <ul className="flex flex-col w-full space-y-3">
                        {listItems.map((item, index) => (
                          <li
                            key={index}
                            className="w-full flex justify-between items-center"
                          >
                            <div className="flex flex-col">
                              <div className="flex text-slate-200 gap-1">
                                <span>{item.item}</span>
                                <span className="text-teal-300">
                                  {item.brand}
                                </span>
                              </div>
                              <span className="text-slate-400 text-sm">
                                {item.model}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span
                                onClick={() => handleEditItem(item)}
                                className="text-teal-300  cursor-pointer active:scale-95 transition-all"
                              >
                                <FaEdit />
                              </span>
                              <span
                                onClick={() => handleDeleteItem(item)}
                                className="text-red-500  cursor-pointer active:scale-95 transition-all"
                              >
                                <FaTrash />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full pt-4 gap-3  min-h-40">
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="text-teal-300 text-2xl">
                          <ImBlocked />
                        </span>{" "}
                        Nenhum item encontrado
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              className={`flex gap-4 justify-end ${modeAddNewItem && "hidden"}`}
            >
              <Button variant="primary" type="submit">
                {loadingPost ? (
                  <FaSpinner className="animate-spin" />
                ) : isNew ? (
                  "Adicionar"
                ) : (
                  "Atualizar"
                )}
              </Button>

              <Dialog.Close>
                <Button variant="cancel">Cancelar</Button>
              </Dialog.Close>
            </div>
          </form>

          {/* Renderização do formulário para adicionar novo item */}
          {modeAddNewItem && (
            <FormNewItem
              listItems={listItems}
              setListItems={setListItems}
              setModeAddNewItem={setModeAddNewItem}
              modeAddNewItem={modeAddNewItem}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ServiceFormContainer;
