<template>
  <div class="container">
    <div class="infobox">
      <div class="info-l">
        <div class="copy">
          <div class="copy-txt ellips-1">{{ use.walletaddress }}</div>
          <div class="copy-btn" id="copy" :data-clipboard-text="use.walletaddress" @click="onCopy"></div>
        </div>
        <div class="qr" id="qrcode"></div>
      </div>
      <div class="info-r">
        <ul>
          <li class="li1">SEELE数量</li>
          <li class="li2">
            <b>{{ use.userAccount }}</b> SEELE
          </li>
          <li class="li3">( 累计可提{{ currency.maxExtractNumber }} SEELE )</li>
        </ul>
      </div>
    </div>
    <div class="button" @click="toCoin">提币</div>
    <div class="my-link"><a href="javascript:;" @click="onPassport">修改密码</a> | <a href="javascript:;" @click="onOut">退出</a></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="coin-list" :immediate-check="false">
      <div class="list">
        <div :class="'item item-operator' + item.operator" v-for="(item, index) in list" :key="index">
          <div class="icon"></div>
          <div class="info">
            <ul>
              <li class="li1">{{ stateMap(item.state) }}</li>
              <li class="li2">{{ item.operator == 1 ? "To" : "From" }}: {{ item.walletAddress }}</li>
              <li class="li3">{{ item.transactionTime }}</li>
            </ul>
          </div>
          <div class="price">{{ item.operator == 1 ? "-" : "+" }}{{ item.amount }} SEELE</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { set, get } from "../../js/storage";
import QRCode from "qrcodejs2";
import host from "../../js/host";
import Clipboard from "clipboard";
import { Toast, List } from "vant";

Vue.use(List);
Vue.use(Toast);

export default {
  name: "my",
  data() {
    return {
      use: "",
      currency: "",
      isLogin: false,
      page: 1,
      size: 6,
      total: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      if (this.use.id) {
        this.transactionRecord();
      }
    },
    onOut() {
      sessionStorage.clear();
      this.$router.push({
        name: "index"
      });
    },
    onPassport() {
      this.$router.push({
        name: "register"
      });
    },
    onCopy() {
      const clipboard = new Clipboard("#copy");
      clipboard.on("success", (e) => {
        Toast("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        Toast("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    async getCurrency() {
      try {
        const res = await this.$http.get(host.API + "userAccount/getCurrency/" + this.use.id);
        if (res.errorCode === 200) {
          this.currency = res.data;
          set("currency", res.data);
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async transactionRecord() {
      try {
        const { page, size } = this;
        const params = {
          current: this.page,
          filtrations: [
            {
              fieldName: "userId",
              fieldValue: this.use.id,
              operator: "eq"
            }
          ],
          size: this.size
        };
        const res = await this.$http.post(host.API + "transactionRecord/pageList", params);
        if (res.errorCode === 200) {
          const data = res.data.records;
          const total = res.data.total || 0;
          const list = page == 1 ? data : [...this.list, ...data];
          this.list = list;
          this.finished = page * size >= total;
          this.loading = false;
          this.page = page + 1;
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    toCoin() {
      this.$router.push({
        name: "coin"
      });
    },
    stateMap(type) {
      const map = new Map([
        [1, "已发送"],
        [2, "已收到"],
        [3, "已提币"],
        [4, "审核中"],
        [5, "审核通过"],
        [6, "未通过审核"]
      ]);
      return map.get(+type);
    }
  },
  mounted() {
    this.isLogin = get("isLogin");
    if (!this.isLogin) {
      this.$router.push({
        name: "login"
      });
    } else {
      this.use = get("use");
      if (this.use) {
        if (this.use.walletqrcode) {
          // eslint-disable-next-line no-new
          new QRCode("qrcode", {
            text: this.use.walletqrcode,
            width: 80,
            height: 80
          });
        }
        if (this.use.id) {
          this.getCurrency();
          this.transactionRecord();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  background-color: #f9f9f9;
}

.infobox {
  width: 650px;
  height: 286px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #01a3b2, #007586);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.info-l {
  width: 230px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .copy {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .copy-txt {
      width: 170px;
      color: #fff;
    }
    .copy-btn {
      width: 36px;
      height: 37px;
      flex: 0 0 auto;
      background: url("../../assets/icon_copy.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
  .qr {
    img {
      width: 125px;
      height: 125px;
    }
  }
}

.info-r {
  width: 300px;
  height: 190px;
  background-color: #32abb7;
  border-radius: 20px;
  ul {
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    li.li1,
    li.li3 {
      color: #fff;
      font-size: 25px;
    }
    li.li2 {
      font-size: 20px;
      color: #53d8d7;
      b {
        font-size: 30px;
      }
    }
  }
}

.button {
  width: 650px;
  height: 100px;
  line-height: 100px;
  font-size: 34px;
  color: #fff;
  background-color: #33acb8;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 30px;
}

.my-link {
  margin-bottom: 60px;
  a {
    margin: 0 20px;
    display: inline-block;
  }
}

.coin-list {
  width: 100%;
}

.time {
  height: 53px;
  line-height: 53px;
  padding: 0 50px;
}

.list {
  padding: 0 50px;
  background-color: #fff;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  padding: 25px 0;
  &:last-child {
    border: 0;
  }
  .icon {
    width: 35px;
    height: 35px;
    flex: 0 0 auto;
    margin-right: 24px;
  }
  .info {
    width: 100%;
    ul {
      li.li1 {
        font-size: 24px;
        padding-bottom: 10px;
      }
      li.li2 {
        font-size: 18px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .price {
    flex: 0 0 auto;
    font-size: 25px;
    margin-left: 20px;
  }
}

.item-operator1 {
  .icon {
    background: url("../../assets/icon_to.png") 0 0 no-repeat;
    background-size: contain;
  }
  .price {
    color: #8cc5cd;
  }
}

.item-operator2,
.item-operator3 {
  .icon {
    background: url("../../assets/icon_from.png") 0 0 no-repeat;
    background-size: contain;
  }
  .price {
    color: #007586;
  }
}
</style>
