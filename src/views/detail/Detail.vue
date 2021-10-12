// 详情页
<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-navbar"
      @NavBarClick="navBarClick"
      ref="navbar"
    ></detail-nav-bar>
    <!-- <ul>
      <li v-for="(item,index) in this.$store.state.cartList" :key=index>{{item}}</li>
    </ul> -->
    <!-- 记得监听scroll事件和设置probetype要搭配使用 -->
    <scroll class="content" ref="scroll" :probetype="3" @scroll="contentScroll">
      <div>
        <detail-swiper
          :topImages="topImages"
          @swiperLoad="swiperLoad"
        ></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info
          :detail-info="detailInfo"
          @imageLoad="detailImageLoad"
        ></detail-goods-info>
        <detail-goods-param
          :goods-param="goodsParam"
          ref="params"
        ></detail-goods-param>
        <detail-comment-info
          :comment-info="commentInfo"
          ref="comments"
        ></detail-comment-info>
        <goods-list :goods="recommends" ref="recommends"></goods-list>
      </div>
    </scroll>
    <back-to-top
      @click.native="bttClick(0, 0, 500)"
      v-show="isShowBTT"
    ></back-to-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
// import Vue from "vue";
import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue";
import DetailGoodsParam from "./childComponents/DetailGoodsParam.vue";
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue";
import DetailBottomBar from "./childComponents/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { itemListenerMixin,backToTopMixin } from "common/mixins";

