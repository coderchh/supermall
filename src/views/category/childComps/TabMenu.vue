<template>
  <scroll id="tab-menu" :probe-type="3" ref="scroll">
    <div class="tab-menu">
      <div
        class="tab-item"
        v-for="(item, index) in categories"
        :key="index"
        @click="clickTabItem(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  components: { Scroll },
  name: "TabMenu",
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    clickTabItem(index) {
      this.currentIndex = index;
      this.$emit("selectIndex", index);
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  /* width: 90px; */
}
.tab-item {
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
  color: #666;
}

.active {
  background: #fff;
  color: #ff5777;
  font-weight: 600;
  border-left: 3px solid #ff5777;
}
</style>