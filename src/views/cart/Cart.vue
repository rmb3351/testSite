<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="wrapper" ref="scroll" :probetype="3" @scroll="cartScroll">
      <cart-list class="cart-list"></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComponents/CartList.vue";
import CartBottomBar from "./childComponents/CartBottomBar.vue"

//mapgetters是一个把getters里的函数映射到计算属性的辅助函数
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      // 记录购物车商品数量，根据这个同步与否决定scroll是否刷新
      purchaseCount: 0,
    };
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    // mapgetters函数的两种用法:1.直接按原名映射过来，在参数里放数组，数组里放每个函数名的字符串就行
    // ...mapGetters(["cartLength","cart"])
    // 2.参数里放对象，然后键用作映射过来后的别名，值就是映射的函数名(注意这里键和值缺一不可)
    ...mapGetters({
      length: "cartLength",
      cart: "cart",
    }),
  },
  methods: {
    // 似乎不必那么麻烦，每次activated就刷新一次就行了
    // 监听到滚动就判断是否需要刷新
    cartScroll() {
      // 如果没有同步购物车商品数量则刷新
      // if (this.purchaseCount==0 ||this.purchaseCount != this.length) {
      //   this.$refs.scroll.scrollRefresh();
      //   this.purchaseCount = this.length;
        // console.log("____modified______");
        // console.log(this.length);
        // console.log(this.purchaseCount);
      // }
    },
  },
  activated () {
    // console.log("activated");
    this.$refs.scroll.scrollRefresh();
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.navbar {
  background: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
/* 这里用calc计算死都不对，只能照搬主页的绝对定位的方法来用了 */
.wrapper {
  overflow: hidden;
  /* height: 200px; */
  /* 位置定死，让它自动拉伸匹配除了标题栏和导航栏的剩余部分 */
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  /* height: calc(100%-95px); */
}
</style>
