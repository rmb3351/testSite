<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name:'Toast',
  data(){
   return {
     message:"",
     isShow:false
   }
  },
  methods: {
    show(message="默认文本",duration=2000){
      // 先改文本然后显示
      this.message=message
      this.isShow=true
      // 过了duration以后再清除文本然后隐藏
      setTimeout(() => {
        this.message=""
        this.isShow=false
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  /* 距离上顶部和左边缘都是50% */
  top: 50%;
  left: 50%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.8);
  /* 把左上角的x坐标和y坐标各减少50%边长，即定位到正中心 */
  transform: translate(-50%,-50%);
  color: white;
  /* 让内容距离元素边框10，即背景颜色覆盖范围大点 */
  padding: 10px;
}

</style>
