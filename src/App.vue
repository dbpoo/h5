<template>
  <div class="page">
    <template v-if="$route.meta.keepAlive">
      <router-view></router-view>
      <van-tabbar route inactive-color="#cbf8ff" active-color="#6bfff6">
        <van-tabbar-item replace to="/" icon="home-o">
          首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/list" icon="newspaper-o">
          新闻
        </van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="user-o">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </template>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {};
</script>

<style lang="less">
@import "css/reset";
.page {
  height: 100vh;
  font-size: 24px;
}
.van-tabbar {
  background-color: #007586;
}
</style>
