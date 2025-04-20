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

import axios from "axios";
import { useUserStore } from "./userInfo";

export const api = axios.create({
  baseURL: "https://banking-management-system-backend-nine.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Add interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(); // get the store
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = async (
  method: string,
  url: string,
  data?: any,
  config?: any
) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error?.response || error.message);
    throw error?.response?.data || error;
  }
};

export default {
  get: (url: string, config?: any) => request("get", url, null, config),
  post: (url: string, data?: any, config?: any) =>
    request("post", url, data, config),
  put: (url: string, data?: any, config?: any) =>
    request("put", url, data, config),
  patch: (url: string, data?: any, config?: any) =>
    request("patch", url, data, config),
  delete: (url: string, config?: any) => request("delete", url, null, config),
};

export interface UserInterface {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  phoneNumber: string;
  age: number;
  balance: number;
  isVerified: boolean;
}

//upload image user profile
export async function uploadImage(imageFile: File): Promise<void> {
  if (!imageFile) {
    console.error("No file selected!");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const userStore = useUserStore();
  const token = userStore.token;

  if (!token) {
    console.error("No Bearer token available!");
    return;
  }
  console.log(token);

  try {
    const response = await axios.put(
      "https://banking-management-system-backend-nine.vercel.app/api/users/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    notify("Image updated successfully", "success");
    return response.data; // You might want to return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error; // Re-throw the error for handling in the component
    } else {
      notify("Unable to update image", "error");
      console.error("Error uploading image:", error);
      throw error; // Re-throw the error for handling in the component
    }
  }
}
