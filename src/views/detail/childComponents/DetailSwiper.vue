<template>
  <swiper class="detailswiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" @load="swiperLoad" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
  ,
  data() {
    return {};
  },
  methods: {
    swiperLoad(){
      this.$emit("swiperLoad")
    }
  }
};
</script>

<style scoped>
.detailswiper{
 height: 300px;
 overflow: hidden;
}
</style>
