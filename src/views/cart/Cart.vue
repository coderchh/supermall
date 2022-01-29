<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="2">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar v-if="cartList.length"></cart-bottom-bar>
  </div>
</template>

<script>
import CartNavBar from "./childComps/CartNavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import { mapState } from "vuex";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    ...mapState(["cartList"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
  padding: 44px 0 120px 0;
  background: #fff;
}

.content {
  height: 100%;
}
</style>