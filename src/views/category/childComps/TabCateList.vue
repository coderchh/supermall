<template>
  <div class="tab-cate-list" v-if="showSubcategory">
    <a
      :href="item.link"
      class="item"
      v-for="(item, index) in showSubcategory.list"
      :key="index"
    >
      <img :src="item.image" alt="" @load="imageLoad" />
      <span>{{ item.title }}</span>
    </a>
  </div>
</template>

<script>
/* import { throttle } from "common/utils.js"; */
export default {
  name: "TabCateList",
  props: {
    showSubcategory: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  mounted() {},
  methods: {
    imageLoad() {
      // 节流发送自定义事件
      if (!this.isLoad) {
        setTimeout(() => {
          this.$emit("listImageLoad");
          this.isLoad = false;
        }, 200);
      }
      this.isLoad = true;
    },
  },
};
</script>

<style scoped>
.tab-cate-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  background-color: #fff;
}

.item {
  width: 32%;
  margin-top: 2%;
  margin-right: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.item:nth-child(3n) {
  margin-right: 0;
}

.item img {
  width: 80%;
  margin-bottom: 10px;
}
</style>