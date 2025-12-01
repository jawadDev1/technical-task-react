import { toast } from "sonner";

export const showToast = (
  message: string,
  status: "success" | "error" = "success"
) => {
  if (status === "success") {
    toast.success(message);
    return;
  }

  toast.error(message);
};
