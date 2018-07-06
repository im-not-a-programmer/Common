import ajax from 'axios'
import { message } from "antd";
import store from "store2";
import md5 from "md5";
import _ from "underscore";
import action from "../store";
import { dataLoading, load } from '../actions/rootActions';

const axios = ajax.create({
    headers: {
        // 'token': store.local.get("token") || ''
        "Content-Type": "application/json;charset=UTF-8"
    },
    transformRequest: [function (data) {
        return data ? JSON.stringify(data) : data;
    }]
});

// 请求发出前拦截器
axios.interceptors.request.use(config => {
    const { data } = config;
    const token = store.local.get("token") || store.session.get("token");
    config.headers.token = token || ''; // 获取 token 设置header
    let _loading = false;
    if (data) _loading = data._loading;
    if (config._loading) _loading = config._loading;
    if (_loading === true) action.dispatch(dataLoading(true));
    if (_loading === "custom") action.dispatch(load(true));
    return config;
}, (err) => {
    console.log('请求发送失败-跳转500页面')
    action.dispatch(load(false));
    action.dispatch(dataLoading(false));
    message.error("服务器内部错误");
    return Promise.reject(err);
});

// 返回拦截器 用于处理数据
axios.interceptors.response.use(res => {
    const { config, data } = res;
    let _loading = false;
    if (config.data) _loading = JSON.parse(config.data)._loading;
    if (config._loading) _loading = config._loading;
    if (_loading === true) action.dispatch(dataLoading(false));
    if (_loading === "custom") action.dispatch(load(false));
    if (data.code === "SUCCESS") {
        const _cache = config.data ? JSON.parse(config.data)._cache : false;
        if (config._cache || _cache) { // 是否设置缓存
            let secretKey = config.url;
            if (config.params && !_.isUndefined(config.params)) secretKey += JSON.stringify(config.params);
            if (config.data && !_.isUndefined(config.data)) {
                const datas = JSON.parse(_.clone(config.data));
                delete datas._cache;
                if (!_.isEmpty(datas)) secretKey += JSON.stringify(datas);
            }
            let rcList = [], id = md5(secretKey);
            const resCache = store.session.get('request_cache') || [];
            rcList = _.filter(resCache, val => {
                return val.id !== id;
            });
            rcList.push({data: res.data, id});
            store.session.set('request_cache', rcList);
        }
        const _msg = config.data ? JSON.parse(config.data)._msg : false;
        if (config._msg || _msg) message.success(data.message ? data.message : data.msg)
        return data;
    };
    message.error(data.message ? data.message : data.msg);
    return Promise.reject(data.message ? data.message : data.msg);
}, (err) => {
    action.dispatch(dataLoading(false));
    action.dispatch(load(false));
    message.error("服务器内部错误");
    return Promise.reject(err);
});

export default axios;