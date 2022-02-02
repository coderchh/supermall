<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <profile-login></profile-login>
    <profile-balance></profile-balance>
    <profile-func :funcList="funcList"></profile-func>
    <profile-func :funcList="funcLists"></profile-func>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import ProfileBalance from "./childComps/ProfileBalance.vue";
import ProfileLogin from "./childComps/ProfileLogin.vue";
import ProfileFunc from "./childComps/ProfileFunc.vue";

export default {
  name: "Profile",
  components: { NavBar, ProfileLogin, ProfileBalance, ProfileFunc },
  data() {
    return {
      funcList: [
        {
          icon: "chat-o",
          text: "我的消息",
        },
        {
          icon: "gem",
          text: "积分商城",
        },
        {
          icon: "vip-card",
          text: "我的会员",
        },
      ],
      funcLists: [
        {
          icon: "cart",
          text: "我的购物车",
        },
        {
          icon: "share",
          text: "分享好友",
        },
        {
          icon: "setting-o",
          text: "设置",
        },
      ],
    };
  },
};
</script>

<style scoped>
#profile {
  background-color: #eee;
}

.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>