<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu
        class="tab-menu"
        :categories="categories"
        @selectIndex="selectIndex"
      ></tab-menu>
      <div class="tabFixd" v-show="isTabFixed">
        <div class="left"></div>
        <tab-control
          class="tab-controls"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControls"
        >
        </tab-control>
      </div>
      <scroll class="tab-content" :probe-type="3" @scroll="contentScroll">
        <tab-cate-list
          :showSubcategory="showSubcategory"
          @listImageLoad="listImageLoad"
        ></tab-cate-list>
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl"
        ></tab-control>
        <tab-cate-content
          :showCategoryDetails="showCategoryDetails"
        ></tab-cate-content>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabMenu from "./childComps/TabMenu.vue";
import TabCateList from "./childComps/TabCateList.vue";
import TabCateContent from "./childComps/TabCateContent.vue";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabCateList,
    Scroll,
    TabControl,
    TabCateContent,
  },
  data() {
    return {
      categories: [], //左侧分类页数据
      categoryData: [], //储存每一个分类的数据
      currentIndex: -1,
      isTabFixed: false, //控制吸顶效果开关
      currentType: "pop",
      tabOffsetTop: 0,
    };
  },
  created() {
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        let data = res.data;
        // 获取右边分类页数据
        this.categories = data.category.list;
        // 初始化每个类别的子数据，将每个数据存入每categoryData对象中
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            // 右边数据分类的列表
            subcategories: {},
            // 商品分类的推荐
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this._getSubcategory();
      });
    },
    // 获取右边分类数据，并将数据存入categoryData中
    _getSubcategory(index = 0) {
      this.currentIndex = index;
      let maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {
          // 刷新categoryData,并存入更新后的数据
          ...this.categoryData,
        };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },
    // 获取分类详情推荐数据
    _getCategoryDetail(type) {
      let miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {
          //刷新categoryData，并存入更新后的数据
          ...this.categoryData,
        };
        // console.log(this.categoryData);
      });
    },
    // 点击左边分类对应显示左边数据
    selectIndex(index) {
      this._getSubcategory(index);
    },
    tabClick(index) {
      this.currentType = Object.keys(this.categoryData[0].categoryDetail)[
        index
      ];

      // let arr = ["pop", "new", "sell"];
      // this.currentType = arr[index];

      //同步吸顶效果的tabControls下标选择
      this.$refs.tabControls.currentIndex = index;
      //同步吸顶效果的tabControl下标选择
      this.$refs.tabControl.currentIndex = index;
      //切换分类时，返回商品推荐头部
      // this.$refs.scroll.scrollTo(0, -this.$refs.tabControl.$el.offsetTop, 0);
    },
    //是否开启吸顶效果
    contentScroll(position) {
      //通过判断高度决定是否开启吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(position.y);
    },
    listImageLoad() {
      // 当图片全部加载成功时当前tabControl所在高度
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      // 第一次加载，获取高度会偏大，所以第一次获取高度后要-44
      if (this.tabOffsetTop === 1047) {
        this.tabOffsetTop = this.tabOffsetTop - 44;
      }
      console.log(this.tabOffsetTop);
    },
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetails() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
  padding: 44px 0 49px 0;
  background: #fff;
}

.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.content {
  display: flex;
  height: 100%;
}

.tab-menu {
  width: 28%;
  z-index: 9;
}

.tab-content {
  flex: 1;
  height: 100%;
  background: #fff;
}

.tabFixd .left {
  width: 28%;
}

.tab-controls {
  flex: 1;
}

.tab-control {
  font-size: 14px;
  color: #666;
}

/* 吸顶样式 */
.tabFixd {
  width: 100%;
  display: flex;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 8;
}
</style>