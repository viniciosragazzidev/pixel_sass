"use client";
import { Silkscreen } from "next/font/google";
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400" });
import { twMerge } from "tailwind-merge";
import { Badge } from "./badge";
const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={twMerge(
        silkscreen.className,
        "text-5xl font-semibold text-teal-400 flex  items-center gap-2",
        className
      )}
    >
      P <Badge variant="ghost">BETA</Badge>
    </h1>
  );
};

export default Logo;
