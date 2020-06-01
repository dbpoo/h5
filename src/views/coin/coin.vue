<template>
  <div class="container">
    <div class="info">
      <div class="number-total">SEELE数量：{{ currency.userAccount }}</div>
      <div class="number-line"></div>
      <div class="number-use">可提数量：{{ currency.maxExtractNumber }}</div>
    </div>
    <div class="formbox">
      <div class="input">
        <div class="input-l">提币数量：</div>
        <div class="input-c"><input type="number" v-model="amount" @input="changeInput" /></div>
        <div class="input-r" @click="onAll">全部</div>
      </div>
      <div class="input">
        <div class="input-l">手续费率：</div>
        <div class="input-c">{{ exchange }}</div>
      </div>
      <div class="input">
        <div class="input-l">实际到账数量：</div>
        <div class="input-c">{{ total }}</div>
      </div>
    </div>

    <!-- <div class="title">安全验证</div>
    <div class="formbox">
      <div class="input">
        <div class="input-l">验证码：</div>
        <div class="input-c"><input type="text" /></div>
        <div class="input-r" @click="onVerification" v-show="codeFlag">发送</div>
        <div class="input-r" v-show="!codeFlag">{{ count }} s</div>
      </div>
    </div> -->

    <div class="button" @click="onExtractCoin" v-show="btnFlag">提币</div>
    <div class="button btn-disabled" v-show="!btnFlag">提币</div>
  </div>
</template>

<script>
import Vue from "vue";
import host from "../../js/host";
import _ from "lodash";
import { set, get } from "../../js/storage";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "coin",
  data() {
    return {
      use: "",
      currency: "",
      exchange: "",
      isLogin: false,
      amount: 0,
      total: 0,
      btnFlag: false
    };
  },
  methods: {
    onAll() {
      this.amount = this.currency.maxExtractNumber;
    },
    changeInput: _.debounce(function(e) {
      if (this.amount >= 100) {
        this.btnFlag = true;
        this.serviceCharge(this.amount);
      } else if (this.amount > 0 && this.amount < 100) {
        this.btnFlag = false;
        this.total = 0;
        Toast("转账提币金额必须大于100");
      }
    }, 1000),
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
    async exchangeRate() {
      try {
        const res = await this.$http.get(host.API + "userAccount/exchangeRate");
        if (res.errorCode === 200) {
          this.exchange = res.data.exchangeRate;
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async serviceCharge(amount) {
      try {
        const params = {
          amount,
          userId: this.use.id,
          operator: 3
        };
        const res = await this.$http.post(host.API + "userAccount/serviceCharge", params);
        if (res.errorCode === 200) {
          this.total = res.data.total;
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 提币
    async onExtractCoin() {
      try {
        if (this.amount < 100) {
          Toast("转账提币金额必须大于100");
          return;
        }
        if (this.amount > this.currency.maxExtractNumber) {
          Toast("您的可提数量不足，请核对后提交");
          return;
        }
        const params = {
          amount: this.amount,
          fromWalletAddress: this.use.walletaddress,
          operator: 3,
          remark: "",
          toWalletAddress: "",
          userId: this.use.id,
          withdrawalCode: ""
        };
        const res = await this.$http.post(host.API + "userAccount/extractCoin", params);
        if (res.errorCode === 200) {
          Toast("您的提币申请已提交，请等待审核");
          this.getCurrency();
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
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
      this.currency = get("currency");
      this.exchangeRate();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  min-height: 100%;
  padding-top: 60px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.info {
  width: 650px;
  height: 118px;
  padding: 30px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #01a3b2, #007586);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  margin-bottom: 60px;
  .number-line {
    width: 1px;
    height: 100%;
    background-color: #fff;
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
  margin-bottom: 90px;
}

.btn-disabled {
  background-color: #ccc;
}

.title {
  height: 68px;
  line-height: 68px;
  padding: 0 50px;
}

.formbox {
  width: 100%;
  background-color: #fff;
  padding: 0 56px;
  margin-bottom: 50px;
}

.input {
  height: 96px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  &:last-child {
    border: 0;
  }
  .input-c {
    width: 100%;
  }
  .input-l,
  .input-r {
    flex: 0 0 auto;
  }
  .input-r {
    color: #007586;
  }
}
</style>
