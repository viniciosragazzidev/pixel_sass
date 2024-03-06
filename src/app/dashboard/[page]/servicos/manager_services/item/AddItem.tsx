"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { FaBaseball, FaGuitar, FaIdBadge, FaUser } from "react-icons/fa6";
import { MdBrandingWatermark } from "react-icons/md";
import { ItemType } from "@/lib/types";

const schema = z.object({
  item: z.string().min(3, "O item deve ser informado."),
  brand: z.string().min(3, "A brand deve ser informado."),
  model: z.string().min(3, "O Model deve ser informado."),
  serieNumber: z.string().min(3, "O número de série deve ser informado."),
  status: z.string().min(3, "O status deve ser informado."),
  tecnico: z.string().min(3, "O técnico deve ser informado."),
  acessories: z.string().min(3, "Os acessórios devem ser informados."),
  useBrand: z.string(),
  description: z.string().min(3, "A descrição deve ser informado."),
});

type FormNewItemProps = {
  onAddItem: any;
  modeAddItem: any;
  setModeAddItem: any;
  currentItem?: ItemType;
  setCurrentItem?: any;
};

const AddItem = ({
  onAddItem,
  modeAddItem,
  setModeAddItem,
  currentItem,
  setCurrentItem,
}: FormNewItemProps) => {
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
    const randomFourCaracters = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    if (validate.success) {
      const dataItem = {
        ...data,
        id: randomFourCaracters,
      };
      console.log(dataItem);

      onAddItem(dataItem);
      setModeAddItem(false);
    }
  };

  useEffect(() => {
    if (currentItem) {
      setValue("item", currentItem.item);
      setValue("brand", currentItem.brand);
      setValue("model", currentItem.model);
      setValue("serieNumber", currentItem.serieNumber);
      setValue("status", currentItem.status);
      setValue("tecnico", currentItem.tecnico);
      setValue("acessories", currentItem.acessories);
      setValue("useBrand", currentItem.useBrand);
      setValue("description", currentItem.description);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row relative gap-6   opacityShow">
      <form
        className="w-full h-full md:p-5 space-y-5 md:max-w-[50vw]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2">
            <label htmlFor="item">
              Item <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <FaGuitar />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("item")}
                placeholder="Item"
              />
            </div>
            {errors.item && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.item.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="brand">
              Marca <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("brand")}
                placeholder="Marca do item"
              />
            </div>
            {errors.brand && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.brand.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2">
            <label htmlFor="model">
              Modelo <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("model")}
                placeholder="Modelo do item"
              />
            </div>
            {errors.Model && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.Model.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="serieNumber">
              Número de Série <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("serieNumber")}
                placeholder="Número de Série"
              />
            </div>
            {errors.serieNumber && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.serieNumber.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2">
            <label htmlFor="status">
              Status <span className="text-teal-400">*</span>
            </label>
            <div className="selectWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <select
                {...register("status")}
                name="status"
                id="status"
                className="selectC"
              >
                <option value="">Selecione</option>
                <option value="Disponível">Disponível</option>
              </select>
            </div>
            {errors.status && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.status.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="tecnico">
              Técnico <span className="text-teal-400">*</span>
            </label>
            <div className="selectWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <select
                {...register("tecnico")}
                name="tecnico"
                id="tecnico"
                className="selectC"
              >
                <option value="">Selecione</option>
                <option value="Joaquim">Joaquim</option>
              </select>
            </div>
            {errors.tecnico && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.tecnico.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 flex-wrap">
          <div className="space-y-2">
            <label htmlFor="acessories">
              Acessórios <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("acessories")}
                placeholder="Acessórios"
              />
            </div>
            {errors.acessories && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.acessories.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="useBrand">
              Marcas de Uso <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <span className="text-teal-400">
                <MdBrandingWatermark />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("useBrand")}
                placeholder="Marcas de Uso"
              />
            </div>
            {errors.useBrand && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.useBrand.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="space-y-2 col-span-3">
            <label htmlFor="description">
              Descrição <span className="text-teal-400">*</span>
            </label>
            <div className="inputWrapper">
              <textarea
                className="w-full bg-transparent outline-none text-slate-300 h-[80px] resize-none"
                {...register("description")}
                placeholder="Descrição"
              />
            </div>
            {errors.description && (
              <p className="text-teal-500 text-xs font-semibold">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Button
            onClick={() => {
              setModeAddItem(false);
              setCurrentItem(null);
            }}
            variant="cancel"
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
