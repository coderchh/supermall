import Vue from 'vue'
import App from './App.vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
import store from './store'

// 使用vantui的Toast
import { Toast } from 'vant'
Vue.use(Toast)

//引入图片懒加载
import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: require('./assets/img/loading.gif'),
    attempt: 3
})

// 应用
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.filter('filterPrice', function(val) {
    return '￥' + Number(val).toFixed(2)
})

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    }
}).$mount('#app')