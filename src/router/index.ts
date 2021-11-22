import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/owner",
    name: "Owner",
    component: () => import("../views/Owner.vue"),
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/Customer.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
