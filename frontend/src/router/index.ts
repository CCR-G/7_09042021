import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main.vue";
import { getToken } from "../helpers/token-getter";
import { authenticateUser } from "../helpers/user-getter";
import store from "../store";
import { clearSession } from "../helpers/clear-session";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "*",
    redirect: { name: "Main" }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!getToken()) {
    clearSession();
    if (to.name !== "Login" && to.name !== "Register") {
      next({ name: "Login" });
    }
    next();
    return;
  }

  authenticateUser()
    .then((user) => {
      store.dispatch("setUser", user);
      if (to.name === "Login" || to.name === "Register") {
        next({ name: "Main" });
      }
      next();
    })
    .catch(() => {
      clearSession();
      if (to.name !== "Login" && to.name !== "Register") {
        next({ name: "Login" });
      }
    });
});

export default router;
