<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      v-show="isTabFixed"
      @tabClick="tabClick"
      ref="tabControls"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
//公共组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { itemListenerMixin } from "common/mixin.js";
import { getHomeMultidata, getHomeGoods } from "network/home.js";
/* import { debounce } from "common/utils.js"; */

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  // 监听事件总线中商品图片全部加载完成
  // 运用函数防抖动
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveScrollY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //#region
  /* mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);

    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  }, */
  //#endregion
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveScrollY, 0);
  },
  deactivated() {
    // 离开时获取当前所在高度并储存起来
    this.saveScrollY = this.$refs.scroll.getScrollY();
    // 取消首页事件总线的监听，与详情页的推荐数据列表区分开
    this.$bus.$off("itemImgLoad", this.itemImgListener);
    // console.log("home deactivated");
  },

  methods: {
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //获取到的数据push到goods的list
        this.goods[type].list.push(...res.data.list);
        //页码+1
        this.goods[type].page += 1;
        //到底部上拉刷新,完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    //事件监听相关的方法

    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];

      //同步吸顶效果的tabControls下标选择
      this.$refs.tabControls.currentIndex = index;
      //同步吸顶效果的tabControl下标选择
      this.$refs.tabControl.currentIndex = index;
      //切换分类时，返回商品推荐头部
      this.$refs.scroll.scrollTo(0, -this.$refs.tabControl.$el.offsetTop, 0);
    },
    //#region
    /* tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    }, */
    //#endregion

    //组件不能直接监听点击，如果想监听则要加事件修饰符.native
    //返回首页顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600);
    },

    contentScroll(position) {
      //判断返回顶部按钮是否显示
      this.isShowBackTop = -position.y > 1000;

      //通过判断高度决定是否开启吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
  },
};
</script >

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* 解决中间内容高度显示问题方法一(老师使用的方法) */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 解决中间内容高度显示问题方法二 */
/* #home {
  height: 100vh;
  padding: 44px 0 49px 0;
}

.content {
  height: 100%;
} */

/* 解决中间内容高度显示问题方法三 */
/* .content {
  height: calc(100% - 99px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
