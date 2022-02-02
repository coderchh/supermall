<template>
  <div class="profile-login">
    <div class="user-avatar">
      <img src="~assets/img/profile/avatar.svg" alt="" />
    </div>
    <div class="login">
      <p>登录/注册</p>
      <p><van-icon name="phone-o" size="16px" />暂无绑定手机号</p>
    </div>
    <div class="arrow">
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileLogin",
};
</script>

<style scoped>
.profile-login {
  display: flex;
  padding: 15px 10px;
  justify-content: center;
  align-content: center;
  background: #ff0033;
  color: #fff;
}

.user-avatar {
  margin: 0 10px;
}

.user-avatar img {
  width: 60px;
  margin-top: 2px;
}

.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 15px;
}

.arrow {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>