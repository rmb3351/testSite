<template>
  <div class="back-to-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackToTop',
  data(){
   return {

   }
  }
}
</script>

<style scoped>
.back-to-top{
  position: fixed;
  right: 6px;
  bottom: 55px;
  z-index: 11;
}
.back-to-top img{
  /* 这里用百分比的话，会预留剩下百分比的空间，所以实际位置还是有问题，还是要定死宽高 */
  width: 43px;
  height: 43px;
}

</style>
