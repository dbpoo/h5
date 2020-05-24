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
    <div class="my-link">
      <a href="javascript:;" @click="onPassport">修改密码</a>
    </div>
    <div class="coin-list">
      <div class="time">4月20 2020</div>
      <div class="list">
        <div class="item item-to">
          <div class="icon"></div>
          <div class="info">
            <ul>
              <li class="li1">已发送</li>
              <li class="li2">To: 0x1Nh7uHdv0x1Nh7uHdv0x1Nh7uHdv</li>
            </ul>
          </div>
          <div class="price">-0 SEELE</div>
        </div>
        <div class="item item-from">
          <div class="icon"></div>
          <div class="info">
            <ul>
              <li class="li1">已发送</li>
              <li class="li2">From: 0x1Nh7uHdv0x1Nh7uHdv</li>
            </ul>
          </div>
          <div class="price">+0.1628 SEELE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { set, get } from "../../js/storage";
import QRCode from "qrcodejs2";
import host from "../../js/host";
import Clipboard from "clipboard";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "my",
  data() {
    return {
      use: "",
      currency: "",
      isLogin: false,
      current: 1,
      total: 0,
      list: []
    };
  },
  methods: {
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
        const params = {
          current: this.current,
          filtrations: [
            {
              fieldName: "userId",
              fieldValue: this.use.id,
              operator: "eq"
            }
          ],
          size: 10
        };
        const res = await this.$http.post(host.API + "transactionRecord/pageList", params);
        if (res.errorCode === 200) {
          this.list = res.data;
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

.item-to {
  .icon {
    background: url("../../assets/icon_to.png") 0 0 no-repeat;
    background-size: contain;
  }
  .price {
    color: #8cc5cd;
  }
}

.item-from {
  .icon {
    background: url("../../assets/icon_from.png") 0 0 no-repeat;
    background-size: contain;
  }
  .price {
    color: #007586;
  }
}
</style>
