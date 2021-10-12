import Vue from "vue"
import VueRouter from "vue-router"
const Home = () => import("../views/home/Home")
const Profile = () => import("../views/profile/Profile")
const Category = () => import("../views/category/Category")
const Cart = () => import("../views/cart/Cart")
const Detail = () => import("../views/detail/Detail")

Vue.use(VueRouter);
const routes=[
  { path: '', redirect: "/home" },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart },
  { path: '/profile', component: Profile },
  //传参数的方式别忘了，:加组件里有的data
  { path: '/detail/:iid', component: Detail }
]
const router =new VueRouter({
  routes,
  mode:"history"
})

export default router;