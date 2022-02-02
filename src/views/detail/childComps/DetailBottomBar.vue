<template>
  <div class="bottom-bar">
    <div class="bar-item">
      <span>店铺</span>
      <span>客服</span>
      <span>收藏</span>
    </div>
    <div class="bar-cart">
      <span @click="addToCart">加入购物车</span>
      <span @click="buyNow">立即购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    },
    buyNow() {
      this.$toast("正在维护中");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: #fff;
  box-shadow: 0px 0px 4px 0px #ccc;
  color: #666;
  font-size: 15px;
}

.bar-item {
  display: flex;
  align-items: center;
}

.bar-item span {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
}

.bar-item span:nth-child(2) {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.bar-cart {
  height: 49px;
  line-height: 49px;
  flex: 1;
  display: flex;
  text-align: center;
}

.bar-cart span {
  flex: 1;
  border: none;
  font-size: 15px;
  background: yellowgreen;
  color: #fff;
  padding: 0 5px;
}

.bar-cart span:nth-child(2) {
  background: orange;
}
</style>