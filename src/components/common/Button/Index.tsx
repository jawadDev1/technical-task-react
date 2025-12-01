import React from "react";

import { cn } from "@/lib/utils";

const VARIENTS = {
  primary: "bg-primary w-full rounded-lg text-white hover:bg-primary/90 ",
  outline:
    "bg-transparent border border-neutral-200 text-neutral-700 rounded-lg w-full hover:bg-primary hover:text-white transition-colors duration-300",
} as const;

type ButtonProps = {
  className?: string;
  varient?: keyof typeof VARIENTS;
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export const Button = ({
  children,
  varient = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "cursor-pointer focus:outline-none",
        VARIENTS[varient],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
