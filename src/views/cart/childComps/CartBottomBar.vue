<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <input type="checkbox" @click="selectAll()" v-model="isCked" />全选
    </div>
    <div class="priceTotal">
      <span class="total">合计:</span>{{ getPriceTotal | filterPrice }}
    </div>
    <div class="account">
      <div v-show="isHas" @click="buyGoods()">结算({{ getShopSum }})</div>
      <div v-show="!isHas" @click="goodsdel()">删除({{ getShopSum }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      isHas: true,
    };
  },
  methods: {
    // 控制删除开关
    eidt(data) {
      this.isHas = data;
    },
    // 全选or取消全选
    selectAll(val) {
      this.$store.dispatch("selectAll", val);
    },
    //结算
    buyGoods() {
      if (this.getShopSum != 0) {
        this.$toast("正在维护中");
      } else {
        this.$toast("没有需要结算商品");
      }
    },
    //删除选中商品
    goodsdel() {
      if (this.getShopSum != 0) {
        this.$store.commit("GoodsDel");
        this.isHas = !this.isHas;
        let d = true;
        this.$bus.$emit("isEidts", d);
      } else {
        this.$toast("请选中需要删除商品");
      }
    },
  },
  computed: {
    ...mapGetters(["getPriceTotal", "getShopSum", "cartLength"]),
    // 全选开关
    isCked: {
      //判断商品全部勾选则自动全选打钩
      //利用购物车商品总数==勾选商品总数相等则打钩
      get() {
        return this.getShopSum == this.cartLength ? true : false;
      },
      set(val) {
        //修改的布尔值传入vuex进而全部or取消勾选商品
        this.selectAll(val);
      },
    },
  },
  mounted() {
    this.$bus.$on("Edit", this.eidt);
  },
  beforeDestroy() {
    this.$bus.$off("Edit");
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 49px;
  background: #fff;
  line-height: 50px;
  z-index: 10;
  box-shadow: 0px -2px 4px #eee;
}

.check-all {
  margin: 0 10px;
}

.check-all input {
  margin-right: 5px;
}

.priceTotal {
  padding: 0 5px;
  margin: 0 10px;
  color: red;
}

.priceTotal .total {
  color: black;
}

.account {
  flex: 1;
  text-align: center;
  background: orangered;
  color: #fff;
}
</style>