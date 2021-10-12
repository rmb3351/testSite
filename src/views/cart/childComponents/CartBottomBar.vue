<template>
  <div class="cart-bottom-bar">
    <div>
      <check-button 
      :is-checked="isCheckedAll"
       class="check-button"
        @click.native="checkAll"> </check-button>
      <div>全选</div>
    </div>
    <div class="show-price">合计：{{ totalPrice }}</div>
    <span class="show-count" @click="pay">去结算({{purchaseCount}})</span>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cart"]),
    // 计算总价
    totalPrice() {
      return (
        // 首先用过滤器过滤，只留下被选中的商品
        "￥" +this.cart.filter((item) => {
            return item.checked;
            // 然后进行汇总，初始值为0，把过滤剩下的item的价格和数量相乘，存入preValue，再进行下次操作
          }).reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0).toFixed(2)
      );
    },
    purchaseCount(){
      return this.cart.filter(item => item.checked).length
    },
    isCheckedAll(){
      // 空车默认不全选
      if(this.cart.length==0) return false
      // 只要找到有没选中的就返回false
      return !this.cart.find(item => !item.checked)
    }
  },
  methods: {
    checkAll(){
      // 注意这里不能简写，如果直接简写成check=!isCheckedAll会有bug
      // 因为isCheckedAll和item.checked挂钩，改着改着自己变了
      if(this.isCheckedAll){
        // 对数组里每个元素进行参数函数的操作
        this.cart.forEach(item => item.checked=false)
      }else{
        this.cart.forEach(item => item.checked=true)
      }
    },
    pay(){
      if(this.purchaseCount==0){
        this.$toast.show("请先选择要购买的商品")
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background: #eee;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}
.cart-bottom-bar div {
  display: flex;
  align-self: center;
  margin-right: 5px;
}
.check-button {
  flex: 1;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.show-price{
  flex: 1;
  margin-left: 10px;
}
.show-count{
  height: 40px;
  width: 90px;
  background: crimson;
  color: #eee;
  margin-right: 0;
  padding-top: 10px;
  text-align: center;
  font-size:14px;
}
</style>
