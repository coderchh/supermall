import { request } from "./request"

// 详情页数据
export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 评论区商品推荐数据
export function getRecommend() {
    return request({
        url: "/recommend"
    })
}

//定义类
//详情页的价格销量等信息
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.realPrice = itemInfo.lowNowPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
    }
}

//商品详情页店铺信息及评分
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

// 商品详情页商品参数
export class GoodsParam {
    constructor(info, rule) {
        //image可能没有值（某些商品有值，某些没有值）
        this.image = info.image ? info.image[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}