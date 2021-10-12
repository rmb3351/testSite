<template>
  <div>
    <nav-bar class="content">
      <!-- 记得插槽在正常使用的时候标签名不要打slot，不然样式都无法生效 -->
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick" />
      </div>
      <div slot="center" class="title">
        <div 
        v-for="(item, index) in choices" 
        class="choice" 
        @click="choiceClick(index)"
        :class="{isChosen:index==currentIndex}"
        :key="index">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      choices: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods: {
    choiceClick(index){
      this.currentIndex=index
      this.$emit("NavBarClick",index)
    },
    backClick(){
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
/* 想要平分flex布局必须是子控件设置flex属性，父控件设置display属性 */
.choice {
  flex: 1;
}
.isChosen{
  color:var(--color-high-text);
}
.content img{
  margin-top: 12px;
  width: 30%;
}
</style>
