import { ComponentProps } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const inputWrapper = tv({
  base: `w-full min-h-8 flex   items-center  relative max-w-[280px] rounded-lg border border-slate-800 bg-slate-900 px-3 group disabled:bg-red-700`,
  variants: {
    variant: {
      normal: " border-slate-800 bg-slate-900",
      ghost: " border-slate-700 bg-slate-800",
      primary: "",
    },
    size: {
      base: "max-w-[280px]",
      medium: "max-w-[400px]",
      large: "max-w-[500px]",
    },
  },
  defaultVariants: {
    normal: "base",
    size: "base",
  },
});

interface InputWrapper
  extends ComponentProps<"div">,
    VariantProps<typeof inputWrapper> {
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  icon?: React.ReactNode;
  classnameicon?: string;
  classNameInput?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (event: any) => void;
}

export function Input({ className, variant, ...props }: InputWrapper) {
  return (
    <div
      {...props}
      className={twMerge(
        inputWrapper({ variant }),
        `${props.disabled && "opacity-40"}`,
        className
      )}
    />
  );
}

interface InputController extends ComponentProps<"input"> {}

export function InputController({ className, ...props }: InputController) {
  return (
    <input
      {...props}
      className={twMerge(
        "  w-full h-full pl-6  bg-transparent text-sm text-slate-200 focus:outline-none group-disabled:bg-red-700",
        className
      )}
    />
  );
}

interface InputIcon extends ComponentProps<"div"> {}

export function InputIcon({ className, ...props }: InputIcon) {
  return (
    <div
      {...props}
      className={twMerge(
        "absolute left-2 top-1/2 -translate-y-1/2 text-teal-300",
        className
      )}
    />
  );
}
