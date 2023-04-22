<template>
  <view class="detail-cart">

    <view class="box-cart-title">
      <image :src="goods_info.goods_small_logo" class='box-img'></image>
      <view class='price-box'>
        <view class="">
          {{goods_info.goods_name}}
        </view>
        <!--价格库存-->
        <view class='price'>￥{{goods_info.goods_price}}</view>
        <!-- <view class="sales">库存(99)</view> -->
      		<!--右上角关闭按钮-->
        <text class='lay-close' @click='showCart'>×</text>
      </view>
    </view>
   <!-- <view class="box-content">
      <view class="box-spec">
        <view class='cor-grey'>规格</view>
        <view class='spec-items'>
          <view class="spec-itembac" :class="ac?'specitem-on':''" @click="active">
            默认
          </view>
        </view>
      </view>
    </view> -->
    <view class="footer">
      <view class="num">
        <view class="numtitle">
          购买数量
        </view>
        <uni-number-box :min="1" :value="1" :max='9' @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
    <button class="btn" @click="onclick">确定</button>
  </view>
</template>
<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    props:{
      goods_info:{
        type:Object,
        // default:1
      },
      info:{
        type:String,
        // default:1
      }
    },
    data() {
      return {
        //规格
        ac: true,
        goods_count:1
      }
    },
    methods: {
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart', ['addToCart'], ),
      ...mapMutations('m_order', ['addToOrder'], ),
      showCart() {
        // this.close()
        this.$emit('close')
      },
      active() {
        this.ac = !this.ac
      },
      // 监听到了 NumberBox 组件数量变化的事件
      numChangeHandler(val) {
        this.goods_count=val
        console.log(this.goods_count,"数字");
         // this.goods_count: +val
      },
      onclick() {
        // 2. 组织一个商品的信息对象
        const goods = {
          goods_id: this.goods_info.goods_id, // 商品的Id
          goods_name: this.goods_info.goods_name, // 商品的名称
          goods_price: this.goods_info.goods_price, // 商品的价格
          goods_count: this.goods_count, // 商品的数量
          goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
          goods_state: true // 商品的勾选状态
        }
        if(this.info==='加入购物车')
       {
         
         // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
         this.addToCart(goods)
         this.$emit('close')
         uni.showToast({
           title: '添加成功',
           icon: 'success',
         });
       }else if(this.info==='立即购买'){
         this.addToOrder(goods)
         console.log("this.info",this.info);
         const isall =true
         uni.navigateTo({
           url:'/subpkg/goods_account/goods_account?isall='+isall
         })
       }
        
      }
    },
  }
</script>
<style lang="scss" scoped>
  .detail-cart {
    height: 450px;

    .box-cart-title {
      margin-top: 10px;
      display: flex;
      border-bottom: 1px solid #e5e5e5;

      .box-img {
        width: 190rpx;
        height: 190rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
      }

      .price-box {
        flex: 1;
        position: relative;

        .price {
          font-weight: bold;
          margin-top: 20px;
          font-size: 32rpx;
          color: #f00;
        }

        .lay-close {
          position: absolute;
          right: 10px;
          top: 0;
          width: 28rpx;
          height: 28rpx;
        }
      }
    }
  }

  .detail-cart .box-spec {
    padding: 20rpx;
    border-bottom: 1px solid #ddd;
  }

  .detail-cart .box-spec .spec-items {

    display: flex;
    flex-wrap: wrap;
    padding-right: -40rpx;
    margin-top: 12rpx;
  }

  .detail-cart .box-spec .spec-itembac {
    height: 50rpx;
    line-height: 46rpx;
    padding: 0 20rpx;
    font-size: 26rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 6rpx;
    background-color: #fff;
    border: 2rpx solid #e5e5e5;
    color: #000;
  }

  .detail-cart .box-spec .specitem-on {
    color: #ff5000;
    border: 2rpx solid #ff5000;
  }
.footer{
  position: relative;
}
  .num {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    border-bottom: 1px solid #ddd;

    .mumtilte {}
  }

  .btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5px;
    width: 90%;
    border-radius: 30px;
    background-color: #f00;
    color: #fff;
  }
</style>
