import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./PrivateRoutes";

const router = createRouter({
  history:
    import.meta.env.MODE === "development"
      ? createWebHistory()
      : createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});

export default router;
