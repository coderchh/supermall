<template>
  <div class="cart-list">
    <cart-list-item
      v-show="isShowList"
      v-for="(item, index) in cartList"
      :key="index"
      :goodsList="item"
    ></cart-list-item>
    <div class="cart-null" v-show="!isShowList">
      <img src="~assets/img/cart/Shopcart.gif" alt="" />
      <h4>购物车还是空的</h4>
      <p>去挑选几件中意的商品吧(●'◡'●)</p>
      <div class="buttom" @click="goHome">去首页逛逛</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  components: { CartListItem },
  methods: {
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
  },
  computed: {
    ...mapState(["cartList"]),
    isShowList: {
      get() {
        return this.cartList.length > 0 ? true : false;
      },
    },
  },
};
</script>

<style lang="css" scoped>
.cart-list {
  margin: 10px;
}

.cart-null {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
}

.cart-null h4 {
  color: black;
  padding: 8px 0;
}

.cart-null img {
  width: 200px;
}

.cart-null p {
  color: red;
}

.cart-null .buttom {
  border: 1px solid #f04b83;
  padding: 8px 10px;
  color: #f04b83;
  border-radius: 5px;
  margin-top: 15px;
}
</style>