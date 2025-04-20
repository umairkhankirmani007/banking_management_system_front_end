import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./PrivateRoutes";
import { useUserStore } from "../store/userInfo";

const router = createRouter({
  history:
    import.meta.env.MODE === "development"
      ? createWebHistory()
      : createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});

router.beforeEach((to, _, next) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.userIsAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
