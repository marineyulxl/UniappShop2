<template>
  <view>
    <my-search></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: '100%'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
       <!-- :style="{height: wh + 'px'}" -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: '100%'}">
        <view class="cate-lv2-list">
          <view class="cate-lv2-item" v-for="(item2, i2) in cateLevel2" :key="i2" @click="gotoGoodsList(item2)">
            <!-- 图片 -->
            <image :src="item2.cat_icon"></image>
            <!-- 文本 -->
            <text>{{item2.cat_name}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  const categor = require('../../data/categor.json')
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
     mixins: [badgeMix],
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        // 当前选中项的索引，默认让第一项被选中
        active: 0,
        cateList: categor.message,
        // 二级分类列表
        cateLevel2: categor.message[0].children
      };
    },
    methods: {
      async getCateList() {
        // 发起请求
        const {
          data: res
        } = await this.$myHttp({
          url: 'api/public/v1/categories'
        });
        // 转存数据
        // this.cateList = res.message
        // this.cateLevel2 = res.message[0].children

      },
      activeChanged(i) {
        this.active = i
        // 为二级分类列表重新赋值
        this.cateLevel2 = this.cateList[i].children
      },
      // 点击三级分类项跳转到商品列表页面
      gotoGoodsList(item2) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item2.goods_id
        })
      }
    },
    onLoad() {
      console.log(categor, "shuju");
      // 获取当前系统的信息
      // const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      // this.wh = sysInfo.windowHeight
      this.getCateList()
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          color: #de0000;
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }



  .cate-lv2-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv2-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
