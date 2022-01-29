<template>
  <div class="detail-goods-info" v-if="detailInfo.desc">
    <div class="goods-desc">
      <p>{{ detailInfo.desc }}</p>
      <span>{{ detailInfo.detailImage[0].key }}</span>
    </div>
    <div class="img-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imageLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    //运用节流
    //判断所有图片都加在完了，进行一次回调就可以,就不用频繁刷新
    imageLoad() {
      this.counter++;
      if (this.counter === this.imgLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      //监听图片数组长度
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.detail-goods-info {
  padding-bottom: 0.625rem;
}
.goods-desc {
  padding: 5px 8px;
  font-size: 0.9375rem;
}

.goods-desc p {
  color: #666;
  margin-bottom: 5px;
}

.goods-desc span {
  color: crimson;
  letter-spacing: 2px;
}

.img-list img {
  width: 100%;
  display: block;
}
</style>