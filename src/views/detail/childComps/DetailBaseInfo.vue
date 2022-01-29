<template>
  <div id="detail-base-info">
    <div class="base-info" v-if="Object.keys(baseInfo).length !== 0">
      <div class="title">{{ baseInfo.title }}</div>
      <div class="price-info">
        <span class="n-price">{{ getRealPrice }}</span>
        <span class="o-price"
          ><del>{{ baseInfo.oldPrice }}</del></span
        >
        <span class="discount" v-if="baseInfo.discount">{{
          baseInfo.discount
        }}</span>
      </div>
      <div class="columns">
        <span>{{ baseInfo.columns && baseInfo.columns[0] }}</span>
        <span>{{ baseInfo.columns && baseInfo.columns[1] }}</span>
      </div>
      <div class="columns service-info">
        <div
          v-for="(item, index) in baseInfo.services"
          :key="index"
          class="service"
        >
          <img :src="baseInfo.services[1].icon" alt="" />
          <span>
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getRealPrice() {
      return "￥" + this.baseInfo.realPrice;
    },
  },
};
</script>

<style scoped>
.base-info {
  font-size: 18px;
  font-weight: bold;
  padding: 8px 10px;
  background: #fff;
}

.title {
  /* 强制英文单词断行 */
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 24px;
  color: #333;
}

.price-info {
  color: #ff6699;
  margin: 10px 0 15px 0;
  font-size: 20px;
}

.o-price {
  color: #999;
  font-weight: normal;
  font-size: 14px;
  margin: 0 3px 0 8px;
}

.discount {
  width: 20px;
  height: 20px;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  padding: 5px 8px;
  background: #ff6699;
}

.columns {
  display: flex;
  color: #999;
  font-weight: normal;
  font-size: 16px;
  justify-content: space-around;
}

.columns span {
  padding: 5px 0;
  flex: 1;
}

.service-info {
  border-top: 1px solid #ccc;
  padding: 5px 0;
  font-size: 14px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.service-info div {
  width: 33.33%;
  padding: 2px 0;
}

.service-info div img {
  width: 10px;
}
</style>