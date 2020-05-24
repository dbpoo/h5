<template>
  <div class="login">
    <div class="avatar"></div>
    <div class="formbox">
      <div class="input">
        <div class="input-li"><i class="input-li1"></i><input type="text" placeholder="请输入手机号码" v-model="phoneNumber" /></div>
        <div class="input-li" v-if="logType == 1">
          <i class="input-li2"></i>
          <input type="text" placeholder="请输入验证码" v-model="codeNumber" />
          <span @click="onVerification" v-show="codeFlag">获取验证码</span>
          <span v-show="!codeFlag">{{ count }} s</span>
        </div>
        <div class="input-li" v-if="logType == 0"><i class="input-li3"></i><input type="password" placeholder="请输入密码" v-model="password" /></div>
      </div>
      <div class="link-li">
        <a href="javascript:;" v-if="logType == 1" @click="toAccess">账号登录</a>
        <a href="javascript:;" v-if="logType == 0" @click="toVerification">验证码登录</a>
        <router-link :to="{ name: 'register' }">找回密码</router-link>
      </div>
      <div class="button" @click="onLogin">提交</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { set } from "../../js/storage";
import host from "../../js/host";
// import _ from "lodash";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "login",
  data() {
    return {
      logType: 1, // 0 账号登录 1验证码登录
      phoneNumber: "",
      codeNumber: "",
      password: "",
      timer: "",
      codeFlag: true,
      count: 0,
      canClick: true
    };
  },
  methods: {
    toAccess() {
      this.logType = 0;
    },
    toVerification() {
      this.logType = 1;
    },
    async onVerification() {
      try {
        const phoneReg = /^1[0-9]{10}$/;
        if (!this.phoneNumber) {
          Toast("请输入手机号");
          return;
        }
        if (!phoneReg.test(this.phoneNumber)) {
          Toast("请输入正确的手机号");
          return;
        }
        if (!this.canClick) return;
        this.canClick = false;
        const res = await this.$http.get(host.API + "login/sendSms/" + this.phoneNumber);
        if (res.errorCode === 200) {
          Toast(res.msg);
          this.getCode();
        } else {
          this.canClick = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.codeFlag = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.codeFlag = true;
            clearInterval(this.timer);
            this.timer = null;
            this.canClick = true;
          }
        }, 1000);
      }
    },
    onLogin() {
      const phoneReg = /^1[0-9]{10}$/;
      if (!this.phoneNumber) {
        Toast("请输入手机号");
        return;
      }
      if (!phoneReg.test(this.phoneNumber)) {
        Toast("请输入正确的手机号");
        return;
      }
      if (this.logType === 1) {
        // 验证码登录
        if (!this.codeNumber) {
          Toast("请输入验证码");
          return;
        }
        this.onCodeLogin();
      } else {
        // 密码登录
        if (!this.password) {
          Toast("请输入密码");
          return;
        }
        this.onPwdLogin();
      }
    },
    async onCodeLogin() {
      try {
        const { phoneNumber, codeNumber } = this;
        const res = await this.$http.get(host.API + "login/verificationLogin/" + phoneNumber + "/" + codeNumber);
        if (res.errorCode === 200) {
          this.onStorage(res.data);
          this.$router.push({
            name: "my"
          });
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async onPwdLogin() {
      try {
        const { phoneNumber, password } = this;
        const res = await this.$http.post(host.API + "login/PhonePwdLogin?password=" + password + "&phone=" + phoneNumber);
        if (res.errorCode === 200) {
          this.onStorage(res.data);
          this.$router.push({
            name: "my"
          });
        } else {
          Toast(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },

    onStorage(data) {
      set("isLogin", true);
      set("use", data);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #007586;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 70px;
}

.avatar {
  width: 539px;
  height: 539px;
  background: url("../../assets/avatar.png") 0 0 no-repeat;
  background-size: contain;
  margin-bottom: 70px;
}

.formbox {
  width: 100%;
  padding: 0 56px;
}

.input-li {
  padding: 30px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #aad1d7;
  input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: none;
    color: #fff;
  }
  i,
  span {
    display: inline-block;
    flex: 0 0 auto;
  }
  i {
    width: 75px;
    height: 46px;
    border-right: 1px solid #fff;
    margin-right: 20px;
  }
  i.input-li1 {
    background: url("../../assets/icon_inp1.png") 0 0 no-repeat;
    background-size: contain;
  }
  i.input-li2 {
    background: url("../../assets/icon_inp2.png") 0 0 no-repeat;
    background-size: contain;
  }
  i.input-li3 {
    background: url("../../assets/icon_inp3.png") 0 0 no-repeat;
    background-size: contain;
  }
  span {
    width: 165px;
    height: 50px;
    line-height: 50px;
    background-color: #99c8cf;
    color: #007787;
    border-radius: 10px;
    text-align: center;
  }
}

.button {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 34px;
  color: #007586;
  background-color: #99c8cf;
  border-radius: 20px;
  text-align: center;
}

.link-li {
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  a {
    color: #fff;
  }
}
</style>
