import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "@/style.css";
import { createPinia } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  ArcElement,
  RadialLinearScale
);

const app = createApp(App);
const pinia = createPinia();
app.use(toast);
app.use(router);
app.use(pinia);

app.mount("#app");
