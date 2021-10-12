<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 偷鸡，为了展示tabcontrol的吸顶效果，新建了一个better-scroll外的tabcontrol
    当要到吸顶的位置时，就让它显示出来，反正它不受better-scroll的控制 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol1"
      class="tab-control"
      v-show="isFixedTabControl"
    ></tab-control>
    <!-- 滚动条的监听类型和监听事件当然是写在滚动条里了，只不过BTT的v-show和position挂钩而已
    注意emit提交过来的方法，由于这里没有position这个东西，所以这里千万不要画蛇添足加实参position -->
    <scroll
      class="content"
      ref="scroll"
      :probetype="2"
      @scroll="getPosition"
      :pullupload="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图也整个v-show，试试看能不能防止回滚(失败)
    回滚问题的根源在于betterscroll会计算可滚动高度，如果计算在加载渲染数据完成之前，那么高度不准确
    它默认你已经滚到底了，但是实际并没有 -->
      <home-swiper :banners="banners"></home-swiper>
      <!--用法和上面的轮播图基本一致 -->
      <recommend-view :recommends="recommends"> </recommend-view>
      <feature-view></feature-view>
      <!-- 监听tabClick事件(tabControl里提交的) -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabcontrol2"
      ></tab-control>
      <!-- 别定义了props然后对数据操作一通结果到头来这里没传props
    这里也可以用个计算属性来封装，但是我感觉大可不必了 -->
      <goods-list :goods="goods[currentTab].list"></goods-list>
      <!-- 防止显示不完，先用列表拉距离
    这里学到一个新姿势，用li{标签内容$@开始数字}*数量
    可以自动生成带内容和计数（从开始数字开始计数）的标签，其中$符号的个数决定显示计数的位数
    形如li{列表$$$@25}*20生成以下效果 -->
    </scroll>
    <!-- 由于不是原生组件，监听原生方法要加个.native
    这个probeType之所以要加:动态绑定是因为不加的话这个3会默认成字符串或者变量 -->
    <back-to-top
      @click.native="bttClick(0, 0, 500)"
      v-show="isShowBTT"
    ></back-to-top>
  </div>
</template>

<script>
// 尽量把导入位置相似的放在一起，不同的用一行分开,下面组件里注册的顺序也保持一致
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
// import BackToTop from "components/content/backToTop/BackToTop";

// 这里由于不是default所以要用大括号把函数包含起来
import { getHomeMultidata, getHomeGoods } from "network/home";

