import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ROUTE_PATHS } from "@/routes/route";

export const getRoutePath = (path: keyof typeof ROUTE_PATHS) => {
  return ROUTE_PATHS[path] ?? "#";
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
