<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :goodsItem="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  comments: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: var(--color-background);

  padding: 2px;
}
</style>