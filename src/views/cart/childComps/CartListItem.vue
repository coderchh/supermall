<template>
  <div class="cart-item">
    <div class="box">
      <input
        type="checkbox"
        :checked="goodsList.done"
        @change="clickCheck(goodsList.iid)"
      />
    </div>
    <div class="img" @click="toDetail(goodsList.iid)">
      <img :src="goodsList.image" alt="" />
    </div>
    <div class="info">
      <p>{{ goodsList.title }}</p>
      <p style="color: #666">x{{ goodsList.count }}</p>
      <div class="info-text">
        <span class="price">{{ goodsList.price | filterPrice }}</span>
        <div class="count-btn">
          <button @click="subCount(goodsList)">-</button>
          <span> {{ goodsList.count }} </span>
          <button @click="addCount(goodsList)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    goodsList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    clickCheck(iid) {
      this.$store.commit("CHECKCLICK", iid);
    },
    subCount(goodsList) {
      this.$store.commit("SUBCOUNT", goodsList);
    },
    addCount(goodsList) {
      this.$store.commit("ADDCOUNT", goodsList);
    },
    toDetail(iid) {
      this.$router.push({
        name: "Detail",
        params: {
          iid: iid,
        },
      });
    },
  },
};
</script>

<style scoped>
.cart-item {
  width: 100%;
  display: flex;
  overflow: hidden;
  padding: 0 5px;
  margin: 8px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1px #eee;
  background: #fff;
}

.cart-item .box {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.cart-item .box input {
  width: 15px;
  height: 15px;
}

.cart-item .img {
  flex: 1;
  padding: 10px 0;
  margin-right: 5px;
}

.cart-item .img img {
  width: 100%;
  display: block;
  border-radius: 5px;
}

.cart-item .info {
  flex: 3;
  font-size: 0.875rem;
  padding: 5px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.cart-item .info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.info-text {
  display: flex;
  justify-content: space-between;
}

.info-text .price {
  flex: 1;
  font-weight: bold;
  color: crimson;
  font-size: 1rem;
}

.count-btn {
  flex: 1;
  display: flex;
  justify-content: center;
}

.count-btn span {
  display: flex;
  align-items: center;
  margin: 0 12px;
}

.count-btn button {
  width: 30px;
  margin: -7px 0;
  border: none;
  font-weight: bold;
  border-radius: 5px;
}
</style>