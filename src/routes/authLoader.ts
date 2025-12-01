import { redirect } from "react-router";

import { getRoutePath } from "@/lib/utils";

export function authLoader() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw redirect(getRoutePath("LOGIN"));
  }

  return null;
}
