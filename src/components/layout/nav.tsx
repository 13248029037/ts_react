import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import styles from "./nav.less";
import navConfig from "src/config";
import logo from "src/asset/logo.svg";
import config from "src/config";
import { RouteComponentProps } from "react-router";
import { ISetting } from "@/interface/setting.interface";
const SubMenu = Menu.SubMenu;
interface Iprops {
  setting: ISetting;
}
const Nav: React.SFC<RouteComponentProps & Iprops> = (props) => {
  const [selectedKeys, setSelectKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const getPath = () => {
    const { history } = props;
    const pathTemp = history.location.pathname;
    navConfig.forEach((item) => {
      item.options.forEach((node) => {
        if (node.path === pathTemp || pathTemp.indexOf(node.path) === 0) {
          setSelectKeys([String(node.id)]);
          setOpenKeys([String(item.id)]);
        }
      });
    });
  };
  const gotoRouter = ({ item, key, keyPath }) => {
    config.forEach((v) => {
      if (key.split("-")[0] === v.id.toString()) {
        v.options.forEach((n) => {
          if (n.id === key) {
            props.history.push(n.path);
          }
        });
      }
    });
  };
  const onOpenChange = (openKeysTemp: string[]) => {
    setOpenKeys(openKeysTemp);
  };
  useEffect(() => {
    getPath();
    if (props.setting.getCollaps) {
      setOpenKeys([]);
    }
    // eslint-disable-next-line
  }, [window.location.pathname, props.setting.getCollaps]);
  return (
    <div className={props.setting.getCollaps ? styles.navCollaps : styles.nav}>
      {
        <header className={styles.header}>
          <img alt="xxxx" src={logo} className={styles.logo} />
          <span
            className={styles.title}
            style={{ opacity: props.setting.getCollaps ? 0 : 1 }}
          >
            xxx
          </span>
        </header>
      }
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        onClick={gotoRouter}
        inlineCollapsed={props.setting.collaps}
        openKeys={openKeys}
        defaultOpenKeys={openKeys}
        onOpenChange={onOpenChange}
        forceSubMenuRender={true}
      >
        {props.setting.userName &&
          (props.setting.roleName.indexOf("admin") !== -1
            ? navConfig.map((navItem) => ({ ...navItem, isHide: false }))
            : navConfig
          ).map((item) => {
            return (
              !item.isHide && (
                <SubMenu
                  key={item.id}
                  title={
                    <span style={{ fontSize: "16px" }}>
                      <item.icon style={{ fontSize: "20px" }} />
                      <span style={{ position: "relative", top: "-3px" }}>
                        {item.name}
                      </span>
                    </span>
                  }
                >
                  {item.options.map((node) => {
                    return <Menu.Item key={node.id}>{node.name}</Menu.Item>;
                  })}
                </SubMenu>
              )
            );
          })}
      </Menu>
    </div>
  );
};
export default withRouter(inject("setting")(observer(Nav)));
