import React, { useState } from "react";
import type { FieldValues, Path, SetFieldValue } from "react-hook-form";

import { Typography } from "@/components/common";
import { ChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SelectListProps<TFieldValues extends FieldValues> = {
  className?: string;
  setValue: SetFieldValue<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  options: { label: string; value: string }[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  error: string;
};

export const SelectList = <TFieldValues extends FieldValues>({
  className,
  setValue,
  name,
  options,
  Icon,
  placeholder = "Select an option",
  error,
}: SelectListProps<TFieldValues>) => {
  const [selectedOption, setSelctedOptions] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [showList, setShowList] = useState<boolean>(false);

  const handleSelect = (option: { label: string; value: string }) => {
    setSelctedOptions(option);
    setValue(name, option.value);
    toggleShowList();
  };

  const toggleShowList = () => setShowList(!showList);

  return (
    <>
      <div
        className={cn(
          "relative flex h-10 items-center gap-x-2 rounded-lg border border-neutral-200 p-2 transition-all duration-300",
          { "border-primary": showList },
          className
        )}
      >
        <span className="h-fit shrink-0">
          <Icon />
        </span>
        <div
          onClick={toggleShowList}
          className="flex h-full w-full flex-1 cursor-pointer items-center justify-between pr-1 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
        >
          <Typography
            variant="sm"
            className={cn({ "text-neutral-700": selectedOption })}
          >
            {selectedOption?.label || placeholder}
          </Typography>
          <span className="text-[15px] text-neutral-600">
            <ChevronIcon
              className={cn("rotate-90 transition-transform duration-300", {
                "rotate-270": showList,
              })}
            />
          </span>
        </div>

        {showList && (
          <div className="absolute top-[46px] left-0 z-10 flex w-full flex-col gap-y-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5">
            {options &&
              options.length > 0 &&
              options.map((option) => (
                <Typography
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  variant="sm"
                  className={cn("cursor-pointer hover:text-neutral-700", {
                    "text-neutral-700": selectedOption?.value === option.value,
                  })}
                >
                  {option.label}
                </Typography>
              ))}
          </div>
        )}
      </div>

      {error && (
        <Typography variant="xs" className="text-destructive mt-1">
          {error}
        </Typography>
      )}
    </>
  );
};
