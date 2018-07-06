import * as types from '../reducer/types'

export function loading (show) {
    return {
        type: types.LOADING,
        show
    }
}

export function dataLoading (show) {
    return {
        type: types.DATALOADING,
        show
    }
}

export function load(show) {
    return {
        type: types.LOAD,
        show
    }
}

export function verifyLogin (user) {
    return {
        type: types.LOGIN,
        ...user
    }
}

// 面包屑
export function breadcrumb(data) {
    return {
        type: types.BREADCRUMB,
        ...data
    }
}

// 添加快捷导航
export function menuTab(data) {
    return {
        type: types.MENUTAB,
        ...data
    }
}

// 设置当前所在路由
export function setLinkData(data) {
    return {
        type: types.LINKDATA,
        ...data
    }
}
