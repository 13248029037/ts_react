import React from "react";
import style from "./index.less";
interface IProps {
  style?: React.CSSProperties;
  title?: string;
}
const Bar: React.SFC<IProps> = (props) => {
  return (
    <div className={style.container} style={props.style}>
      {props.title}
    </div>
  );
};
export default Bar;