// 主页轮播图
import HomeSwiper from "./childComponents/HomeSwiper";
// 轮播图下的推荐页面
import RecommendView from "./childComponents/RecommendView.vue";
// 推荐页面下的那张图片
import FeatureView from "./childComponents/FeatureView.vue";
// 导入放到utils里的防抖函数,导入的是函数，而且导出没有default，记得大括号
import { debounce } from "common/utils";
// 导入要混入的常量
import { itemListenerMixin, backToTopMixin } from "common/mixins";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  // 混入内容放在和data等内容并列的位置
  mixins: [itemListenerMixin, backToTopMixin],
  data() {
    return {
      //  用自己定义的的data属性把create里请求的网络数据保存起来，否则create生命周期结束了会失去数据
      banners: [],
      recommends: [],
      goods: {
        // 这里用来存储商品信息，page属性主要是用于将数据列表切片按片显示
        // 这样可以方便实现点击不同分类下滑加载到不同位置的效果
        pop: { page: 0, list: [], currentY: 0 },
        new: { page: 0, list: [], currentY: 0 },
        sell: { page: 0, list: [], currentY: 0 },
      },
      // 默认展示pop标签下的内容
      currentTab: "pop",
      // 默认情况下不展示backtotop,这里也抽取到mixins里面了
      // isShowBTT: false,
      // tabcontrol吸顶的高度,在swiper加载好后获取,但是不懂为啥，第一次获取的高度不准确，干脆写死
      tcOffsetTop: 536,
      // 是否吸顶，在获取滚动条位置和吸顶的高度后判断
      isFixedTabControl: false,
      // 保存上次离开home页面时的y坐标位置
      lastY: 0,
      // 记录有没有上一次，如果没有，则activated里不用跳转到上一次Y的位置
      lastExistance: false,
    };
  },
  // 生命周期函数记得是状态词而不是动词，这里写错是不会报错的，非常难找，一定要注意
  // 一般这个函数里不写具体的业务逻辑，所以这里又做一层封装,具体实现转移到methods里
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 这个刷新功能已经放入混入里了，这里全部注释
    // // 用常量接收防抖函数
    // const scrollRefresh = debounce(this.$refs.scroll.scrollRefresh, 100);
    // // 每次开始就监听图片加载，每次加载完毕都重新刷新滚动条以适配图片加载后的新高度
    // this.$bus.$on("ImageLoad", () => {
    //   // 这个的意思是有这个对象的时候调用后面的函数，如果没有，直接不执行，不会再判断后面了
    //   // 必须要在这里判断，进入函数的时候再判断已经迟了，你已经调用了，再判断有没有这个对象已经来不及了
    //   // this.$refs.scroll&&this.$refs.scroll.scrollRefresh()
    //   // 调用防抖函数，似乎在这里就不用判断this.$refs.scroll了
    //   scrollRefresh();
    // });
  },
  activated() {
    // 当是重回页面时直接飞到上次的位置，一开始不执行
    if (this.lastExistance) {
      // this.$refs.scroll.mouseWheel = true;
      // 先刷新一次防止无法滚动，再回到原来的位置，顺序颠倒的话可能出现滚回顶点的bug
      this.$refs.scroll.scrollRefresh();
      this.lastExistance = false;
      this.$refs.scroll.scrollTo(0, this.lastY, 0);
      // console.log("回到记录的位置");
      // console.log(this.lastY);
      // console.log(this.lastExistance);
    }
  },
  deactivated() {
    // 离开页面前保存当前y坐标
    this.lastY = this.$refs.scroll.getScrollY();
    // 离开过这个页面才会有上一次
    this.lastExistance = true;
    // 在离开页面时解除绑定这个防抖函数的监听
    // console.log(this.lastY);
    // console.log(this.lastExistance);
    this.$bus.$off("ImageLoad", () => {
      debounce(this.$refs.scroll.scrollRefresh, 100);
    });
    // console.log("Home解绑ImageLoad成功");
  },
  methods: {
    // home自带的方法
    getHomeMultidata() {
      // 导入进来的方法，获取home.js里的方法请求网络数据
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 每次申请在原页数基础上+1存入变量，待会作为参数传入导入的getHomeGoods函数中
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 理清关系：goods[type]指的是pop、new、sell对应的对象，里面有page和list两个属性
        // 这里的...意思是在原有基础上加入之后参数（这里是res.data.list）里的所有新的元素
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list[0].image);

        this.$refs.scroll.finishPullUp();
      });
    },
    tabClick(index) {
      // 当tab被点击时，首先记录当前tab下scroll的y坐标
      this.goods[this.currentTab].currentY = this.$refs.scroll.getScrollY();
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
          break;
      }
      // 如果点击tab的时候还没滚到offsetTop，直接让他滚到tabclick的offsetTop
      if (-this.goods[this.currentTab].currentY <= this.tcOffsetTop) {
        // 由于offsetTop是正的，所以滚到这里的参数要加-
        this.$refs.scroll.scrollTo(0, -this.tcOffsetTop, 0);
        this.goods[this.currentTab].currentY = this.tcOffsetTop;
        // 否则让他滚到上次记录好的y的位置
      } else {
        // 而这里currentY直接是获取的y，直接是负的，所以这里不加-号
        this.$refs.scroll.scrollTo(0, this.goods[this.currentTab].currentY, 0);
      }
      // 记得在这里改两个tabcontrol的currentIndex，让它们统一
      this.$refs.tabcontrol2.currentIndex = index;
      this.$refs.tabcontrol1.currentIndex = index;
    },
    // bttClick(x, y, time) {
    //   // 这里直接调用方法，可以少加一次.scroll再拿到data里的scroll，体现一波封装思想
    //   // 这里的time本来可以给默认值，但是给默认值的话它又不成功，怪事
    //   this.$refs.scroll.scrollTo(x, y, time);
    // },
    getPosition(position) {
      // console.log(position);
      // 这句话不能单独抽取，抽取的判断只会精确到函数，同名函数会被替代，不会进来检查函数里语句是否相同
      // this.isShowBTT = position.y < -600;
      // 所以干脆把这句话封装成函数，这样就可以抽取了
      this.bttShow(position);
      // 想解决回滚问题，解决失败
      // if (position.y > -180) {
      //   // console.log();
      //   // 不知道为啥refs的方法拿不到
      //   setTimeout(() => {
      //     console.log(this.$refs.home - swiper);
      //   }, 500);
      // } else {
      //   // document.querySelector("#home-swiper")
      // }
      this.isFixedTabControl = position.y < -this.tcOffsetTop;
      // console.log(this.isFixedTabControl);
    },
    loadMore() {
      // 由于方法已经封装完毕，所以可以直接使用
      // this.getHomeGoods(this.currentTab);
      // 因为懒加载后会有下拉加载更多时别的标签下出现大段空白无法正常加载的bug
      // 所以这里全部重新加载数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
      // this.$refs.scroll.finishPullUp();
    },
    // getTcOffsetTop() {
    //   // 获取了tabcontrol了以后还需要用$el才能获取它的属性
    //   // this.tcOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    //   // console.log(this.tcOffsetTop)
    // },
  },
};
</script>

//scoped是指作用域，即里面的所有CSS代码只对本文件内生效，如果不加，就会对其他文件也生效 
<style scoped>
#home {
  /* 为了不让其余内容被navbar遮挡，所以默认有个距离页面顶部44px的距离 */
  padding-top: 44px;
  position: relative;
  /* vh指的是Viewport Height（视口高度）前面的数字代表所占的百分比
  视口比例长度定义了相对于视口的长度大小，这是文档的可见部分。 */
  height: 100vh;
}
.home-nav {
  /* 直接用现有的变量 */
  background-color: var(--color-tint);
  color: #fff;
  /* 为了让顶部导航栏不随滚动条一起滚动 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  /* 堆叠顺序，数字越大则离用户越近，越能挡住其他元素，而且这个属性必须用在定位的元素上 */
  z-index: 5;
}
.tab-control {
  position: relative;
  z-index: 8;
}
.content {
  overflow: hidden;
  /* height: 200px; */
  /* 位置定死，让它自动拉伸匹配除了标题栏和导航栏的剩余部分 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
