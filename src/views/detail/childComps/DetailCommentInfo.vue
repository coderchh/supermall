<template>
  <div class="comment">
    <div class="title">
      <span>用户评论</span>
      <span>查看更多</span>
    </div>
    <template v-if="commentInfo.user">
      <div class="user-img">
        <img :src="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>

      <div class="text">
        <p>{{ commentInfo.content }}</p>
        <div class="img">
          <img
            v-for="(i, index) in commentInfo.images"
            :key="index"
            :src="i"
            alt=""
          />
        </div>
        <p class="p-text">
          <span v-for="item in commentInfo.extraInfo" :key="item">{{
            item
          }}</span>
        </p>
        <p class="p2-text">
          <span>{{ commentInfo.created | timeFormater }}</span>
          <span>{{ commentInfo.style }}</span>
        </p>
        <p style="color: crimson">{{ commentInfo.explain }}</p>
      </div>
    </template>
    <div v-else>对不起！暂时没有评论！^_^</div>
  </div>
</template>

<script>
const dayjs = require("dayjs");
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  watch: {
    //开启深度监听，否则commentInfo.user.avatar及uname会报错
    commentInfo: {
      immediate: true, //初始化时让handler调用一下
      deep: true,
      handler() {},
    },
  },
  filters: {
    timeFormater(value, str = "YYYY-MM-DD HH:mm") {
      // console.log('@',value)
      return dayjs(value).format(str);
    },
  },
};
</script>

<style scoped>
.comment {
  padding: 8px 10px;
  font-size: 0.9375rem;
  margin-top: 10px;
  color: #666;
  background: #fff;
}

.title {
  display: flex;
  padding: 8px 0;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.user-img {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.user-img img {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.text {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.p-text {
  display: flex;
  flex-direction: row;
  margin: 2px 0;
}

.text p {
  word-wrap: break-word;
  word-break: break-all;
  margin: 4px 0;
}

.p-text span {
  flex: 1;
  color: #999;
}

.text p:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.text .p2-text {
  display: flex;
}

.text .p2-text span {
  margin-right: 8px;
  font-size: 14px;
}

.text .p2-text span:last-child {
  margin-right: 0;
}

.img {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.img img {
  width: 30%;
  border-radius: 5px;
  margin: 8px 8px 8px 0;
}
</style>