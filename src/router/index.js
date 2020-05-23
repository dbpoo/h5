import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index";
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
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/my",
    name: "my",
    component: My,
  },
  {
    path: "/coin",
    name: "coin",
    component: Coin,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
