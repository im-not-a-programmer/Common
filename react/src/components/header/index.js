import React from "react";
import { Menu, Icon } from "antd";
import styles from "./style.less";
import store from "store2";
import http from "../../http";
import * as api from "../../http/types";
const SubMenu = Menu.SubMenu

class Header extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      fullName: ""
    };
  }
  logout = () => {
    http.get(api.GET_LOGOUT)
    .then(res => {
      store.clearAll();
      window.location.reload();
      this.props.history.push('/login');
    });
  }
  componentDidMount() {
    http.get(api.GET_SYS_PTYPARTY_INFO, {
      _cache: true
    })
    .then(res => {
      const data = res.data;
      store.session.set("fullName", data.name);
      this.setState({
        fullName: data.name
      });
    });
  }
  render() {
    return (
      <div className={styles.quit}>
        <Menu
          onClick={this.logout}
          mode="horizontal"
          style={{ background: "#343434", color: "#fff", border: "none" }}
        >
          <SubMenu
            title={
              <span>
                <Icon type="user" />您好，{this.state.fullName}
              </span>
            }
          >
            <Menu.Item key="user"><Icon type="poweroff" />退出登录</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Header;
