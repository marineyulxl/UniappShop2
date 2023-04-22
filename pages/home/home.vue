<template>
  <view>
    <!-- 轮播图 -->
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
            <!-- 动态绑定图片的 src 属性 -->
            <image :src="item.image_src"></image>
          </navigator>
        </view>
      </swiper-item>
    </swiper>
    <my-search @click="gotoSearch"></my-search>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <!-- v-for="(item, i) in swiperNav" :key="i" @click="navClickHandler(item)" -->
      <view class="navlist-item" >
        <view class="list-item-img">
          <image src="@/static/cate.png" class="nav-img1"></image>
        </view>
        <span >谷物</span>
      </view>
      <view class="navlist-item" >
        <view class="list-item-img">
          <image src="@/static/gs.png" class="nav-img1"></image>
        </view>
        <span >蔬菜</span>
      </view>
      <view class="navlist-item" >
        <view class="list-item-img" >
          <image src="@/static/meat1.png" class="nav-img1"></image>
        </view>
        <span >肉类</span>
      </view>
      <!-- <view class="nav-item" >
        <image :src="item.image_src" class="nav-img"></image>
      </view> -->
    </view>

    <!-- 视频区 -->
    <span style="margin-left: 20px;">视屏展示</span>
    <video style="width: 90%; margin: 10px 20px;" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    <!-- 为你推荐 -->
    <view class="recommend">
      <view class="title">
        为你推荐
      </view>
      <view class="list">
        <view class="list-item" v-for="(item,i) in goodsList" :key="i">
          <view class="" @click='navto(item.goods_id)'>
            <my-com :goods="item"></my-com>
          </view>
            
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  const goodsdata = require('../../data/goodsdata.json')
  import request from '../../utils/request'
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 是否正在请求数据
        isloading: false,
        // 1. 轮播图的数据列表，默认为空数组
        swiperList: [{
            id: 1,
            image_src: 'https://cdn.pixabay.com/photo/2019/05/26/14/55/birds-4230463_960_720.jpg'
          },
          {
            id: 2,
            image_src: 'https://cdn.pixabay.com/photo/2015/08/04/10/00/chickens-874507_960_720.jpg'
          },
          {
            id: 3,
            image_src: 'https://cdn.pixabay.com/photo/2017/09/26/17/47/chicken-2789493_960_720.jpg'
          }
        ],
        // 2.首页导航
        swiperNav: [

          {}
        ],
        // 3请求商品请求参数对象
        // queryObj: {
        //   // 查询关键词
        //   query: '',
        //   // 商品分类Id
        //   cid: '10',
        //   // 页码值
        //   pagenum: 1,
        //   // 每页显示多少条数据
        //   pagesize: 10
        // },
        // 商品列表的数据
        goodsList: goodsdata.goods,
        // 总数量，用来实现分页
        dadaTotal: 0
      };
    },
    onLoad() {
      // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperNav()
      // this.getGoodsList()
    },
    methods: {
      // 3. 获取轮播图数据的方法
      async getSwiperNav() {
        // 发送请求
        const {
          data: res
        } = await this.$myHttp({
          url: 'api/public/v1/home/catitems'
        });
        this.swiperNav = res.message
        console.log(this.swiperNav, "11");
      },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // async getGoodsList(cb) {
      //   const {
      //     data: res
      //   } = await this.$myHttp({
      //     url: 'api/public/v1/goods/search',
      //     data: this.queryObj
      //   })
      //   // if (res.meta.status !== 200) return uni.$showMsg()
      //   // 只要数据请求完毕，就立即按需调用 cb 回调函数
      //   cb && cb()
      //   // 为数据赋值
      //   // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
      //   this.goodsList = [...this.goodsList, ...res.message.goods]

      //   this.dadaTotal = res.message.total
      //   console.log("goodslist", this.goodsList);
      //   // ** 关闭节流阀
      //   this.isloading = false
      // },
      gotoSearch(){
        uni.navigateTo({
               url: '/subpkg/search/search'
             })
      },
      navto(goods_id){
        console.log(goods_id);
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+goods_id
        })
      }
    },
    // // 触底的事件
    // onReachBottom() {
    //   if (this.queryObj.pagenum * this.queryObj.pagesize >= this.dadaTotal) return

    //   // 让页码值自增 +1
    //   this.queryObj.pagenum += 1
    //   // 重新获取列表数据
    //   this.getGoodsList()
    // },
    // // 下拉刷新的事件
    // onPullDownRefresh() {
    //   // 1. 重置关键数据
    //   this.queryObj.pagenum = 1
    //   this.dadaTotal = 0
    //   this.isloading = false
    //   this.goodsList = []

    //   // 2. 重新发起请求
    //   this.getGoodsList(() => uni.stopPullDownRefresh())
    // }
  }
</script>

<style lang="scss" scoped>
  // 轮播图
  swiper {
    height: 370rpx;
    // margin: 10px 20px;
    overflow: hidden;
    border-radius: 3px;
    // border-bottom-right-radius: 5px;
    // border-bottom-left-radius: 5px;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 导航
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  }

  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }


  .navlist-item {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    span {
      margin-top: 5px;
      font-size: 14px;
    }

    .list-item-img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      // background: #00aaff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 10px #ccc;

      .nav-img1 {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
</style>
