import React from "react";

import { cn } from "@/lib/utils";

const classNames = {
  span: "inline",
  h1: "scroll-m-20 text-2xl font-bold text-neutral-700 tracking-tight ",
  h2: "scroll-m-20 text-2xl font-semibold text-neutral-700 tracking-tight transition-colors",
  h3: "scroll-m-20 text-[22px] lg:text-2xl text-neutral-800 font-semibold tracking-tight ",
  h4: "scroll-m-20 text-[16px] lg:text-xl font-semibold tracking-tight text-neutral-800",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight text-neutral-800",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-3 text-md",
  content: "text-[16px] text-neutral-400 font-normal",
  sm: "text-sm text-neutral-400 font-normal",
  xs: "text-xs  text-neutral-400 font-normal",
};

export const Typography = ({
  children,
  className,
  variant = "span",
  ...otherProps
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof classNames;
} & Omit<
  React.HTMLAttributes<HTMLElement>,
  "className"
>): React.JSX.Element => {
  const elementMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    content: "p",
    sm: "p",
    xs: "p",
    span: "span",
  } as const;

  const Element = elementMap[variant];
  const baseClass = classNames[variant] ?? "";

  return (
    <Element className={cn("relative", baseClass, className)} {...otherProps}>
      {children}
    </Element>
  );
};
