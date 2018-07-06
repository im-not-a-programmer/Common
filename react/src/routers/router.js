import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
  withRouter,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initRouters } from './router.config'
import Bundle from './bundle'
import NotFound from '../containers/notFound/notFound'
import { Spin } from "antd"
import store from "store2"
import _ from "underscore"

// 框架
const Layout = props => (
  <Bundle {...props} load={() => import('../containers/layout')}>
    {Comp => {
      return Comp ? <Comp {...props} /> : <div>加载中...</div>
    }}
  </Bundle>
)

// 登录
const Login = props => (
  <Bundle {...props} load={() => import('../containers/login')}>
    {Comp => {
      return Comp ? <Comp {...props} /> : <div>加载中...</div>
    }}
  </Bundle>
)

class router extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }
  constructor(prop) {
    super(prop)
    this.state = {
      percent: 0
    }
  }
  deepItem(item, props) {
    item.props = props
    return <Route key={item.path} {...item} />
  }
  render() {
    return (
      <Router>
        <Spin tip="拼命加载中..." spinning={this.props.loading || this.props.dataLoading} delay={300}>
          <div
            style={{
              height: '100%'
            }}
          >
            {/* 监听路由变化 */}
            <Authverify {...this.props} />
            <Route exact path="/login" component={Login} />
            <Route
              path="/index"
              render={item => (
                <Layout {...item} { ...this.props }>
                  {_.map(initRouters, items => this.deepItem(items, { ...this.props, ...item}))}
                </Layout>
              )}
            />
            <Route path="/not-found" component={NotFound} />
          </div>
        </Spin>
      </Router>
    )
  }
}

let beforeRouterName = ''
const Authverify = withRouter(props => { // 登录验证
  const { location } = props
  const { pathname } = location
  if (beforeRouterName === pathname) return null;
  const token = store.local.get("token") || store.session.get("token");
  const isLogin = token || '';
  if (!isLogin) {
    if (location.pathname === '/login') {
      return null
    }
    beforeRouterName = '/login'
    return <Redirect to="/login" />
  } else if (isLogin && pathname === '/login') {
    return <Redirect to="/index/home" />
  } else if (isLogin && pathname === '/') {
    return <Redirect to="/index/home" />
  } else if (isLogin && pathname === '/index') {
    return <Redirect to="/index/home" />
  }
  beforeRouterName = location
  return <Link to={beforeRouterName} />;
})

const mapState = state => {
  return {
    loading: state.loading.show,
    dataLoading: state.dataLoading.show
  }
}

export default connect(mapState)(router)
