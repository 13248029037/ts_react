import React from "react";
import style from "./index.less";
import { Pagination } from "antd";
interface IProps {
  style?: React.CSSProperties;
  pageSize: number;
  current: number;
  total: number;
  onChange: (pageIndex: number) => void;
}
const FooterPage: React.SFC<IProps> = (props) => {
  return (
    <div className={style.footer} style={props.style}>
      <div className={style.place}>{}</div>
      <Pagination
        current={props.current}
        pageSize={props.pageSize}
        total={props.total}
        onChange={props.onChange}
      />
      <span style={{ paddingLeft: 10 }}>{` 总计${props.total}条`}</span>
    </div>
  );
};
export default FooterPage;
