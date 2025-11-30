import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Typography } from "@/components/common";
import { cn } from "@/lib/utils";

type InputFieldProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  error: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const INPUT_TYPES: { [key: string]: { [key: string]: boolean } } = {
  number: { valueAsNumber: true },
  default: {},
};

export const InputField = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  error,
  type = "text",
  Icon,
  ...props
}: InputFieldProps<TFieldValues>) => {
  const registerOptions = INPUT_TYPES[type] || INPUT_TYPES.default;

  return (
    <>
      <div
        className={cn(
          "focus-within:border-primary flex h-10 gap-x-2 rounded-lg border border-neutral-200 p-2 transition-all duration-300",
          className
        )}
      >
        <span className="shrink-0 text-2xl">
          <Icon />
        </span>
        <input
          type="text"
          className="h-full w-full flex-1 pr-1 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          {...register(name, registerOptions)}
          {...props}
        />
      </div>

      {error && (
        <Typography variant="xs" className="text-destructive mt-1">
          {error}
        </Typography>
      )}
    </>
  );
};
