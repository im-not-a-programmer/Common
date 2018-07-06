import _ from "underscore"
import http from "http"
import * as api from "api"
import { openTree } from "./index"

/** 匹配字典
 * @param { Array | String } key 要匹配字典的key
 * @param { Array } code 匹配字典对应值
 * @return { Promise }
 * 例： filterDic(['aaKey', 'bbKey'], ['aaCode', 'bbCode])
 * filterDic(['aaKey', 'bbKey'], 'code')
 * filterDic(['aaKey', 'bbKey'])
*/

export const filterDic = async (code = [], key = "parentCode") => {
    if (_.isUndefined(code)) return console.log("请传入对应的code");
    const { data } = await http.post(api.POST_SYS_PTYDICT_PAGE, {
        pageSize: 100000,
        pageNo: 1,
        _cache: true
    });
    if (!_.isArray(code)) return [];
    return _.map(code, (item, index) => {
        let json = {};
        _.isArray(key) ? json[key[index]] = item : json[key] = item;
        return {
            code: item,
            data: _.where(data, json)
        };
    });
}

/** 获取 Cascader 需要的地址信息
 * @return { Promise } 
*/

const mapCity = (item = []) => {
    return _.map(item, items => {
        items.label = items.geoName;
        items.value = items.geoIdcode;
        if (items.children) items.children = mapCity(items.children);
        return items;
    });
};

export const address = async () => {
    const { data } = await http.post(api.POST_PROD_CMNGEO_QUERYLIST, {
        _cache: true
    })
    return mapCity(data);
};

/** 获取对应key的地址信息
* @param { Array } keyArr 需要过滤的数据集合
* @param { String } children 需要递归数组子级的key 不传默认 children
* @param { String | Number } code 对应 keyArr 不传默认geoIdcode
* @param { String } label 不传默认返回所有字段 => 想要的字段 如name，key。。。。
* @return { Array }
*/

export const filterAddress = async (
    keyArr = [],
    label,
    code = "geoIdcode",
    children = "children"
) => {
    const data = await address();
    if (!_.isArray(keyArr)) return console.log("对应原始数组的key 必须是一个 Array");
    if (keyArr.length <= 0) return [];
    const datas = openTree(data);
    return _.map(keyArr, item => {
        return  {
            code: item.code,
            data: _.map(item.data, v => {
                let h;
                datas.forEach(items => {
                    if (v === items[code]) h = label ? items[label] : items;
                });
                return h;
            })
        };
    });
};
