"use client";

import Logo from "@/components/ui/logo";
import React from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { auth } from "@/lib/auth";
import NextAuth from "next-auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
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

  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (data: FormDataType) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  const [rememberPassword, setRememberPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
                autoComplete={rememberPassword ? "on" : "off"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-teal-400  text-sm">{errors.email.message}</p>
            )}
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
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="inputC"
                placeholder="***********"
                autoComplete={rememberPassword ? "on" : "off"}
              />
              <span
                className="inputIcon text-sm cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && (
              <p className="text-teal-400  text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between text-[13px] w-full max-w-[350px]">
            <p className="flex gap-1 ">
              <Checkbox
                onCheckedChange={() => {
                  setRememberPassword(!rememberPassword);
                }}
                checked={rememberPassword}
                id="remember"
              />{" "}
              <label htmlFor="remember" className="text-slate-200 ">
                Lembrar senha?
              </label>
            </p>
            <p className="text-teal-400  flex items-center gap-1">
              Esqueceu a senha?{" "}
              <span className="cursor-pointer font-semibold">Clique aqui</span>
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-950 text-teal-300 w-full max-w-[350px] rounded-full py-2 active:scale-95 transition-all "
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                {" "}
                <VscLoading className="animate-spin" />{" "}
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
