import type { RouteRecordRaw } from "vue-router";

const privateRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/screens/HomeScreen.vue"),
    meta: { layout: "BaseLayout" },
  },

  {
    path: "/",
    redirect: "/dashboard",
  },
];

export default privateRoutes;
