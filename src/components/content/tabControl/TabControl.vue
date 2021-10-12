<template>
  <div class="tab-control">
    <!-- 点击哪个聚焦在哪个就是以前的操作，获取点击的下标，和当前下标一致时触发isActive样式 -->
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="{ isActive: index == currentIndex }"
    >
      <span>
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex:0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index){
      // 这里就不改了，在home.vue里为了让tabcontrol展示出吸顶的效果已经统一改了
      // this.currentIndex=index
      // 这里被点击后提交事件给父级元素,这样其他元素也好知道是哪个标签被点击
      this.$emit("tabClick", index)
    }
  }
};
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  /* 不设置背景颜色的话，标签的背景会是透明的 */
  background: #fff;
  text-align: center;
  font-size: 15px;
   /* 这个属性可以让元素在移动到某个位置时定死，下面限制了它的高度
   最后设置在最外层的元素内，因为它直接和别的元素起相互作用 */
  /* position: sticky;
  top: 44px;
  z-index: 9; */
}
.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}
.isActive{
  color:var(--color-high-text);
}
/* 下划线加在span里和加在div里的长短效果不一，这里要短的，所以加在span里 */
.isActive span{
  border-bottom: 3px solid var(--color-tint);
}

</style>
