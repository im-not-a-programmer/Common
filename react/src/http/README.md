# types
api
# config
环境配置
# index 

``` bash
# 添加节流阀
{ _cache: true }

# 是否需要提示信息
{ _msg: true }

# 是否需要loading
{ _loading: true }
_loading = true 会设置一个 dataLoading 到redux 并触发一个全局的Spin
_loading = "custom" 会设置一个 load 到 redux

# body 传参
{
    id: 2,
    _cache: true
}

# query 传参
{
    params: {
        id: 222
    },
    _cache: true
}
```
