<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          :class="{ itemActive: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props: {
    themeTopYs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      if (this.themeTopYs.length == 0) {
        this.$toast.fail({
          message: "数据加载中",
          forbidClick: true,
        });
        return;
      }
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    //监听点击，设置返回按钮
    backClick() {
      //后退
      this.$router.back();
      // this.$router.go(-1)
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  /* space-evenly可以使每个元素之间和元素距离边距的距离都相等 */
  justify-content: space-evenly;
  /* font-size: 1rem;
  font-weight: 500; */
}

.back img {
  margin-top: 11px;
}

.itemActive {
  color: var(--color-high-text);
}
</style>