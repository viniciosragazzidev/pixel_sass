"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex cursor-pointer items-center px-3 py-0.5 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all",
  variants: {
    variant: {
      ghost: "bg-slate-800 text-slate-500",
      primary: "bg-teal-950 text-teal-300",
    },
    size: {
      icon: "px-2.5 py-1.5",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof button> {}

export function Button({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={twMerge(button({ variant }), className)} {...props} />
  );
}
