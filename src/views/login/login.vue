<template>
  <div class="login">
    <div class="avatar"></div>
    <div class="formbox">
      <div class="input">
        <div class="input-li"><i class="input-li1"></i><input type="text" placeholder="请输入手机号码" /></div>
        <div class="input-li" v-if="logType == 1">
          <i class="input-li2"></i><input type="text" placeholder="请输入验证码" /><span>获取验证码</span>
        </div>
        <div class="input-li" v-if="logType == 0"><i class="input-li3"></i><input type="text" placeholder="请输入密码" /></div>
      </div>
      <div class="link-li">
        <a href="javascript:;" v-if="logType == 1" @click="toAccess">账号登录</a>
        <a href="javascript:;" v-if="logType == 0" @click="toVerification">验证码登录</a>
        <a href="javascript:;">忘记密码</a>
      </div>
      <div class="button">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      logType: 1, // 0 账号登录 1验证码登录
    };
  },
   methods: {
     toAccess() {
       this.logType = 0;
     },
     toVerification() {
       this.logType = 1;
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

.link-li {
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  a {
    color: #fff;
  }
}
</style>
