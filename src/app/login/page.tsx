"use client";

import Logo from "@/components/ui/logo";
import React from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
const formSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

type FormDataType = z.infer<typeof formSchema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full magicpattern  min-h-screen">
      <div className="container w-full h-full flex flex-col space-y-8 justify-center items-center">
        <Logo textComplete />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 w-full justify-center items-center"
        >
          <div className="flex flex-col space-y-2 w-full max-w-[350px] items-center ">
            <label className="labelC font-semibold self-start" htmlFor="email">
              {" "}
              Email:
            </label>
            <div className="inputWrapper  w-full g ">
              <span className="inputIcon">
                <MdAlternateEmail />
              </span>
              <input
                type="email"
                className="inputC"
                placeholder="seuemail@email.com"
                {...register("email")}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full max-w-[350px] items-center">
            <label
              className="labelC font-semibold self-start"
              htmlFor="password"
            >
              {" "}
              Senha:
            </label>
            <div className="inputWrapper w-full  g ">
              <span className="inputIcon">
                <MdPassword />
              </span>
              <input
                type="password"
                {...register("password")}
                className="inputC"
                placeholder="***********"
              />
            </div>
          </div>
          <button className="bg-teal-950 text-teal-300 w-full max-w-[350px] rounded-full py-2 active:scale-95 transition-all ">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
