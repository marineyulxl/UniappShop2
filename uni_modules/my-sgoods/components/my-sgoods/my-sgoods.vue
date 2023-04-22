<template>
  <view class="">
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name" @click="aa">{{goods.goods_name}}</view>
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price}}</view>
          <view class="mes">
            <!-- <view class="mssage">
              规格：默认
            </view> -->
            <view class="specification">
              x{{goods.goods_count}}
            </view>
          </view>
        
        </view>
      </view>
    
    </view>
    
 
  </view>
 
</template>
<script>
  export default {
    
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
      },
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://cdn.pixabay.com/photo/2023/03/17/17/38/pomegranates-7859172_960_720.jpg',
      }
    },
    methods:{
      aa(){
        console.log(this.a);
      }
    }
  }
</script>
<style scoped lang="scss">

.goods-item {
    display: flex;
    padding: 10px 10px;
    border-radius: 5px;
    border-bottom: 1px solid #f1eeee;
    background: #fffcfc;
    margin: 0 10px;
    .goods-item-left {
      margin-right: 10px;

      .goods-pic {
        border-radius: 5px;
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .goods-name {
        font-size: 14px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
      }
      .goods-price {
        // margin-top: 20px;
        font-size: 15px;
        color: #c00000;
      }
    }
  }

   
</style>
