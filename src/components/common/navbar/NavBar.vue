<template>
  <div class="nav-bar">
    <!-- 导航栏分为三个部分，分别用具名插槽 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
};
</script>

<style scoped>
  .nav-bar{
    /* 弹性布局，设置了以后就可以在对应的选择器里进行布局分配 */
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex:1;
  }

</style>
