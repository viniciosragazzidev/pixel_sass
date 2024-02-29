import { getTecnics } from "@/lib/requisicoes";
import React from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const selectWrapper = tv({
  base: "w-full min-h-8 relative max-w-[280px] rounded-lg border border-slate-800 bg-slate-900 px-3",
  variants: {
    variant: {
      normal: "border-slate-800 bg-slate-900",
      ghost: "border-slate-700 bg-slate-800",
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

interface SelectWrapper
  extends React.ComponentProps<"div">,
    VariantProps<typeof selectWrapper> {
  classnameicon?: string;
  disabled?: boolean;
  classNameSelect?: string;
  icon?: React.ReactNode;
  items?: { value: string; label: string }[];
  name?: string;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  value?: string;
  functionGetter?: (value: string) => void;
  placeholder?: string;
}

export function Select({ className, variant, ...props }: SelectWrapper) {
  // const fc = props.functionGetter ? props.functionGetter : () => {};
  const items = props.items;

  return (
    <div
      {...props}
      className={twMerge(
        selectWrapper({ variant }),
        `${props.disabled && "opacity-40"}`,
        className
      )}
    >
      <div
        className={twMerge(
          "absolute left-2 top-1/2 -translate-y-1/2",
          props.classnameicon
        )}
      >
        {props.icon}
      </div>
      <select
        id={props.name}
        disabled={props.disabled}
        onClick={props.onClick}
        onChange={props.onChange}
        className={twMerge(
          "w-full h-full pl-6 bg-transparent    text-sm text-slate-200 focus:outline-none",
          props.classNameSelect
        )}
      >
        <option className="bg-slate-900 w-max cursor-pointer" value="">
          {props.placeholder}
        </option>
        {items?.map((item: any) => (
          <option
            onChange={props.onChange}
            className="bg-slate-900 w-max cursor-pointer"
            selected={item.label === props.value}
            key={item.value}
            value={item.value || item.name}
          >
            {item.name || item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
