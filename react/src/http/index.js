import ajax from "./ajax";
import md5 from "md5";
import { setQuery } from "util";
import store2 from "store2";
import _ from "underscore";

class http {
    getCache(options) {
        const { url, data } = options;
        let resData = false;
        if (!data.updateCache && data._cache) {
            let resCache = store2.session.get('request_cache');
            const datas = _.clone(options.data)
            delete datas._cache;
            let secretKey = url; // 唯一的key
            if (datas.params && !_.isUndefined(datas.params)) secretKey += JSON.stringify(datas.params);
            if (datas.data && !_.isUndefined(datas.data)) secretKey += JSON.stringify(datas.data);
            if (!_.isEmpty(resCache) && _.isArray(resCache)) {
                let res = _.findWhere(resCache, { id: md5(secretKey) });
                if (res) resData = res;
            }
        }

        if (resData) {
            return new Promise(resolve => resolve(resData.data));
        } else {
            return ajax[options.method](options.url, options.data)
        }
    }

    setQuery(url, params) {
        if (!_.isUndefined(params.params) && !_.isEmpty(params.params)) {
            url += setQuery(params.params);
            delete params.params;
            return { url, params };
        }
        return { url, params };
    }

    all(list) {
        return Promise.all(list);
    }

    get(url, params = {}) {
        return this.getCache({ method: 'get', url: url, data: params });
    }

    post(url, data = {}) {
        return this.getCache({ method: 'post', url: this.setQuery(url, data).url, data: this.setQuery(url, data).params });
    }

    put(url, data = {}) {
        return this.getCache({ method: 'put', url: this.setQuery(url, data).url, data: this.setQuery(url, data).params })
    }

    delete(url, params = {}) {
        return this.getCache({ method: 'delete', url: url, data: params })
    }
}

export default new http();