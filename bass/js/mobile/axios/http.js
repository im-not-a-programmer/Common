import ajax from 'axios'
import 'mint-ui/lib/style.css'
import { Toast, Indicator } from 'mint-ui'
import router from '@/router/index'
import qs from 'qs'
var axios = ajax.create({
    baseURL: 'http://47.92.106.250:9091/xymall-distribute-settle-interface',
    //baseURL: '/api',
    headers: {},
    withCredentials: false, //是否跨域
});
//添加一个请求拦截器
axios.interceptors.request.use((config) => {
    //在请求发出之前进行一些操作
    Indicator.open('加载中...');
    return config;
}, (err) => {
    router.push('/err')
    return Promise.reject(err);
});

//添加一个响应拦截器
axios.interceptors.response.use((res) => {
    if (res.data.resultMsg) {
        Toast({
            message: res.data.resultMsg,
            position: 'bottom',
            duration: 2000
        });
    };
    Indicator.close();
    return res.data;
}, (err) => {
    router.push('/err')
    return Promise.reject(err);
});

function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true

    Vue.axios = axios;

    Object.defineProperties(Vue.prototype, {
        $axios: {
            get() {

                return axios;
            },
        }
    });
}
export default plugin;