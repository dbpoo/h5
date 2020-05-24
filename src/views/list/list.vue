<template>
  <div class="container">
    <div class="topbar">
      <div class="logo"></div>
    </div>
    <div class="banner"></div>
    <div class="news-list">
      <router-link tag="div" class="item" v-for="(item, index) in listArr" :key="index" :to="`/detail/${item.id}`">
        <ul class="item">
          <li class="li1">{{ item.title.rendered }}</li>
          <li class="li2" v-html="item.excerpt.rendered"></li>
          <li class="li3">
            <span>[{{ filterTime(item.date) }}]</span>
            <span>更多 >></span>
          </li>
        </ul>
      </router-link>
    </div>
    <loading :isLoading="isLoading" v-if="isLoading"></loading>
    <div class="loadmore" v-else>
      <a href="javascript:;" @click="getMore" :class="isOver ? 'is-over' : ''">{{ isOver ? "没有更多了" : "加载更多" }}</a>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/loading/loading";

export default {
  name: "list",
  components: {
    Loading
  },
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
      try {
        this.isLoading = true;
        const res = await this.$http.get("https://api.lkbt.pro/wp-json/wp/v2/posts", {
          categories: this.categories,
          page: page
        });
        this.isLoading = false;
        this.listArr = [...this.listArr, ...res];
        if (this.listArr.length === 0) {
          this.isOver = true;
        }
      } catch (err) {
        this.isLoading = false;
        this.isOver = true;
        console.log(err);
      }
    },
    getMore() {
      if (this.isOver) return;
      this.page++;
      this.getCms(this.page);
    },
    filterTime(t) {
      return t.split("T")[0];
    }
  },
  mounted() {
    this.getCms(this.page);
  }
};
</script>

<style lang="less" scoped>
.container {
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
  padding: 40px 40px 0 40px;
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

.loadmore {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: #fff;
    background-color: #007586;
    border-radius: 10px;
    font-size: 30px;
  }
  a,
  span {
    padding: 20px 60px;
    color: #fff;
  }
  a.is-over {
    border: 0;
    color: #ccc;
    background-color: #f1f1f1;
  }
}
</style>
