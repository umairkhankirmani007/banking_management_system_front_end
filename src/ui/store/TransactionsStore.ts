import { defineStore } from "pinia";
import { ref } from "vue";
import { api, notify } from "./helpers";
import { sendMoneyModal } from "./Scopes";
import { useUserStore } from "./userInfo";
import {
  type AppUser,
  type TableDataInterface,
  type TransactionsInterface,
  type TransactionsResponse,
} from "./interfaces";
import { usePayeeStore } from "./PayeesStore";
import dayjs from "dayjs";

export const useTransactionsStore = defineStore("transactions", () => {
  const isLoading = ref(false);
  const userStore = useUserStore();
  const payeeStore = usePayeeStore();

  const userTransactions = ref<TransactionsInterface[]>([]);
  const tableData = ref<TableDataInterface[]>([]);
  const allAppUsers = ref<AppUser[]>([]);

  async function SendPayment(
    amount: string,
    recipientId: string,
    message: string = ""
  ) {
    const payload = {
      amount: amount,
      recipientId: recipientId,
      message: message || "empty Message",
    };
    try {
      isLoading.value = true;
      const response = await api.post("/api/transactions/send", payload);
      console.log(response.data);
      notify("Payment Sent Successfully", "success");
      sendMoneyModal.value = false;
      isLoading.value = false;
      userStore.updateUserInfo();
      GetTransactionsHistory();
    } catch (error) {
      notify("Unable to send payment", "error");
      isLoading.value = false;
      console.log(error);
    }
  }
  const getAllUsers = async () => {
    try {
      const response = await api.get("/api/users/all");
      payeeStore.allAppUsers = response.data.data;
      allAppUsers.value = response.data.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  async function GetTransactionsHistory() {
    try {
      isLoading.value = true;

      const [response] = await Promise.all([
        api.get<TransactionsResponse>("/api/transactions/credit-history"),
        getAllUsers(),
      ]);

      if (response.data.success) {
        userTransactions.value = response.data.creditHistory;
      }

      mergeTableDataWithUserData();
    } catch (error) {
      console.error("Failed to fetch transaction history or users", error);
    } finally {
      isLoading.value = false;
    }
  }

  function mergeTableDataWithUserData() {
    const arr1 = userTransactions.value;
    const arr2 = allAppUsers.value;
    const mergedData: TableDataInterface[] = arr1.reduce<TableDataInterface[]>(
      (acc, txn) => {
        const user = arr2.find((u) => u.userId === txn.userId);
        if (user) {
          const formattedDate = dayjs(txn.createdAt).format("YYYY-MM-DD");
          const formattedTime = dayjs(txn.createdAt).format("HH:mm A");
          acc.push({
            tid: txn._id,
            userName: user.userName!,
            userId: txn.userId,
            status: txn.status,
            amount: txn.amount,
            date: formattedDate,
            time: formattedTime,
            userImage: user.imageUrl,
          });
        }
        return acc;
      },
      []
    );

    tableData.value = mergedData;
  }
  return {
    isLoading,
    userTransactions,
    tableData,
    SendPayment,
    mergeTableDataWithUserData,
    GetTransactionsHistory,
  };
});
