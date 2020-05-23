import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index";
import List from "../views/list/list";
import Detail from "../views/detail/detail";
import Login from "../views/login/login";
import Register from "../views/login/register";
import My from "../views/my/my";
import Coin from "../views/coin/coin";
import _ from "lodash";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: {
      title: "首页",
      keepAlive: true
    }
  },
  {
    path: "/list",
    name: "list",
    component: List,
    meta: {
      title: "新闻",
      keepAlive: true
    }
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    meta: {
      title: "新闻",
      keepAlive: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
      keepAlive: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "登录",
      keepAlive: false
    }
  },
  {
    path: "/my",
    name: "my",
    component: My,
    meta: {
      title: "我的",
      keepAlive: true
    }
  },
  {
    path: "/coin",
    name: "coin",
    component: Coin,
    meta: {
      title: "提币",
      keepAlive: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (_.hasIn(to, "meta.title") && to.name) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
