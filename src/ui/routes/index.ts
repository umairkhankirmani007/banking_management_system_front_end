import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./PrivateRoutes";
import { userStore } from "../store/userInfo";

const router = createRouter({
  history:
    import.meta.env.MODE === "development"
      ? createWebHistory()
      : createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});

// 👇 Add this block for auth guarding
router.beforeEach((to, _, next) => {
  const user = userStore();

  if (to.meta.requiresAuth && !user.userIsAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
