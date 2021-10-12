<template>
  <div class="goods">
    <!-- 不仅要根据item遍历goods创建goodslistitem，还要把每个item传进去，以便拿到数据分别使用 -->
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue"
export default {
  name:'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    // 数据在home组件里创建实例时通过传递props获取
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /* 这里如果不设置wrap的话，所有内容集中在一行全部收缩，根本没法看
  而且这个属性效果和子组件的width有关，可以配合来使用 */
  flex-wrap: wrap;
  /* 这里相当于给每个子组件自带一层透明的边，这样到边缘的距离会是组件之间的二分之一 */
  justify-content: space-around;
  /* 这里是为了微调到边缘的距离和组件间距离的差距效果 */
  padding: 2px;
}

</style>
