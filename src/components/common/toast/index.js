// 创建这个文件是为了把toast当成插件来使用，这样使用的时候就不用在具体vue里导入+注册+使用了
import Toast from "./Toast"
// 任意创建一个对象，然后导出它的默认，在main.js里import然后use了以后就会自动调用它的install方法
const obj={}
// 这个vue是use那边传过来的参数
obj.install=function(Vue){
  // 创建toast构造器，根据Toast的.vue文件
  const toastConstructor=Vue.extend(Toast)
  // 根据这个构造器，创建一个新对象
  const toast=new toastConstructor()
  // 把这个toast挂载到新创建的div上，这样就相当于用个div当做toast的容器
  toast.$mount(document.createElement("div"))
  // 给body添加这个div
  document.body.appendChild(toast.$el)
  // 把这个toast添加到vue原型里，到时候就可以和时间总线一样使用了
  Vue.prototype.$toast=toast
}

export default obj