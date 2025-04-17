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
];

export default privateRoutes;
