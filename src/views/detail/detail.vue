<template>
  <div class="detail">
    <div class="topbar">
      <div class="logo"></div>
    </div>
    <div class="banner"></div>
    <div class="news-detail">
      <div class="infos">
        <div class="location">新闻动态 &gt; <span>新闻详情</span></div>
        <div class="time">2020-05-22</div>
      </div>
      <div class="title">Seele元一金融领域应用解析</div>
      <div class="content">
        <p>
          近年来，大数据、云计算、人工智能、区块链等新兴技术被应用于金融领域，改变了金融产品和金融服务形式。Seele元一品牌升级后，也将在金融领域大展拳脚。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
};
</script>

<style lang="less" scoped>
.detail {
  padding-top: 130px;
}

.topbar {
  width: 100vw;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  .logo {
    width: 190px;
    height: 44px;
    background: url("../../assets/logo.png") 0 0 no-repeat;
    background-size: contain;
    margin-left: 30px;
  }
}

.banner {
  width: 750px;
  height: 269px;
  background: url("../../assets/banner_new.jpg") 0 0 no-repeat;
  background-size: contain;
}

.news-detail {
  .infos {
    border-bottom: 1px solid #007586;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    .location {
      span {
        color: #007586;
      }
    }
  }
  .title {
    margin: 40px 30px;
    font-size: 34px;
    font-weight: bold;
    text-align: center;
  }
  .content {
    padding: 0 30px;
    font-size: 28px;
    p {
      margin-bottom: 20px;
      color: #6c6c6c;
      text-indent: 56px;
    }
  }
}
</style>
