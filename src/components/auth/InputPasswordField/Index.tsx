import React, { useState } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Typography } from "@/components/common";
import { EyeClosedIcon, EyeIcon, LockIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type InputPasswordFieldProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  error: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputPasswordField = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  error,
  ...props
}: InputPasswordFieldProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = showPassword ? "text" : "password";
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div
        className={cn(
          "focus-within:border-primary grid h-10 grid-cols-[24px_1fr_24px] rounded-lg border border-neutral-200 p-2 transition-all duration-300",
          className
        )}
      >
        <span className="text-2xl">
          <LockIcon />
        </span>
        <input
          type={inputType}
          className="h-full w-full pr-1 pl-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          {...register(name)}
          {...props}
        />

        <span onClick={toggleShowPassword} className="cursor-pointer text-2xl">
          {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
        </span>
      </div>

      {error && (
        <Typography variant="xs" className="text-destructive mt-1">
          {error}
        </Typography>
      )}
    </>
  );
};
