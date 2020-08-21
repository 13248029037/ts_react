import * as React from "react";
import Nav from "./nav";
import Header from "./header";
import style from "./index.less";
import { observer, inject } from "mobx-react";
import { Spin } from "antd";
import { ISetting } from "@/interface/setting.interface";
import FixedButton from "@/components/fixedbutton";
interface IProps {
  setting?: ISetting;
}
const LayoutIndex: React.SFC<IProps> = (props) => {
  return (
    <div className={style["layout-container"]}>
      <Nav />
      <Header />
      <FixedButton />
      {props.setting.globalLoadingSpin && (
        <Spin size="default" className={style.load} />
      )}
      <div
        className={style["layout-content-wrapper"]}
        style={{
          marginLeft: props.setting.collaps ? "80px" : "240px",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
export default inject("setting")(observer(LayoutIndex));
