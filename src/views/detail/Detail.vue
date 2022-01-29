<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :themeTopYs="themeTopYs"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 价格等信息 -->
      <detail-base-info :baseInfo="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- @imageLoad监听详情页商品图片加载 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!-- 参数页 -->
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <!-- 评论信息 -->
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 商品推荐数据 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { debounce } from "common/utils.js";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}, //详情页价格的一些信息
      shop: {}, //详情页店铺信息
      detailInfo: {}, //商品介绍及图片展示
      paramInfo: {}, //商品参数信息
      commentInfo: {}, //评论信息
      recommends: [], //商品推荐数据
      /* itemImgListener: null, */
      themeTopYs: [], //储存商品，参数，评论等高度位置
      getThemeTopY: null, //运用防抖测高度
      currentIndex: 0, //记录下标
    };
  },
  created() {
    //获取传入的iid
    this.iid = this.$route.params.iid;

    //根据传入iid请求不同内容详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //获取商品详情信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //获取商品的详情展示页内容
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求商品推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    //运用防抖，等待图片加载完获取高度,提高性能
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },

  //#region
  /* mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    console.log("1");
  }, */
  //#endregion
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll && this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      // 判断是否显示返回顶部按钮
      this.listenShowBackTop(position);
      // console.log(position);
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      //#region
      // 跟主题中的值进行对比,从而内容滚动到相应的位置，标题相应变红
      // this.currentIndex !== i 防止赋值过程过于频繁
      // 普通做法
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this
      //       .themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      //#endregion
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTopYs[i];
        if (positionY >= iPos && positionY < this.themeTopYs[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
          break;
        }
      }
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;

      // 将商品添加到购物车里
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}

#detail {
  position: relative;
  z-index: 10;
  background: #fff;
  height: 100vh;
  padding: 44px 0 55px 0;
}

.detail-nav {
  width: 100%;
  height: 44px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background: #fff;
}
</style>