<template>
  <div class="tab-cate-content" v-if="showCategoryDetails[0]">
    <goods-list class="goods" :goods="showCategoryDetails"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  name: "TabCateContent",
  components: { GoodsList },
  props: {
    showCategoryDetails: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  background: #fff;
  margin-top: 1px;
}
</style>