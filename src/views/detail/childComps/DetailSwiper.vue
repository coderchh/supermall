<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="(item, index) in topImages"
      :key="index"
      class="swiper-item"
    >
      <img :src="item" alt="" />
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
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  width: 100%;
  height: 18.75rem;
}

/* img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
</style>