import React from "react";
import styles from "./index.less";
import { Form, Input, Icon, Button, Tabs, Checkbox, Spin } from "antd";
import { verifyLogin } from 'actions/rootActions'
import store from "store2";
import http from "http";
import * as apis from "http/types";
import { connect } from 'react-redux';
import 'particles.js';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

// 创建react组件
class Logins extends React.Component {
  constructor(props) {
    super(props);
    const userAccount = {
      username: store.get("username"),
      password: store.get("password")
    };
    this.state = {
      isLoading: false,
      loginLoading: false,
      userAccount: userAccount,
      saveAccount: store.get("saveAccount"),
      tabActive: "2"
    };
    this.saveAccount = this.saveAccount.bind(this);
    this.tabbarOnClock = this.tabbarOnClock.bind(this);
  }
  saveAccount() {
    this.setState({
      saveAccount: !this.state.saveAccount
    });
  }
  tabbarOnClock(key) {
    this.setState({
      tabActive: key
    });
  }
  render() {
    const { tabActive } = this.state;
    const origin = window.location.origin;
    if (false) {
      store.set("token", this.props.results.data);
      store.session.set("logined", true);
      if (this.state.saveAccount) {
        const { username, password } = this.state.userAccount;
        store.set("username", username);
        store.set("password", password);
        store.set("saveAccount", this.state.saveAccount);
      } else {
        store.remove("username");
        store.remove("password");
        store.set("saveAccount", false);
      }
      window.location.href = origin + "/index/index/page.html";
      window.history.pushState(null, null, window.document.URL);
      window.addEventListener("popstate", function () {
        window.history.pushState(null, null, window.document.URL);
      });
    }
    const { getFieldDecorator, validateFields } = this.props.form;
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          http.post(apis.POST_LOGIN, values)
          .then(res => {
            this.setState({
              loginLoading: false
            });
            this.props.dispatch(
              verifyLogin({
                isLogin: true,
                token: res.data
              })
            );
            // store.clearAll();
            if (this.state.saveAccount) {
              store.set("token", res.data);
            } else {
              store.session.set("token", res.data);
            }
            this.props.history.push('/index');
          });
        }
      });
    };
    return (
      <div className={styles.bkg}>
        <div className={styles.formbox}>
          <div className={styles.tab_bar}>
            { /*
              <span className={tabActive === "1" ? styles.tab_active : styles.tab_normal} onClick={() => this.tabbarOnClock("1")}>指纹登录</span>
            */ }
            <span className={tabActive === "2" ? styles.tab_active : styles.tab_normal} onClick={() => this.tabbarOnClock("2")}>账号密码登录</span>
          </div>
          <h2 className={styles.login_tit}>欢迎登录-壹号平台2.0</h2>
          <Tabs activeKey={this.state.tabActive} tabBarStyle={{ display: "none" }}>
            <TabPane tab="账号密码登录" key="2">
              <Form onSubmit={e => handleSubmit(e)} className={styles["login-form"]}>
                <FormItem>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "请输入账号！" }],
                    initialValue: this.state.userAccount.username
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: "16px", color: "rgba(0,0,0,.25)" }} />} className={styles.account} placeholder="账号" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "请输入密码！" }],
                    initialValue: this.state.userAccount.password
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: "16px", color: "rgba(0,0,0,.25)" }} />} type="password" className={styles.password} placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  <p><Checkbox onChange={this.saveAccount}>下次自动登录</Checkbox></p>
                  {/* <i className={saveAccount ? styles.check_save_account_select : styles.check_save_account} onClick={this.saveAccount}></i>
                  <p className={styles.save_account}>下次自动登录</p> */}
                  <Button style={{ display: "none" }} type="primary" htmlType="submit" onClick={handleSubmit} />
                  <Button className={styles["login-form-button"]} type="primary" loading={this.state.loginLoading} onClick={handleSubmit}>登录</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="指纹登录" key="1">
              <div className={styles.finger_login}>
                <p className={styles.input_finger}></p>
                <p className={styles.footer_message}></p>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div className={this.state.isLoading ? styles.loading : styles.noLoading}><Spin tip="Loading..." /></div>
        <div id="particles-js"></div>
      </div>
    );
  }
}
const Login = Form.create({})(Logins);
export default connect()(Login);
