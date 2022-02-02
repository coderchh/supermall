<template>
  <div class="profile-func">
    <div class="func-item" v-for="(item, index) in funcList" :key="index">
      <van-icon class="icon-color" :name="item.icon" size="1.2rem" />
      <p class="right">{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFunc",
  props: {
    funcList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.profile-func {
  padding-left: 15px;
  background: #fff;
  margin: 12px 0;
}

.func-item {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}

.icon-color {
  color: #ff0033;
  margin-top: 12px;
}

.right {
  flex: 1;
  font-size: 15px;
  padding: 10px 0;
  margin-top: 3px;
  margin-left: 8px;
  border-bottom: 1px solid #eee;
  color: black;
}
</style>