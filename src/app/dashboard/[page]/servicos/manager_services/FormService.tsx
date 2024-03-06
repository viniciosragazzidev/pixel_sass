"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ItemType } from "@/lib/types";
import React, { useState } from "react";
import {
  FaAddressCard,
  FaBuilding,
  FaBullseye,
  FaCity,
  FaGenderless,
  FaIdBadge,
  FaPhone,
  FaPlus,
  FaUser,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import TableItem from "./item/TableItem";
import AddItem from "./item/AddItem";
import { Toaster, toast } from "sonner";
import { getClient } from "@/lib/requisicoes";
import { VscLoading } from "react-icons/vsc";
import { validarCPF } from "@/lib/utils";

const schema = z.object({
  document: z
    .string()
    .min(1, { message: "O documento é obrigatório" })
    .max(14, { message: "O documento deve ter no maximo 14 caracteres" }),
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  genero: z.string().min(1, { message: "O genero é obrigatório" }),
  contato: z.string().min(1, { message: "O contato é obrigatório" }),
  endereco: z.string().min(1, { message: "O endereço é obrigatório" }),
  cidade: z.string().min(1, { message: "A cidade é obrigatória" }),
  cep: z.string().min(1, { message: "O CEP é obrigatório" }),
  descricao: z.string().min(1, { message: "A descricão é obrigatória" }),
});

type FormNewUserProps = {
  isNewUser: boolean;
  data?: any;
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: any;
};

const FormService = ({
  isNewUser,
  data,
  isDrawerOpen,
  setIsDrawerOpen,
}: FormNewUserProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const validate = schema.safeParse(data);

    if (validate.success) {
      if (items.length < 1) {
        toast.error("Adicione pelo menos um item");
      } else {
        console.table(data);
        console.table(items);
      }
    }
  };
  //---- Items
  const [items, setItems] = useState<ItemType[]>([]);

  const addItemToList = (newItem: ItemType) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const [modeAddItem, setModeAddItem] = useState(false);

  const [currentItem, setCurrentItem] = useState<ItemType | undefined>();

  ////////////////////////////////////////////////////////////

  // ----- Cliente
  const [disabledInput, setDisabledInput] = useState(true);
  const [document, setDocument] = useState("");
  const [loadingClient, setLoadingClient] = useState(false);

  const setClientesFields = (client: any) => {
    setValue("document", client.document);
    setValue("nome", client.name);
    setValue("genero", client.gender);
    setValue("contato", client.contact);
    setValue("endereco", client.address);
    setValue("cep", client.cep);
    setValue("cidade", client.city);
  };

  const resetFields = () => {
    setValue("nome", "");
    setValue("genero", "");
    setValue("contato", "");
    setValue("endereco", "");
    setValue("cep", "");
    setValue("cidade", "");
  };

  const verifyClientByDocument = async (value: string) => {
    setLoadingClient(true);
    if (value.length === 11 || value.length === 14) {
      const cpfValido = validarCPF(value);

      if (cpfValido) {
        const cliente = await getClient(value);
        console.log("cliente: " + JSON.stringify(cliente));

        if (cliente.client !== null) {
          toast.success("Cliente encontrado " + JSON.stringify(cliente));
          setLoadingClient(false);
          setClientesFields(cliente.client);
        } else {
          toast.error("Cliente não encontrado");
          setDisabledInput(false);
          setLoadingClient(false);
          resetFields();
        }
      } else {
        setLoadingClient(false);
        toast.error("CPF inválido");
        resetFields();
      }
    } else {
      setDisabledInput(true);
      setLoadingClient(false);
    }
  };

  //////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col space-y-10 md:flex-row  gap-6   overflow-y-auto opacityShow pb-6">
      <form
        className="w-full   p-5 space-y-5 md:max-w-[50vw]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl text-slate-200 font-semibold ">
          {isNewUser ? "Adicione um novo serviço" : "Atualize um serviço"}
        </h1>
        <p className="text-slate-400">
          {isNewUser
            ? "Informe abaixo os dados relacionados a esta ordem de serviço."
            : "Atualize os dados da ordem de serviço."}
        </p>
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2 ">
            <label className="" htmlFor="document">
              Documento <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <span className="text-teal-400">
                <FaIdBadge />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("document", {
                  onChange: (e) => {
                    verifyClientByDocument(e.target.value);
                  },
                })}
                placeholder="Documento"
              />
              <span className={`text-teal-400  ${!loadingClient && "hidden"}`}>
                <VscLoading className="animate-spin" />
              </span>
            </div>
            {errors.document && (
              <p className="text-teal-500 text-xs font-semibold">
                Documento é obrigatório
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <label className="" htmlFor="nome">
              Nome <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <span className="text-teal-400">
                <FaUser />
              </span>
              <input
                disabled={disabledInput}
                type="text"
                className="inputC"
                {...register("nome")}
                placeholder="Nome"
              />
            </div>
            {errors.nome && (
              <p className="text-teal-500 text-xs font-semibold">
                Nome é obrigatório
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2 ">
            <label className="" htmlFor="genero">
              Gênero <span className="text-teal-400">*</span>
            </label>
            <div className="selectWrapper ">
              <span className="text-teal-400">
                <FaGenderless />
              </span>
              <select
                id="genero"
                {...register("genero")}
                disabled={disabledInput}
                className="selectC"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            {errors.genero && (
              <p className="text-teal-500 text-xs font-semibold">
                Gênero é obrigatório
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <label className="" htmlFor="contato">
              Contato <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <span className="text-teal-400">
                <FaPhone />
              </span>
              <input
                disabled={disabledInput}
                type="text"
                className="inputC"
                {...register("contato")}
                placeholder="Contato"
              />
            </div>
            {errors.contato && (
              <p className="text-teal-500 text-xs font-semibold">
                Contato é obrigatório
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-wrap">
          <div className="space-y-2 col-span-1">
            <label className="" htmlFor="endereco">
              Endereço <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <span className="text-teal-400">
                <FaAddressCard />
              </span>
              <input
                disabled={disabledInput}
                type="text"
                className="inputC"
                {...register("endereco")}
                placeholder="Endereço"
              />
            </div>
            {errors.endereco && (
              <p className="text-teal-500 text-xs font-semibold">
                Endereço é obrigatório
              </p>
            )}
          </div>
          <div className="space-y-2 col-span-1 ">
            <label className="" htmlFor="cidade">
              Cidade <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <FaCity />
              </span>
              <input
                disabled={disabledInput}
                type="text"
                className="inputC"
                {...register("cidade")}
                placeholder="Cidade"
              />
            </div>
            {errors.cidade && (
              <p className="text-teal-500 text-xs font-semibold">
                Cidade é obrigatória
              </p>
            )}
          </div>
          <div className="space-y-2 col-span-1 ">
            <label className="" htmlFor="cep">
              CEP <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <span className="text-teal-400">
                <FaBullseye />
              </span>
              <input
                disabled={disabledInput}
                type="text"
                className="inputC"
                {...register("cep")}
                placeholder="CEP"
              />
            </div>
            {errors.cep && (
              <p className="text-teal-500 text-xs font-semibold">
                CEP é obrigatório
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-wrap">
          <div className="space-y-2 col-span-3">
            <label className="" htmlFor="descricao">
              Descrição <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper ">
              <textarea
                disabled={disabledInput}
                className=" w-full  bg-transparent outline-none text-slate-300 h-[150px] resize-none"
                {...register("descricao")}
                placeholder="Descrição"
              />
            </div>
            {errors.descricao && (
              <p className="text-teal-500 text-xs font-semibold">
                Descrição é obrigatória
              </p>
            )}
          </div>
        </div>
        <div
          className={`flex gap-3 justify-end transition-opacity pb-5  ${
            modeAddItem ? "opacity-0" : "opacity-100"
          }`}
        >
          <Button
            disabled={modeAddItem}
            onClick={() => setIsDrawerOpen(false)}
            variant="cancel"
          >
            Cancelar
          </Button>
          <Button disabled={modeAddItem} type="submit" variant="primary">
            {isNewUser ? "Adicionar" : "Atualizar"}
          </Button>
        </div>
      </form>
      <div className="flex flex-col space-y-5 px-6 w-full  h-max ">
        <header className="flex justify-between gap-5">
          <h2 className="text-slate-200 text-lg font-semibold">Itens na OS:</h2>
          <Button
            onClick={() => setModeAddItem(!modeAddItem)}
            variant="primary"
          >
            <FaPlus />
          </Button>
        </header>
        {modeAddItem ? (
          <AddItem
            onAddItem={addItemToList}
            modeAddItem={modeAddItem}
            setModeAddItem={setModeAddItem}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        ) : (
          <TableItem
            items={items}
            setItems={setItems}
            setCurrentItem={setCurrentItem}
            setModeAddItem={setModeAddItem}
          />
        )}
      </div>
    </div>
  );
};

export default FormService;
