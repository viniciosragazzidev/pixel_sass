"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStatus, getTecnics } from "@/utils/lib";
import { ItemType } from "@/utils/types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FaBox,
  FaBoxArchive,
  FaCarBurst,
  FaCheck,
  FaGenderless,
} from "react-icons/fa6";

const formSchema = z.object({
  item: z.string().min(1, { message: "O item é obrigatório" }),
});

type createUserFormData = z.infer<typeof formSchema>;

const FormNewItem = ({
  listItems,
  setListItems,
}: {
  listItems: ItemType[];
  setListItems: any;
}) => {
  const [useBrand, setUseBrand] = React.useState(false);

  const [listTecnics, setListTecnics] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);
  const getListTecnic = async () => {
    const data = await getTecnics();
    setListTecnics(data);
    console.log(data);
  };

  const getListStatus = async () => {
    const data = await getStatus();
    setListStatus(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>();

  const onSubmit = (data: createUserFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="item pt-6 space-y-6">
      <label htmlFor="item" className="text-slate-300 text-sm ">
        Item
      </label>

      <input type="text" {...register("item")} />
      {errors.item && errors.item.message && (
        <span>{errors.item.message.toString()}</span>
      )}

      <div className="flex gap-3 justify-end">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
        <Button variant="cancel">Cancelar</Button>
        <input
          className="text-slate-200 cursor-pointer"
          type="submit"
          value="Enviar"
        />
      </div>
    </form>
  );
};

export default FormNewItem;
