import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { UserInterface } from "./helpers";

export const useUserStore = defineStore("user/store", () => {
  const router = useRouter();

  const user = ref<UserInterface | null>(null);
  const token = ref<string | null>(null);
  const userIsAuthenticated = ref(false);

  const setUser = (userData: UserInterface) => {
    user.value = userData;
    userIsAuthenticated.value = true;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    user.value = null;
    token.value = null;
    userIsAuthenticated.value = false;
    router.push("/login");
  };

  return {
    user,
    token,
    userIsAuthenticated,
    setUser,
    setToken,
    logout,
  };
});
