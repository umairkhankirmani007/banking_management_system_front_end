// utils/toast.ts
import { toast } from "vue3-toastify";

type ToastType = "success" | "error" | "info" | "warning";

export const notify = (
  message: string,
  type: ToastType = "success",
  duration = 3000
) => {
  toast(message, {
    type,
    autoClose: duration,
    position: "top-right",
    theme: "colored",
  });
};
