<template>
  <div class="detail">
    <div class="topbar">
      <div class="logo"></div>
    </div>
    <div class="banner"></div>
    <div class="news-detail" v-if="newsData">
      <div class="infos">
        <div class="location">新闻动态 &gt; <span>新闻详情</span></div>
        <div class="time">{{ newsData.time }}</div>
      </div>
      <div class="title">{{ newsData.title }}</div>
      <div class="content" v-html="newsData.html"></div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import _ from "lodash";
import Loading from "../../components/loading/loading";

export default {
  name: "detail",
  components: {
    Loading
  },
  data() {
    return {
      id: this.$route.params.id,
      newsData: "",
      isLoading: true
    };
  },
  methods: {
    async getCms() {
      try {
        this.isLoading = true;
        const res = await this.$http.get("https://api.lkbt.pro/wp-json/wp/v2/posts/" + this.id);
        this.isLoading = false;
        let time = _.get(res, "date", "");
        if (time.indexOf("T") > -1) {
          time = time.split("T")[0];
        }
        this.newsData = {
          title: _.get(res, "title.rendered", ""),
          time,
          html: _.get(res, "content.rendered", "")
        };
      } catch (err) {
        this.isLoading = false;
        this.isOver = true;
        console.log(err);
      }
    }
  },
  mounted() {
    this.getCms();
  }
};
</script>

<style lang="less">
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
    img {
      width: 100%;
    }
    .has-text-align-center {
      text-align: center;
    }
  }
}
</style>
