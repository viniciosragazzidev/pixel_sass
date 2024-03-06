"use client";

import { UserList } from "@/lib/types";
import React from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FaCalendar,
  FaCity,
  FaEnvelope,
  FaGenderless,
  FaGlobe,
  FaImage,
  FaMap,
  FaMapPin,
  FaPen,
  FaUserLarge,
  FaUserTie,
} from "react-icons/fa6";
import { FaMapMarker, FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/lib/requisicoes";

const ProfileSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  surname: z.string().min(1, { message: "O sobrenome é obrigatório" }),
  gender: z.string().min(4, { message: "O genero é obrigatório" }),
  birthDate: z.string().min(1, { message: "A data é obrigatório" }),
  address: z.string().nullable(),
  cep: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().min(8, { message: "O telefone é obrigatório" }),
  document: z.string().min(8, { message: "O documento é obrigatório" }),
  profileImage: z.string().nullable(),
  position: z.string().min(1, { message: "O documento é obrigatório" }),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

const FormProfile = ({
  data,
  setCurrentProfile,
  currentProfile,
}: {
  data: UserList;
  setCurrentProfile: any;
  currentProfile: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();

  const onSubmit = async (profileForm: ProfileFormData) => {
    setLoading(true);
    const verifyData = ProfileSchema.safeParse(profileForm);
    const userId = data?.users[0]?.id;
    if (verifyData.success) {
      const profile = {
        ...profileForm,
        userId: userId,
        birthDate: new Date(profileForm.birthDate).toISOString(),
      };
      try {
        const profileCreated = await createProfile(profile);

        if (profileCreated) {
          setLoading(false);
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setCurrentProfile(profileCreated);

          return profileCreated;
        }
      } catch (error) {
        setLoading(false);
        throw new Error("Erro ao criar perfil");
      }
    }
  };
  const genders = ["Masculino", "Feminino", "Outro"];

  return (
    <div className="profile overflow-y-auto zoomIn p-6 space-y-6 w-full max-w-4xl self-center rounded-lg h-full block magicpattern border-t-4 border-teal-300 shadow-md shadow-teal-900/20 ">
      <header className="w-full p-2 space-y-2">
        <h1 className="text-3xl font-semibold text-teal-300 flex  items-center gap-2">
          Olá, {data?.users[0]?.name.split(" ")[0]}
        </h1>
        <p className="text-slate-300 text-sm">
          Antes de tudo, preciso de algumas informações sobre voce.
        </p>
      </header>

      <form className="space-y-6 opacityShow" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="name" className="text-slate-300 text-sm ">
              Nome <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaUserLarge />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("name")}
                placeholder="Jose"
              />
            </div>
            {errors.name && errors.name.message && (
              <span className="subtitle_error">
                {errors.name.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="surname" className="text-slate-300 text-sm ">
              Sobrenome <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaUserLarge />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("surname")}
                placeholder="Silva"
              />
            </div>
            {errors.surname && errors.surname.message && (
              <span className="subtitle_error">
                {errors.surname.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <label htmlFor="gender" className="text-slate-300 text-sm ">
              Gênero <span className="text-teal-400">*</span>
            </label>

            <div className={`selectWrapper `}>
              <span className="text-teal-300">
                <FaGenderless />
              </span>
              <select
                className={`selectC `}
                defaultValue={"Masculino"}
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

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="position" className="text-slate-300 text-sm ">
              Cargo <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaUserTie />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("position")}
                placeholder="Desenvolvedor"
              />
            </div>
            {errors.position && errors.position.message && (
              <span className="subtitle_error">
                {errors.position.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="document" className="text-slate-300 text-sm ">
              Documento <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaPen />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("document")}
                placeholder="000.000.000-00"
              />
            </div>
            {errors.document && errors.document.message && (
              <span className="subtitle_error">
                {errors.document.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="birthDate" className="text-slate-300 text-sm ">
              Data de Nascimento <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaCalendar />
              </span>
              <input
                type="date"
                className="inputC"
                {...register("birthDate")}
              />
            </div>
            {errors.birthDate && errors.birthDate.message && (
              <span className="subtitle_error">
                {errors.birthDate.message.toString()}
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
                type="text"
                className="inputC"
                {...register("address")}
                placeholder="Rua ABC, 123"
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
                type="text"
                className="inputC"
                {...register("cep")}
                placeholder="00000-000"
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
                type="text"
                className="inputC"
                {...register("city")}
                placeholder="São Paulo"
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
                type="text"
                className="inputC"
                {...register("state")}
                placeholder="SP"
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
                type="text"
                className="inputC"
                {...register("country")}
                placeholder="Brasil"
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
                placeholder="exemplo@example.com"
              />
            </div>
            {errors.email && errors.email.message && (
              <span className="subtitle_error">
                {errors.email.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="phoneNumber" className="text-slate-300 text-sm ">
              Número de Telefone <span className="text-teal-400">*</span>
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaPhoneAlt />
              </span>
              <input
                type="tel"
                className="inputC"
                {...register("phoneNumber")}
                placeholder="(00) 00000-0000"
              />
            </div>
            {errors.phoneNumber && errors.phoneNumber.message && (
              <span className="subtitle_error">
                {errors.phoneNumber.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="profileImage" className="text-slate-300 text-sm ">
              URL da Imagem de Perfil
            </label>

            <div className={`inputWrapper `}>
              <span className="text-teal-300">
                <FaImage />
              </span>
              <input
                type="url"
                className="inputC"
                {...register("profileImage")}
                placeholder="https://example.com/imagem.jpg"
              />
            </div>
            {errors.profileImage && errors.profileImage.message && (
              <span className="subtitle_error">
                {errors.profileImage.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button variant="primary" type="submit" className="px-5">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormProfile;
