<template>
  <div class="index">
    <div class="topbar">
      <div class="logo"></div>
    </div>
    <div class="col-1">
      <div class="banner"></div>
      <div class="info">
        <p>
          Seele项目团队通过深入研究，以知识互联解决知识的结构、继承、传递等体系问题，以价值互联解决知识发布、传播、使用过程中的权益冲突。知识互联+价值互联，融合建立“产业数据基础资源交换平台”，构建完整的知识链条，催生大量新型应用、新型互动模式的涌现。
        </p>
        <p>
          我们的核心目标是，从基础设施层面解决数据基础资源的共享、共建、共赢，打通资源资产的交换、价值变现的通路。项目开发为全球知识资产流通服务的价值交换平台和建设为数据资产交易平台服务的金融基础设施，以可执行知识产权为核心建立知识权益的开放体系，架设新型资产全球化过程中责、权、利的统一生态。
        </p>
      </div>
    </div>
    <div class="col-2">
      <ul class="ul1">
        <li class="li1"></li>
        <li class="li2">EIP事务</li>
        <li class="li3">
          EIP（Executive Intellectual
          Property）通过描叙成计算机语言，建立可以在实际生产环境中运行的知识模型，使知识实现计算化，为知识的可流动可直接应用于社会生产创造了条件。
        </li>
      </ul>
      <ul class="ul2">
        <li class="li1"></li>
        <li class="li2">数据治理</li>
        <li class="li3">
          根据不同应用场景构建了异构安全模型，每一个数字基础资源拥有者可以自主选择协议以不同信任级别来分享数据，同时安全可靠地跟踪追溯资源使用情况。
        </li>
      </ul>
      <ul class="ul3">
        <li class="li1"></li>
        <li class="li2">隐私安全</li>
        <li class="li3">
          平台围绕核心数据保护，构建分级分类细粒化隐私保护机制，采用差分隐私保护、属性加密、安全多方计算等密码学技术，为数据确权和可信数字基础资源共享提供理论支撑和实践手段。
        </li>
      </ul>
      <ul class="ul4">
        <li class="li1"></li>
        <li class="li2">权益支付</li>
        <li class="li3">
          分布式的针对金融及医疗行业的数字资产交易平台，满足行业应用的数据高可靠性、易用性和安全性要求。行业数字资产共享生态基于区块链技术，发挥其在数据隐私保护、数据存储等方面的优势。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style lang="less" scoped>
.index {
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
  height: 468px;
  background: url("../../assets/banner.jpg") 0 0 no-repeat;
  background-size: contain;
}

.col-1 {
  .info {
    padding: 20px 30px;
    p {
      text-indent: 60px;
      font-size: 28px;
      padding-top: 20px;
    }
  }
}

.col-2 {
  background-color: #fafafa;
  padding: 0 30px;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    li.li1 {
      width: 230px;
      height: 230px;
    }
    li.li2 {
      font-size: 40px;
      color: #007586;
      font-weight: bold;
      margin: 60px 0;
    }
    li.li3 {
      font-size: 28px;
    }
  }
  ul.ul1 {
    li.li1 {
      background: url("../../assets/icon_1.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
  ul.ul2 {
    li.li1 {
      background: url("../../assets/icon_2.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
  ul.ul3 {
    li.li1 {
      background: url("../../assets/icon_3.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
  ul.ul4 {
    li.li1 {
      background: url("../../assets/icon_4.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
}
</style>
