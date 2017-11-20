const parseURL = (urls) => { //解析URL
    let a = document.createElement('a');
    a.href = window.location.href;
    return {
        source: window.location.href,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            let ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/ths ? : \/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    }
};

const SessionStorage = { //sessionStorage
    Set: (key, value) => { //设置
        return window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    Get: (key, value) => { //获取
        return window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    Remove: (key) => { //删除
        return window.sessionStorage.removeItem(key);
    }
};
const LocalStorage = { //localStorage
    set: (key, value) => {
        return window.localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key) => {
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove: (key) => {
        return window.sessionStorage.removeItem(key);
    }
}
export {
    SessionStorage,
    LocalStorage,
    parseURL
}