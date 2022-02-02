<template>
  <div
    class="detail-param-info"
    v-if="Object.keys(paramInfo).length !== 0 && paramInfo.sizes"
  >
    <ul
      class="param-list"
      v-for="(size, index) in paramInfo.sizes"
      :key="index"
    >
      <li v-for="(x, indey) in size" :key="indey">
        <span v-for="(y, indez) in x" :key="indez">{{ y }} </span>
      </li>
    </ul>

    <ul class="param-list param2">
      <li v-for="(item, index) in paramInfo.infos" :key="index">
        <span>{{ item.key }}</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.detail-param-info {
  background: #fff;
  padding: 8px;
}

.param-list {
  display: flex;
  flex-direction: column;
}
.param-list li {
  display: flex;
  flex-direction: row;
  padding: 8px 0;
  font-size: 16px;
  color: 666;
  font-weight: normal;
  border-bottom: 1px solid #ccc;
}

.param-list li span {
  flex: 1;
  /* text-align: center; */
}

.param2 li span {
  flex: 1;
  word-wrap: break-word;
  word-break: break-all;
}

.param2 li span:last-child {
  flex: 3;
  color: #ff6699;
}
</style>