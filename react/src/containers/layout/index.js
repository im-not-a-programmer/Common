import React from "react";
import styles from "./index.less";
import { Header } from "components";
import { Breadcrumb, Tag } from "antd";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
// import { menuTab as __menuTab } from "../../actions/rootActions";

/**
 * TL 哪里需要字典就在哪里调用 
*/

// // 获取树类型字典表
// http.get(api.GET_SYS_PTYDICT_TREE)
// .then(res => {
//   const codeMap = res.data;
//   const newCodeMap = JSON.stringify(codeMap);
//   const oldCodeMap = JSON.stringify(store.session.get("codeMapTree"));
//   if (newCodeMap !== oldCodeMap) {
//     store.session.set("codeMapTree", codeMap);
//   }
// });

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTab: []
    }
  }
  componentWillReceiveProps(props) {
    if (props.menuTab && props.menuTab.length) {
      const menuTab = props.menuTab;
      this.setState({
        menuTab
      })
    }
  }
  menuClose(e, path) {
    e.preventDefault();
    const menuTab = this.state.menuTab;
    menuTab.forEach((item, index) => {
      if (item.path === path) menuTab.splice(index, 1)
    });
    if (path === this.props.linkPath) this.props.history.push(menuTab[0].path);
    this.setState({
      menuTab
    });
  }
  render() {
    const renderMenuTab = () => {
      return (
        <div id="menuTab" className={styles.menuTab}>
          {
            this.state.menuTab.map((item, index) => (
              <Tag 
                className={this.props.linkPath === item.path ? `${styles.tag} ${styles.onTag}` : `${styles.tag}`} 
                closable={this.state.menuTab.length > 1}
                onClose={(e) => this.menuClose(e, item.path)}
                key={index}
              ><Link to={item.path}>{item.name}</Link></Tag>
            ))
          }
        </div>
      )
    }
    return (<div className={styles.container}>
      <header className={styles.header}>
        {
          renderMenuTab()
        }
        <Header />
      </header>
      <nav className={styles.nav}>
        {/* <Menu {...this.props} /> */}
      </nav>
      <article id="contentContainer" className={styles.content} >
        <div style={{ padding: "0px 10px", background: "#f4f4f4" }}>
          <Breadcrumb separator="/" className={styles.Breadcrumb}>
            {
              this.props.breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
            }
          </Breadcrumb>
        </div>
        {this.props.children}
      </article>
    </div>);
  }
}
const mapState = state => {
  return {
    breadcrumb: state.breadcrumb.data,
    menuTab: state.menuTab.data,
    linkPath: state.linkData.data
  }
}

export default connect(mapState)(MainView);
