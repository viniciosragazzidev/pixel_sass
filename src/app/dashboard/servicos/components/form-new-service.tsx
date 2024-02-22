"use client";

import React from "react";
import { Input, InputController } from "@/components/ui/input";
import { FaHome, FaSearch } from "react-icons/fa";
import { GrDocument } from "react-icons/gr";
import {
  FaCalendarMinus,
  FaCartPlus,
  FaGenderless,
  FaMessage,
  FaPen,
  FaPenClip,
  FaPerson,
  FaPhone,
  FaRegChessPawn,
  FaUserLarge,
} from "react-icons/fa6";
import { Select } from "@/components/ui/select";

const FormNewService = () => {
  return (
    <form className="py-6 space-y-6">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="document" className="text-slate-300 text-sm ">
            Documento{" "}
          </label>

          <Input
            variant="normal"
            icon={<FaPen />}
            classNameIcon="text-teal-300"
            name="document"
            placeholder="000.000.000-00"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="client" className="text-slate-300 text-sm ">
            Cliente
          </label>

          <Input
            disabled
            variant="normal"
            icon={<FaUserLarge />}
            classNameIcon="text-teal-300"
            name="client"
            placeholder="Jose da Silva"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="contact" className="text-slate-300 text-sm ">
            Contato{" "}
          </label>

          <Input
            disabled
            variant="normal"
            icon={<FaPhone />}
            classNameIcon="text-teal-300"
            name="contact"
            placeholder="000.000.000-00"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="gender" className="text-slate-300 text-sm ">
            Gênero
          </label>

          <Select
            variant="normal"
            icon={<FaGenderless />}
            classNameIcon="text-teal-300"
            disabled
            name="gender"
            items={[
              {
                label: "Masculino",
                value: "mas",
              },
              { label: "Feminino", value: "fem" },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="andress" className="text-slate-300 text-sm ">
            Endereço{" "}
          </label>

          <Input
            disabled
            variant="normal"
            icon={<FaHome />}
            classNameIcon="text-teal-300"
            name="andress"
            placeholder="Rua das flores, 123 "
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="cep" className="text-slate-300 text-sm ">
            CEP
          </label>

          <Input
            disabled
            variant="normal"
            icon={<FaCalendarMinus />}
            name="cep"
            placeholder="00000-000"
            classNameIcon="text-teal-300"
          />
        </div>
      </div>
    </form>
  );
};

export default FormNewService;
