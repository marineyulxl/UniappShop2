<template>
  <view>
    <view class="goods-item">
      <view class="item-header">
        <image :src="defaultPic||goods.goods_small_logo " class="goods-pic"></image>
      </view>
      <view class="item-footer">
        <!-- 商品标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.goods_price}}</view>
        
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        // default:{},
      },
    },
    data() {
      return {
        defaultPic: 'https://cdn.pixabay.com/photo/2017/07/20/15/21/chickens-2522623_960_720.jpg',
      };
    },
    onload(){
      console.log(goods);
    }
  }
 
</script>

<style lang="scss">
  .goods-item {
    width: 180px;
    height: 250px;
    .item-header {
      .goods-pic {
        width: 180px;
        height: 160px;
        display: block;
        border-radius: 5px;
      }
    }
    .item-footer {
      .goods-name {
        font-size: 20px;
        margin: 10px 0;
        overflow: hidden;
        white-space:nowrap; 
        text-overflow:ellipsis;
      }
      .goods-price {
        font-size: 16px;
        color: #c00000;
        
      }
    }
  }
</style>
