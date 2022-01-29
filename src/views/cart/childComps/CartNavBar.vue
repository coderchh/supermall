<template>
  <div class="cart-nav-bar">
    <nav-bar>
      <div slot="center">购物车({{ cartLength }})</div>
      <div slot="right" class="edit" @click="edit">
        <div v-if="isEidt">编辑</div>
        <div v-else>完成</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  components: { NavBar },
  name: "CartNavBar",
  data() {
    return {
      isEidt: true,
    };
  },
  methods: {
    edit() {
      // 控制删除开关,传给CartBottomBar组件
      this.$bus.$emit("Edit", !this.isEidt);
      // 控制编辑/完成开关
      this.isEidt = !this.isEidt;
    },
    isSidts(val) {
      this.isEidt = val;
    },
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  mounted() {
    //接收删除完成后，传过来将完成按钮自动变为编辑
    this.$bus.$on("isEidts", this.isSidts);
  },
  beforeDestroy() {
    this.$bus.$off("isEidts");
  },
};
</script>

<style scoped>
.cart-nav-bar {
  width: 100%;
  height: 44px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: var(--color-tint);
  color: #fff;
}
</style>