// 和mapGetters用法相同，可以把actions里的东西映射到methods里面
import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin,backToTopMixin],
  data() {
    return {
      // 建立这个数据是为了在router里的path能够取到动态的url
      iid: null,
      // 用来存轮播图的图片
      topImages: [],
      // 用来放goods实例的需要展示的数据
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      detailTopYs: [0],
    };
  },
  methods: {
    ...mapActions({
      // 不用原名,因为这里有同名的方法
      add:"addToCart"
    }),
    // detail 的图片加载完成后，刷新一次滚动条，并获取参数、评论、图片的准确的offsetTop
    detailImageLoad() {
      this.$refs.scroll.scrollRefresh();
      // console.log("detail页面图片加载完成");
      // this.detailTopYs=[]
      // if (this.$refs.params.$el.offsetTop > this.detailTopYs[1]) {
      //   Vue.set(this.detailTopYs,1,this.$refs.params.$el.offsetTop)
      // }
      // if (this.$refs.comments.$el.offsetTop > this.detailTopYs[2]) {
      //   Vue.set(this.detailTopYs,2,this.$refs.comments.$el.offsetTop)
      // }
      // if (this.$refs.recommends.$el.offsetTop > this.detailTopYs[3]) {
      //   Vue.set(this.detailTopYs,3,this.$refs.recommends.$el.offsetTop)
      // }
      // 不懂为啥参数和推荐的滚动条定位有问题，会偏往下一点点
      // 本来想用上面的方法分别判断这几个offsetTop和detailTopYs对应位置的大小
      // 然后取大的值来更新detailTopYs的，结果科学的方法效果反倒不科学，只能手动偷鸡了
      this.detailTopYs.push(this.$refs.params.$el.offsetTop - 50);
      this.detailTopYs.push(this.$refs.comments.$el.offsetTop);
      this.detailTopYs.push(this.$refs.recommends.$el.offsetTop - 50);
      // 添加个js中最大的数字到数组末位，方便简化等会scroll的判断条件
      this.detailTopYs.push(Number.MAX_VALUE);
    },
    swiperLoad() {
      // if (this.$refs.params.$el.offsetTop > this.detailTopYs[1]) {
      //   Vue.set(this.detailTopYs,1,this.$refs.params.$el.offsetTop)
      //   console.log("_______________swiper  params______________");
      //   console.log(this.$refs.params.$el.offsetTop);
      //   console.log(this.detailTopYs[1]);
      // }
      // if (this.$refs.comments.$el.offsetTop > this.detailTopYs[2]) {
      //   Vue.set(this.detailTopYs,2,this.$refs.comments.$el.offsetTop)
      //   console.log("_______________swiper  comments______________");
      //   console.log(this.$refs.comments.$el.offsetTop);
      //   console.log(this.detailTopYs[2]);
      // }
      // if (this.$refs.recommends.$el.offsetTop > this.detailTopYs[3]) {
      //   Vue.set(this.detailTopYs,3,this.$refs.recommends.$el.offsetTop)
      //   console.log("_______________swiper  recommends______________");
      //   console.log(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.detailTopYs[3]);
      // }
    },
    navBarClick(index) {
      // 无法传指定参数，只能按顺序传
      this.$refs.scroll.scrollTo(0, -this.detailTopYs[index]);
    },
    contentScroll(position) {
      // console.log(this.detailTopYs);
      this.bttShow(position)
      // 这里用len-1是因为数组里最后的大数字是为了下标不越界而且简化if条件而添加的，不用拿来判断
      for (let i = 0; i < this.detailTopYs.length - 1; i++) {
        // console.log(this.$refs.navbar.currentIndex);
        // 首先排除当前下标和i相等的情况，大幅减少后面的判断频率（短路求值）
        // 然后在当前y坐标处于两个offsetTop之间时，把当前下标定死
        if (
          this.$refs.navbar.currentIndex != i &&
          -position.y >= this.detailTopYs[i] &&
          -position.y < this.detailTopYs[i + 1]
        ) {
          this.$refs.navbar.currentIndex = i;
        }
      }
    },
    addToCart(){
      const purchase={}
      purchase.image=this.topImages[0]
      purchase.title=this.goods.title
      purchase.desc=this.goods.desc
      purchase.price=this.goods.realPrice
      // iid用来区分商品，给每个商品一个标识符
      purchase.iid=this.iid
      // 这里需要使用vuex,把goods对象作为参数提交到mutations里的addToCart函数里
      // 因为所有对vuex里state的修改都要经由mutations来完成
      // this.$store.commit("addToCart",purchase)
      // 重构mutations后，这里分发到actions，再由vuex内部commit到mutations里
      // 现在actions里返回了promise,这里可以直接then了
      // this.$store.dispatch('addToCart', purchase).then(res => {
      //   console.log(res)
      // })
      // 因为添加了mapactions，这里可以直接this.add了
      this.add(purchase).then(res => {
        // console.log(res);
        // 直接把返回的res作为参数调用插件$toast的show方法
        this.$toast.show(res)
      })

    }
  },
  // 因为路由已经keep-alive了，所以只会created一次，所以要在activated里重置iid
  // 或者在keep-alive里去掉Detail，有时候用activated会出现轮播图数量不对（有重复图片）的问题
  created() {
    // 获取具体路由对象的参数iid
    this.iid = this.$route.params.iid;
    // 根据iid请求轮播图的数据
    getDetails(this.iid).then((res) => {
      // console.log(res);
      // 由于都是要用res.result，所以全部封装进常量data
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);
      // 这里往下全是import导入的vue对应取数据的
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      // console.log(data.itemParams.info);
      // console.log(data.itemParams.rule);
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 没有评价的就不必取了
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo.user.avatar);
      }
    });
    getRecommend().then((res) => {
      // 直接获取数据存到数组里，然后通过首页的goodlist展示
      this.recommends = res.data.list;
      // console.log(this.recommends[0].image);
    });
  },
  // updated() {
  //   this.detailTopYs = [];
  //   this.detailTopYs.push(0);
  //   this.detailTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.detailTopYs.push(this.$refs.comments.$el.offsetTop);
  //   this.detailTopYs.push(this.$refs.recommends.$el.offsetTop);
  // },
  destroyed() {
    // 在离开页面时解除绑定这个防抖函数的监听
    this.$bus.$off("ImageLoad", () => {
      debounce(this.$refs.scroll.scrollRefresh, 100);
    });
    // console.log("Detail解绑ImageLoad成功");
  },
  // mounted () {
  //   this.$refs.scroll.scrollRefresh()
  // }
};
</script>

<style scoped>
/* 首先先设置相对位置，然后把z轴往上靠，然后背景设为白色，完全遮盖下面的tabbar */
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  /* 记得要把父组件定固定高度，不然到时候子组件没有父组件高又不能滚动了 */
  height: 100vh;
}
.content {
  /* 这里用计算高度和视口高度都不行，滚动有问题，怪事
  加了更多数据以后又行了，看来还是高度问题
  这个计算公式很有问题，好像不能识别-几-几或者-（几+几）这种格式，会出各种BUG */
  height: calc(100% - 95px);
  /* height: 10px; */
}
.detail-navbar {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>
