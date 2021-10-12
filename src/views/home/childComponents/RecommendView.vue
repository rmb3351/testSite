// 轮播图下面推荐页面的vue文件
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
     /* 多个边距设置顺序犹如时钟顺时针，未设置的则为对称方向的值，例如这里是上10下20左右0 */
    padding: 10px 0 20px;
    border-bottom: #eee;
  }
  .recommend-item{
    flex: 1;
  }
  /* 形如选择器下的选择器就用空格隔开 */
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
