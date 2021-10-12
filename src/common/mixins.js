// 这个文件用于存放不同vue里的重复代码，到时候直接在vue文件里导入就会自动生效
import {debounce} from "./utils"
import BackToTop from "components/content/backToTop/BackToTop"
export const itemListenerMixin = {
  // 这个看样子是用不上了
  // data() {
  //   return {
  //     itemListener: null
  //   }
  // },
  mounted() {
    // 用常量接收防抖函数，如果直接匿名调用没有常量来接收，那么防抖函数无用
    const scrollRefresh = debounce(this.$refs.scroll.scrollRefresh, 100);
    // 每次开始就监听图片加载，每次加载完毕都重新刷新滚动条以适配图片加载后的新高度
    this.$bus.$on("ImageLoad", () => {
      // 这个的意思是有这个对象的时候调用后面的函数，如果没有，直接不执行，不会再判断后面了
      // 必须要在这里判断，进入函数的时候再判断已经迟了，你已经调用了，再判断有没有这个对象已经来不及了
      // this.$refs.scroll&&this.$refs.scroll.scrollRefresh()
      // 调用防抖函数，似乎在这里就不用判断this.$refs.scroll了
      scrollRefresh();
    });
  }
}
// 由于主页和详情页里都需要backtotop，所以这里也整个抽取
export const backToTopMixin={
  components: {
    BackToTop
  },
  data () {
    return {
      isShowBTT: false,
    }
  },
  methods: {
    bttClick(x, y, time) {
      // console.log(this.$refs.scroll.scroll);
      // 这里直接调用方法，可以少加一次.scroll再拿到data里的scroll，体现一波封装思想
      // 这里的time本来可以给默认值，但是给默认值的话它又不成功，怪事
      this.$refs.scroll.scrollTo(x, y, time);
    },
    bttShow(position){
      this.isShowBTT = position.y < -600;
    }
  }
}