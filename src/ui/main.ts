import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "@/style.css";
import { createPinia } from "pinia";

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
  ArcElement
);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
