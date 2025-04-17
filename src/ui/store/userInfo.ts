import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user/store", () => {
  const user = ref({
    id: "8713787847198192",
    firstName: "Abdullah",
    lastName: "Hussain",
    email: "akaabdullah00@gmail.com",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    phoneNo: "03347155206",
    balance: "98368",
  });

  const userIsAuthenticated = ref<Boolean>(false);

  return {
    userIsAuthenticated,
    user,
  };
});
