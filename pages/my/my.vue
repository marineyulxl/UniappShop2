<template>
	<view>
		  <!-- 用户未登录时，显示登录组件 -->
		    <my-login v-if="!token"></my-login>
		
		    <!-- 用户登录后，显示用户信息组件 -->
		    <my-userinfo v-else></my-userinfo>
    
    
	</view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
     computed: {
        // 2. 从 m_user 模块中导入需要的 token 字符串
        ...mapState('m_user', ['token']),
      },
    mixins: [badgeMix],
    data() {
    			return {
    
    			}
    		},
    		onLoad() {
     
    		},
    	 methods:{
    	  
    	   },
    

  }
</script>

<style lang="scss" scoped>


</style>
