import Vue from "vue"
import Vuex from "vuex"
import { Toast } from "vant"

Vue.use(Vuex)

const state = {
    // cartList: []
    // JSON.parse将JSON字符串转换成对象
    cartList: JSON.parse(localStorage.getItem('cartList')) || [], //储存购物车添加的商品数据
}

const actions = {
    addCart(context, payload) {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
            context.commit('ADDCOUNTER', oldProduct)
            Toast.fail('已存在该商品!')
        } else {
            payload.count = 1
            payload.done = false
            context.commit('ADDTOCART', payload)
            Toast.success('添加成功！');
        }
    },
    selectAll(context, val) {
        context.commit("ALLCHECKTODO", val)
    }
}

const mutations = {
    ADDCOUNTER(state, payload) {
        payload.count++
    },
    ADDTOCART(state, payload) {
        state.cartList.push(payload)
        localStorage.setItem("cartList", JSON.stringify(state.cartList))
    },
    //购物车选中商品/单选
    CHECKCLICK(state, iid) {
        state.cartList.forEach(item => {
            if (item.iid === iid) item.done = !item.done
        });
    },
    //全选or取消全选商品
    ALLCHECKTODO(state, val) {
        state.cartList.forEach(item => item.done = val)
    },
    SUBCOUNT(state, payload) {
        state.cartList.forEach(item => {
            if (item.iid === payload.iid) {
                if (item.count > 1) {
                    item.count--
                } else {
                    return item.count
                }
            }
        })
        localStorage.setItem("cartList", JSON.stringify(state.cartList))
    },
    ADDCOUNT(state, payload) {
        state.cartList.forEach(item => {
            if (item.iid === payload.iid) {
                item.count++
            }
        })
        localStorage.setItem("cartList", JSON.stringify(state.cartList))
    },
    //删除选中商品
    GoodsDel(state) {
        state.cartList = state.cartList.filter(item => {
            return item.done != true
        })
        localStorage.setItem("cartList", JSON.stringify(state.cartList))
        Toast('删除成功！')
    }
}

const getters = {
    //计算在购物车中的商品总数
    cartLength(state) {
        let length = state.cartList.length
        return length
    },
    cartList(state) {
        return state.cartList
    },
    //计算购物车选中商品总价格
    getPriceTotal(state) {
        // 方法一 求商品总价格 使用reduce高阶函数
        let total = state.cartList.filter(item => {
            return item.done
        }).reduce((preValue, item) => {
            return preValue + Number(item.price) * item.count
        }, 0)
        return total
            // 方法二
            // let total = 0
            // state.cartList.forEach(item => {
            //   if (item.done) {
            //     total += (Number(item.price) * item.num)
            //   }
            // })
            // return total
    },
    // 计算购物车选中商品数量
    getShopSum(state) {
        // 方法二
        let arrNum = state.cartList.filter(item => {
            return item.done
        })
        return arrNum.length
            // return arrNum
            // 方法一
            // let total = 0
            // state.cartList.forEach(item => {
            //   if (item.done) {
            //     total += 1
            //   }
            // })
            // return total
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})