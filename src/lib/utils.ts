import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ROUTE_PATHS } from "@/routes/route";

export const getRoutePath = (path: keyof typeof ROUTE_PATHS) => {
  return ROUTE_PATHS[path] ?? "#";
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatArticleTime = (dateString: string) => {
  const date = new Date(dateString);

  const today = new Date();

  const isToday = today.toLocaleDateString() === date.toLocaleDateString();

  const options: Intl.DateTimeFormatOptions = isToday
    ? {
        hour: "numeric",
        minute: "numeric",
      }
    : {
        day: "numeric",
        month: "short",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      };

  return new Intl.DateTimeFormat(undefined, options).format(date);
};
