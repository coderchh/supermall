<template>
  <div class="shop">
    <div class="shop-head">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="shop-info">
      <div class="shop-left">
        <div>
          <span>{{ shop.sells | sellCountFilter }}</span>
          <span>总销量</span>
        </div>
        <div>
          <span>{{ shop.goodsCount }}</span>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="shop-right">
        <p v-for="(item, index) in shop.score" :key="index">
          <span> {{ item.name }}</span>
          <span :style="{ color: item.isBetter ? 'red' : 'green' }"
            >{{ item.score }}
          </span>
          <span :style="{ color: item.isBetter ? 'red' : 'green' }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </p>
      </div>
    </div>
    <button>进店逛逛</button>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    //过滤器
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";

      /* if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(1) + "万";
      } */
    },
  },
};
</script>

<style>
.shop {
  background: #fff;
  border-top: 6px solid #eee;
  /* margin-top: 8px; */
  padding: 20px;
  margin-bottom: 10px;
  border-bottom: 3px solid #eee;
}

.shop-head {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 15px;
}

.shop-head img {
  width: 55px;
  margin-right: 15px;
  display: block;
}

.shop-info {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  color: #666;
}

.shop-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.shop-left div {
  flex: 1;
  text-align: center;
}

.shop-left span {
  display: block;
}

.line {
  height: 60px;
  width: 2px;
  background: #ccc;
}

.shop-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding-left: 1.5625rem; */
}

.shop-right p {
  display: flex;
  text-align: center;
}

.shop-right p span {
  flex: 1;
}

.shop-right p span:first-child {
  flex: 2;
}

.shop-right p span:nth-child(2) {
  text-align: left;
}

button {
  width: 100px;
  padding: 8px 10px;
  border: none;
  border-radius: 10px;
  margin: 20px auto 5px;
  display: block;
  color: #666;
}
</style>