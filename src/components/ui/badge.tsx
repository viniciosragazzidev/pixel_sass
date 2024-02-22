import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  variants: {
    variant: {
      ghost: "bg-slate-800 text-slate-500",
      primary: "bg-teal-950 text-teal-300",
      alert: "bg-red-800 text-red-400",
      success: "bg-green-800 text-green-400",
      warning: "bg-orange-800 text-orange-400",
      info: "bg-blue-800 text-blue-400",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={twMerge(badge({ variant }), className)} {...props} />;
}
