<template>
  <div class="container">
    <div class="txt">123123</div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);

export default {
  name: "Home",
};
</script>

<style lang="less" scoped>
.txt {
  width: 750px;
  height: 1000px;
  background-color: #ff0000;
}
</style>
