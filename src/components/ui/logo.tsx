"use client";
import { Silkscreen } from "next/font/google";
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400" });
import { twMerge } from "tailwind-merge";
import { Badge } from "./badge";
const Logo = ({
  className,
  classNameBadge,
  textComplete,
}: {
  className?: string;
  classNameBadge?: string;
  textComplete?: boolean;
}) => {
  return (
    <h1
      className={twMerge(
        silkscreen.className,
        "text-5xl font-semibold text-teal-400 flex  items-center gap-2",
        className
      )}
    >
      {textComplete ? (
        <span>
          Pixel<span className="text-slate-200">99</span>
        </span>
      ) : (
        "P"
      )}
      <Badge className={classNameBadge} variant="ghost">
        BETA
      </Badge>
    </h1>
  );
};

export default Logo;
