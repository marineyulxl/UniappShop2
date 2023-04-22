<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="125" color="#bfbfbf"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="login">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  export default{
    methods:{
      login(){
        console.log(11);
        uni.getUserProfile({
               desc: "获取你的昵称、头像、地区及性别",
               success: (res) => {
                 console.log("所有", res)
               },
               fail() {}
             })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-color: #f8f8f8;
    position: relative;
    overflow: hidden;
  
    // 绘制登录盒子底部的半椭圆造型
    // &::after {
    //   content: ' ';
    //   display: block;
    //   position: absolute;
    //   width: 100%;
    //   height: 40px;
    //   left: 0;
    //   bottom: 0;
    //   background-color: white;
    //   border-radius: 100%;
    //   transform: translateY(50%);
    // }
  
    // 登录按钮的样式
    .btn-login {
      width: 80%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #e30000;
    }
  
    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
