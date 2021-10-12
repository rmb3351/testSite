import Vue from 'vue'
import App from './App.vue'
// vue路由和vuex都是在main.js里导入和注册的
import router from "./router"
import store from "./store"
// 指定文件夹就是导入该目录下的index.js文件
import toast from "components/common/toast"
// 这个库用于解决移动端点击的300ms延迟
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
// 在这里创建vue原型的$bus对象
Vue.prototype.$bus=new Vue()
// 在这里安装toast，如同安装插件，然后就会调用index的install方法
Vue.use(toast)
// 这样就可以实装fastclick了
FastClick.attach(document.body)
// 安装图片懒加载库,然后还要把懒加载的图片的src弄成v-lazy
// 但是这样会出现bug，即下拉加载更多以后别的标签下面会出现大量空白，直到它下面也拉到这个高度才会加载
// 而且适用v-lazy的img属性@load无法正确监听加载完成
Vue.use(VueLazyLoad,{
  // 即图片加载中的时候显示的图片
  loading:require("./assets/img/common/placeholder.png")
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
