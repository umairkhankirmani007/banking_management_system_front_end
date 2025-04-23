import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("admin/store", () => {
  const isLoading = ref(false);
  const allTransactions = ref([]);
  const allQueries = ref([]);

  return {
    isLoading,
    allTransactions,
    allQueries,
  };
});
