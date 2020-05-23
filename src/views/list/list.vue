<template>
  <div class="list">
    <div class="topbar">
      <div class="logo"></div>
    </div>
    <div class="banner"></div>
    <div class="news-list">
      <ul class="item">
        <li class="li1">Seele元一金融领域应用解析</li>
        <li class="li2">近年来，大数据、云计算、人工智能、区块链等新兴技术被应用于金融领域，改变了金融产品和金融服务形式。Seele元 […]</li>
        <li class="li3">
          <span>[2020-05-22]</span>
          <span>更多 >></span>
        </li>
      </ul>
      <ul class="item">
        <li class="li1">Seele元一金融领域应用解析</li>
        <li class="li2">近年来，大数据、云计算、人工智能、区块链等新兴技术被应用于金融领域，改变了金融产品和金融服务形式。Seele元 […]</li>
        <li class="li3">
          <span>[2020-05-22]</span>
          <span>更多 >></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      isLoading: false,
      isOver: false,
      page: 1,
      categories: 12,
      listArr: []
    };
  },
  methods: {
    async getCms(page) {
      const res = await this.$http.get("http://api.lkbt.pro/wp-json/wp/v2/posts", {
        categories: this.categories,
        page: page
      });
      console.log(res);
    }
  },
  mounted() {
    this.getCms(this.page);
  }
};
</script>

<style lang="less" scoped>
.list {
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

.news-list {
  padding: 40px;
  ul.item {
    margin-bottom: 40px;
    background-color: #fafafa;
    border-top: 1px solid #c9c9c9;
    padding: 20px;
    li.li1 {
      font-size: 38px;
      margin-bottom: 20px;
    }
    li.li2 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    li.li3 {
      font-size: 30px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
