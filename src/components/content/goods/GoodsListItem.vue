<template>
  <div class="goods-item" @click="itemClick">
    <!-- 这个load可以监听到图片加载完成 -->
    <img v-lazy="imgSource" alt="" @load="loadImage" />
    <div class="goods-info">
      <!-- title是商品名称详情、cfav是收藏数量 -->
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    loadImage(){
      // 通过$bus进行通信（事件总线），前提是在main.js里有vue原型的$bus实例
      this.$bus.$emit("ImageLoad")
    },
    itemClick(){
      // 根据不同的iid跳转到不同的页面
      this.$router.push("/detail/"+this.goodsItem.iid)
    }
  },
  computed: {
    // 由于首页的goodslist和详情页的recommends的图片数据来源不同，而goodslist又被复用了
    // 所以这里有必要判断一下图片的来源，然后计算属性返回
    imgSource(){
    //  关于这里的顺序，先放goodsItem.image没问题
    // 如果先放.show.img，在recommend里会因为找不到.show而报错，而不是逻辑运算符||的顺序导致报错
    // 因为光是.show就已经是undefined了，还在一个undefined的.show下面找.img，当然会报错
    // 可以改成以下两种写法
    // return this.goodsItem.show&&this.goodsItem.show.img || this.goodsItem.image
    // 语法糖：show?.img会翻译成 if(show !=undefined) {show.img}
    return this.goodsItem.show?.img||this.goodsItem.image
    }
  }
};
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img{
  width: 100%;
  /* 圆角边框，值越大元素的四个角越圆 */
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  /* overflow 属性规定当内容溢出元素框时发生的事情。 */
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  /* 文本溢出时显示省略号，clip属性是不显示 */
  text-overflow: ellipsis;
  /* white-space 属性设置如何处理元素内的空白。这里是不换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
/* 在collect前插入内容,这里正常是一个：，但是好像一个两个没区别 */
.goods-info .collect:before{
  /* 据说这个content必须有，就算是空，否则好像是内容方面的东西都不会显示 */
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
