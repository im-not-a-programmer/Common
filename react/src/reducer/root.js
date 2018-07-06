import * as types from './types'
import { combineReducers } from 'redux'
import otherReducers from './otherReducers'
import store from 'store2'

// 加载中
function loading(state = {
    show: false
}, action) {
    switch (action.type) {
        case types.LOADING:
            return Object.assign({}, state, {
                show: action.show
            })
        default: return state;
    }
}
// 请求 loading
function dataLoading(state = {
    show: false
}, action) {
    switch (action.type) {
        case types.DATALOADING:
            return Object.assign({}, state, {
                show: action.show
            })
        default: return state;
    }
}
// 请求 load 自定义
function load(state = {
    show: false
}, action) {
    switch (action.type) {
        case types.LOAD:
            return Object.assign({}, state, {
                show: action.show
            })
        default : return state;
    }
}

// 是否登录
function verifyLogin(state = {
    isLogin: store.local.get("token") ? true : false,
    user: store.local.get("token") ? store.local.get("token") : ""
}, action) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
                isLogin: action.isLogin,
                user: action.user
            })
        default: return state;
    }
}

// 面包屑
function breadcrumb(state = {
    data: []
}, action) {
    switch (action.type) {
        case types.BREADCRUMB:
            return Object.assign({}, state, {
                data: action.breadcrumb
            })
        default: return state;
    }
}

// 快捷导航
function menuTab(state = {
    data: []
}, action) {
    switch (action.type) {
        case types.MENUTAB:
            return Object.assign({}, state, {
                data: action.menuTab
            })
        default: return state;
    }
}

// 当前所在路由
function linkData(state = {
    data: []
}, action) {
    switch (action.type) {
        case types.LINKDATA:
            return Object.assign({}, state, {
                data: action.path
            })
        default: return state;
    }
}

export default combineReducers({
    loading,
    verifyLogin,
    breadcrumb,
    menuTab,
    linkData,
    dataLoading,
    load,
    ...otherReducers // 其他需要增加的reducers
})
