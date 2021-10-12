<template>
  <div class="cart-list">
      <div>
        <cart-list-item
          v-for="(item, index) in cart"
          :key="index"
          :purchase="item"
        ></cart-list-item>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  components: {
    CartListItem,
  },
};
</script>

<style scoped>
</style>
