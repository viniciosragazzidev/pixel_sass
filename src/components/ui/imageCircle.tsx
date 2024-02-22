import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const image = tv({
  base: "w-8 h-8 rounded-full overflow-hidden block relative",
  variants: {
    variant: {
      small: "w-6 h-6",
      base: "w-8 h-8",
      large: "w-10 h-10",
      xlarge: "w-12 h-12",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

interface ImageCircleProps
  extends ComponentProps<"span">,
    VariantProps<typeof image> {
  src?: string; // Add the src property here
  alt: string;
}

export function ImageCircle({
  className,
  variant,
  src = "/placeholder.png",
  alt,
}: ImageCircleProps) {
  return (
    <span className={twMerge(image({ variant }), className)}>
      <Image fill src={src} alt={alt} className="object-cover" />
    </span>
  );
}
