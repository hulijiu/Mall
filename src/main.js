import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import toast from './components/common/Toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

//安装Toast插件
Vue.use(toast)
//解决移动端的300ms延迟
FastClick.attach(document.body)


Vue.use(VueLazyLoad,{
  loading: require("./assets/img/common/placeholder.png")
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
