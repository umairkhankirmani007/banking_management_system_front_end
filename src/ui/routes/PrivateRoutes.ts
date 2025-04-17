import type { RouteRecordRaw } from "vue-router";

const privateRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/screens/HomeScreen.vue"),
    meta: {
      layout: "BaseLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/screens/UserProfileScreen.vue"),
    meta: {
      layout: "BaseLayout",
      requiresAuth: true,
    },
  },
];

export default privateRoutes;
