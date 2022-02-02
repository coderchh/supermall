<template>
  <div class="profile-balance">
    <div class="item" v-for="(item, index) in list" :key="index">
      <p>
        <span>{{ item.price }}</span
        >{{ item.unit }}
      </p>
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileBalance",
  data() {
    return {
      list: [
        {
          price: "0",
          text: "我的余额",
          unit: "元",
        },
        {
          price: "0",
          text: "我的优惠",
          unit: "个",
        },
        {
          price: "0",
          text: "我的积分",
          unit: "分",
        },
      ],
    };
  },
};
</script>

<style scoped>
.profile-balance {
  display: flex;
  background: #fff;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
}

.item:nth-child(2) {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

.item p {
  padding: 2px 0;
  font-size: 13px;
  color: #666;
}

.item p span {
  font-size: 20px;
  font-weight: bold;
  color: #ff5f3e;
}
</style>