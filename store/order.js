export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    order: JSON.parse(uni.getStorageSync('order') || '{}')
  }),
  action: {},
  // 模块的 mutations 方法
  mutations: {
    addToOrder(state, goods) {
          state.order=goods
           // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
             this.commit('m_order/osaveToStorage')
        },
        // 将购物车中的数据持久化存储到本地
        osaveToStorage(state) {
           uni.setStorageSync('order', JSON.stringify(state.order))
        },
        
  },

  // 模块的 getters 属性
  getters: {
     // 统计购物车中商品的总数量
       ototalprice(state) {
          let c = state.order.goods_count*state.order.goods_price
          return c
       },
       
       
  },
}
