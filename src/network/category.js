import { request } from "./request"

//左侧分类数据
export function getCategory() {
    return request({
        url: "/category"
    })
}

//右侧分类数据
export function getSubcategory(maitKey) {
    return request({
        url: "/subcategory",
        params: {
            maitKey
        }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}