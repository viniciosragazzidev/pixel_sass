"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FaCity,
  FaEnvelope,
  FaGlobe,
  FaImage,
  FaMap,
  FaMapMarker,
  FaMapPin,
  FaPen,
  FaPhoneAlt,
  FaUserTie,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { UserList } from "@/lib/types";
import { FaUserLarge } from "react-icons/fa6";
import { createCompany } from "@/lib/requisicoes";
import { VscLoading } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

// Tipo e esquema de validação
export const CompanySchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  address: z.string().nullable(),
  cep: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  companyType: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  cnpj: z.string().nullable(),
  industry: z.string().nullable(),
  description: z.string().nullable(),
  logo: z.string().nullable(),
});

export type CompanyFormData = z.infer<typeof CompanySchema>;

const FormCompany = ({
  data,
  currentStep,
  setCurrentStep,
  currentCompany,
  setCurrentCompany,
}: {
  data?: UserList;
  currentStep?: number;
  setCurrentStep?: any;
  currentCompany?: any;
  setCurrentCompany?: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (dataForm: CompanyFormData) => {
    setLoading(!loading);
    const verifyData = CompanySchema.safeParse(dataForm);

    if (verifyData.success) {
      const userId = data?.users[0]?.id;
      const company = {
        ...dataForm,
        userId,
      };
      //console.log(company);

      try {
        const response = await createCompany(company);

        if (response) {
          setCurrentStep(3);
          setLoading(false);
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setCurrentCompany(response);

          return response;
        }
      } catch (error) {
        //console.log(error);

        setLoading(false);
        throw new Error("Erro ao criar empresa");
      }
    }
  };

  return (
    <div className="profile overflow-y-auto zoomIn p-6 space-y-6 w-full max-w-4xl self-center rounded-lg h-full block magicpattern border-t-4 border-teal-300 shadow-md shadow-teal-900/20 ">
      <header className="w-full p-2 space-y-2">
        <h1 className="text-3xl font-semibold text-teal-300 flex  items-center gap-2">
          Configuração de Empresa
        </h1>
        <p className="text-slate-300 text-sm">
          Informe abaixo os dados relacionados à empresa.
        </p>
      </header>

      <form className="space-y-6 opacityShow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="name" className="text-slate-300 text-sm ">
              Nome da Empresa <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaUserLarge />
              </span>
              <input
                className="inputC"
                {...register("name")}
                placeholder="Oficina Baianinho"
              />
            </div>
            {errors.name && errors.name.message && (
              <span className="subtitle_error">
                {errors.name.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="address" className="text-slate-300 text-sm ">
              Endereço
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaMapMarker />
              </span>
              <input
                className="inputC"
                {...register("address")}
                placeholder="Rua dos bobos, 0"
              />
            </div>
            {errors.address && errors.address.message && (
              <span className="subtitle_error">
                {errors.address.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="cep" className="text-slate-300 text-sm ">
              CEP
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaMapPin />
              </span>
              <input
                className="inputC"
                {...register("cep")}
                placeholder="00000000-0"
              />
            </div>
            {errors.cep && errors.cep.message && (
              <span className="subtitle_error">
                {errors.cep.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="city" className="text-slate-300 text-sm ">
              Cidade
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaCity />
              </span>
              <input
                className="inputC"
                {...register("city")}
                placeholder="Cidade da Empresa"
              />
            </div>
            {errors.city && errors.city.message && (
              <span className="subtitle_error">
                {errors.city.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="state" className="text-slate-300 text-sm ">
              Estado
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaMap />
              </span>
              <input
                className="inputC"
                {...register("state")}
                placeholder="Estado da Empresa"
              />
            </div>
            {errors.state && errors.state.message && (
              <span className="subtitle_error">
                {errors.state.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="country" className="text-slate-300 text-sm ">
              País
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaGlobe />
              </span>
              <input
                className="inputC"
                {...register("country")}
                placeholder="País da Empresa"
              />
            </div>
            {errors.country && errors.country.message && (
              <span className="subtitle_error">
                {errors.country.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="companyType" className="text-slate-300 text-sm ">
              Tipo de Empresa
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaUserTie />
              </span>
              <input
                className="inputC"
                {...register("companyType")}
                placeholder="Tipo de Empresa"
              />
            </div>
            {errors.companyType && errors.companyType.message && (
              <span className="subtitle_error">
                {errors.companyType.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="phoneNumber" className="text-slate-300 text-sm ">
              Número de Telefone
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaPhoneAlt />
              </span>
              <input
                type="tel"
                className="inputC"
                {...register("phoneNumber")}
                placeholder="Telefone da Empresa"
              />
            </div>
            {errors.phoneNumber && errors.phoneNumber.message && (
              <span className="subtitle_error">
                {errors.phoneNumber.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="email" className="text-slate-300 text-sm ">
              Endereço de E-mail
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="inputC"
                {...register("email")}
                placeholder="E-mail da Empresa"
              />
            </div>
            {errors.email && errors.email.message && (
              <span className="subtitle_error">
                {errors.email.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="website" className="text-slate-300 text-sm ">
              Site Oficial
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaGlobe />
              </span>
              <input
                className="inputC"
                {...register("website")}
                placeholder="Website da Empresa"
              />
            </div>
            {errors.website && errors.website.message && (
              <span className="subtitle_error">
                {errors.website.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="cnpj" className="text-slate-300 text-sm ">
              CNPJ
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaPen />
              </span>
              <input
                className="inputC"
                {...register("cnpj")}
                placeholder="CNPJ da Empresa"
              />
            </div>
            {errors.cnpj && errors.cnpj.message && (
              <span className="subtitle_error">
                {errors.cnpj.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="industry" className="text-slate-300 text-sm ">
              Setor de Atuação
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaMap />
              </span>
              <input
                className="inputC"
                {...register("industry")}
                placeholder="Setor de Atuação da Empresa"
              />
            </div>
            {errors.industry && errors.industry.message && (
              <span className="subtitle_error">
                {errors.industry.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="description" className="text-slate-300 text-sm ">
              Descrição
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaPen />
              </span>
              <input
                className="inputC"
                {...register("description")}
                placeholder="Descrição da Empresa"
              />
            </div>
            {errors.description && errors.description.message && (
              <span className="subtitle_error">
                {errors.description.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="logo" className="text-slate-300 text-sm ">
              URL da Imagem do Logo
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaImage />
              </span>
              <input
                type="url"
                className="inputC"
                {...register("logo")}
                placeholder="URL da Imagem do Logo da Empresa"
              />
            </div>
            {errors.logo && errors.logo.message && (
              <span className="subtitle_error">
                {errors.logo.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button
            // disabled={loading}
            variant="primary"
            type="submit"
            className="px-5"
          >
            {loading ? <VscLoading className="animate-spin" /> : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCompany;
