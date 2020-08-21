import React from "react";
import style from "./index.less";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
import Draggable from "react-draggable";
interface IProps {
  style?: React.CSSProperties;
  title?: string;
}
const FixButton: React.SFC<IProps & RouteComponentProps> = (props) => {
  const goback = () => {
    props.history.goBack();
  };
  return (
    <Draggable>
      <div className={style.container} style={props.style}>
        <Popover content="返回上一级">
          <ArrowLeftOutlined onClick={goback} className={style.gotoUp} />
        </Popover>
      </div>
    </Draggable>
  );
};
export default withRouter(FixButton);
