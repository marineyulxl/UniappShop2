<template>
  <view>
    <my-address></my-address>
    <view class="" v-if="isSingle">
      <my-sgoods :goods="order" :single='true'></my-sgoods>
    </view>
    <view  v-for="(goods, i) in cart" :key="i" v-else>
      <my-sgoods :goods="goods"></my-sgoods>
    </view>
   <my-submit :single='isSingle'></my-submit>
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
      goods:{
        type:Object
      }
    },
    computed: {
        ...mapState('m_order', ['order']),
          ...mapState('m_cart', ['cart']),
          ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
          ...mapGetters('m_user', ['addstr']),
        },
    data() {
      return {
        isSingle:false
      }
    },
    methods: {
    },
    onLoad(options){
      console.log(options);
      this.isSingle =Boolean(options.isall)
    }
  }
</script>

<style scoped lang="scss">

</style>
