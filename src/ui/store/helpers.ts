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

// utils/validateForm.ts
export interface ValidationRules {
  [field: string]: {
    required?: boolean;
    type?: "email" | "number";
    minLength?: number;
    custom?: (value: any) => boolean;
    message?: string;
  };
}

export function validateForm(
  data: Record<string, any>,
  rules: ValidationRules
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const field in rules) {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = rule.message || `${field} is required`;
      continue;
    }

    if (rule.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errors[field] = rule.message || `${field} must be a valid email`;
      }
    }

    if (rule.type === "number" && isNaN(Number(value))) {
      errors[field] = rule.message || `${field} must be a number`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] =
        rule.message ||
        `${field} must be at least ${rule.minLength} characters`;
    }

    if (rule.custom && !rule.custom(value)) {
      errors[field] = rule.message || `${field} is invalid`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
