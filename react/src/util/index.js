import _ from "underscore"

/** 获取 router 传参
 * @param { string } str
 * @return { Object } getQuery()
*/
export const getQuery = (str = "") => {
    if (!_.isString(str)) return console.log("请传输字符串");
    const json = {};
    _.each(str.substring(1, str.length).split('&'), item => {
        json[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]);
    });
    return json;
};

/** 遍历router 传参
 * @param { json } json
 * @return { string } setQuery()
*/
export const setQuery = (json = {})=> {
    if (!_.isObject(json) || _.isFunction(json) || json.length) return console.log("请传输json对象");
    let params = [];
    _.mapObject(json, (v, k) => {
        params.push(`${k}=${encodeURIComponent(v)}`);
    });
    return `?${params.join("&")}`;
};


/** 外链跳转
 * @param { Object } {
 *      host: host 不传默认本域
 *      path: url  
 *      params: params
 *  }
*/
export const windowOPen = (config = {}) => {
    const host = _.isUndefined(config.host) ? window.location.host : config.host,
        path = _.isUndefined(config.path) ? "" : config.path,
        params = _.isUndefined(config.params) ? {} : config.params;
    window.open(`${host}${path}${setQuery(params)}`, '_blank');
}

/** 把树形结构展开为一维数组
 * @param { Array } tree 树
 * @param { String } children
 * @return { Array }
*/
const recursion = (data, children) => {
    if (data[children] && data[children].length) {
        const item = _.clone(data);
        delete item.children;
        let datas = [];
        data.children.concat(item).forEach(item => {
            datas = datas.concat(recursion(item, children));
        });
        return datas;
    }
    return data;
};

export const openTree = (tree = [], children = 'children') => {
    let data = [];
    _.each(tree, item => {
        data = data.concat(recursion(item, children));
    });
    return data;
}