// 直接对betterscroll进行封装，原因还是和之前一样，如果要换代或者复用都可以直接在这里操作
<template>
  <div ref="scroll">
    <div >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
// 本来说要导入这个，但是实测似乎也不用
// import PullUp from "@better-scroll/pull-up"
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    // 由于在不同界面需要的监听滚动的类型不同，所以干脆把这个放在props里
    // 这样在不同界面的scroll里可以各自决定监听类型
    probetype: {
      type: Number,
      default: 0,
    },
    pullupload:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    // 既然是回到顶部，干脆不让传参了，默认回到顶部，这个time指的是回到顶部用时，不加就是瞬移
    // 封装是为了到时候使用的时候不用先取到scroll对象再取到这个data的scroll再调用方法
    scrollTo(x=0,y=0,time=500) {
      this.scroll.scrollTo(x, y, time);
    },
    // 还是一样的封装思想
    finishPullUp(){
      // 自带有结束上拉方法，只有结束了上拉才能在下次上拉时继续加载数据
      this.scroll.finishPullUp()
    },
    scrollRefresh(){
      console.log("refresh");
      this.scroll.refresh()
    },
    getScrollY(){
      // 有scroll实例就返回它的y，否则返回0
      return this.scroll ? this.scroll.y : 0
    }
  },
  // mounted () {
  // 新版本要求pullingUp要使用的话就必须按照这个方法先安装，在这里安装后在updated里使用完事
  // 但是实测好像并不需要
  // BetterScroll.use(PullUp)
  //   this.scroll = new BetterScroll(this.$refs.scroll,{
  //     probeType:3,
  //     mouseWheel:true,
  //     pullUpLoad:true
  //   })
  //   // this.scroll.on("scroll",(position) => {
  //   //   console.log(position);
  //   // })
  //   this.scroll.on("pullingUp", () => {
  //     console.log("上拉加载更多");
  //   })
  // },
  // 由于mounted生命周期在刷新或者重新加载当前页面时会失效，所以干脆在这里操作
  // updated似乎是原罪，改成mountde了以后无事了
  mounted () {
    this.scroll = new BetterScroll(this.$refs.scroll, {
      click: true,
      // 开启鼠标拖动和手指触摸
      disableMouse:false,
      disableTouch:false,
      probeType: this.probetype,
      mouseWheel: true,
      // 这个配置用于做上拉加载功能，当设置为 true或者是一个Object的时候，可以开启上拉加载
      // 这里干脆也不写死了，有些页面可以实现上拉加载更多，有些不实现
      pullUpLoad: this.pullupload
    });
    // this.scroll.refresh()
    // 监听之前加入判断，优化
    if(this.probetype==2 || this.probetype==3){
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        // 把位置提交出去
        this.$emit("scroll", position)
      });
    }
    if(this.pullupload){
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp")
      });
    }
  },
};
</script>

<style scoped>

</style>
