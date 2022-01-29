import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null, //控制商品图片加载显示
        }
    },
    mounted() {
        // 监听事件总线中商品图片全部加载完成
        // 运用函数防抖动
        const newrefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            newrefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
}

// 返回顶部
export const backTopMixin = {
    components: {
        BackTop
    },

    data() {
        return {
            isShowBackTop: false, //默认返回顶部按钮隐藏
        }
    },

    methods: {
        backClick() {
            // console.log(this.$refs.scroll);
            this.$refs.scroll.scrollTo(0, 0, 600)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000
        }
    },
}