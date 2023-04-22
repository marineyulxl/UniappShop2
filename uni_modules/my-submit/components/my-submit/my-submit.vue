<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container" v-if="!single">
   <!-- 计件 -->
   <view class="text">
     共<text >{{checkedCount}}</text>件
   </view>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 提交订单按钮 -->
    <view class="btn-settle" @click="settlement">提交订单</view>
  </view>
  <!-- 最外层的容器 2-->
  <view class="my-settle-container" v-else>
   <!-- 计件 -->
   <view class="text">
     共<text >{{order.goods_count}}</text>件
   </view>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ototalprice}}</text>
    </view>
    <!-- 提交订单按钮 -->
    <view class="btn-settle" @click="settlement">提交订单</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props:{
      single:{
        type:Boolean
      }
    },
    computed: {
      ...mapState('m_order', ['order']),
      ...mapGetters('m_order', ['ototalprice']),
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),

    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),

      settlement() {
        console.log("地址", this.addstr);
        console.log("issig",this.single);
        // 2. 再判断用户是否选择了收货地址
        if (!this.addstr) return uni.showToast({
          title: '请选择收获地址！',
          icon: 'none',
        });
        
        // 3. 最后判断用户是否登录了
        // if (!this.token) return uni.$showMsg('请先登录！')
          // uni.navigateTo({
          //   url:'/subpkg/goods_account/goods_account'
          // })
          uni.showToast({
            title: '提交成功！',
            icon: 'success',
          });
      }
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss">
  .my-settle-container {
    /* 底部固定定位 */
    position: fixed;
    bottom: 0;
    left: 0;
    /* 设置宽高和背景色 */
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;

    .amount-box{
      margin: 0 20px;
    }
    .text{
      color: #a1a1a1;
    }
    .amount {
      color: #c00000;
      
    }

    .btn-settle {
      border-radius: 30px;
      height: 40px;
      min-width: 90px;
      background-color: #ea0000;
      color: white;
      line-height: 40px;
      text-align: center;
      margin-right: 20px;
    }
  }
</style>
