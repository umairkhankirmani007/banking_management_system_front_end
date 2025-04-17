import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user/store", () => {
  const userIsAuthenticated = ref<Boolean>(false);

  return {
    userIsAuthenticated,
  };
});
