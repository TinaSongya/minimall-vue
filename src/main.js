import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$http=axios
//守卫
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.auth)){
    //用户未登录，需要跳转登录页面
    next({
      path:'/login',
      query:{
        redirect:to.fullPath
      }
    })
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
