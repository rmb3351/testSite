<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data() {
    return {
      // 一般选中和未选中都是在模型对象里定义属性确定的，所以这里改写法
      // isChecked:true
    };
  },
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    // ckbClick(){
    //   // this.isChecked=!this.isChecked
    //   // console.log("ckb  "+this.isChecked);
    // }
  }
};
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: solid 2px #aaa;
  align-self: center;
}
.check{
  background: orangered;
  border-color: orangered;
}

</style>
