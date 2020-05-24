<template>
  <div class="login">
    <div class="avatar"></div>
    <div class="formbox">
      <div class="input">
        <div class="input-li "><i class="input-li1"></i><input type="text" placeholder="请输入手机号码" v-model="phoneNumber" /></div>
        <div class="input-li ">
          <i class="input-li2"></i><input type="text" placeholder="请输入验证码" v-model="codeNumber" /><span>获取验证码</span>
        </div>
        <div class="input-li"><i class="input-li3"></i><input type="text" placeholder="请输入新密码" v-model="password" /></div>
      </div>
      <div class="button">提交</div>
    </div>
  </div>
</template>

<script>
import host from "../../js/host";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "register",
  data() {
    return {
      phoneNumber: "",
      codeNumber: "",
      password: ""
    };
  },
  methods: {
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
        const res = await this.$http.get(host.API + "login/sendSms/" + this.phoneNumber);
        if (res.errorCode) {
          Toast(res.msg);
        }
      } catch (err) {
        this.isLoading = false;
        this.isOver = true;
        console.log(err);
      }
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

.button {
  display: flex;
  justify-content: center;
}

.formbox {
  width: 100%;
  padding: 0 56px;
}

.input {
  margin-bottom: 60px;
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
  text-align: left;
}
</style>
