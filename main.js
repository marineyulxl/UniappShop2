
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import { myHttp } from './utils/request.js'
Vue.prototype.$myHttp = myHttp
import store from './store/store.js'
App.mpType = 'app'

const app = new Vue({
    ...App,
     store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif