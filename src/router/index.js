import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index";
import List from "../views/list/list";
import Login from "../views/login/login";
import Register from "../views/login/register";
import My from "../views/my/my";
import Coin from "../views/coin/coin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/list",
    name: "List",
    component: List,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/my",
    name: "my",
    component: My,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/coin",
    name: "coin",
    component: Coin,
    meta: {
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
