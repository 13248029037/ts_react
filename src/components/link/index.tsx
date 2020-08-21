import React from "react";
import style from "./index.less";
interface IProps {
  style?: React.CSSProperties;
  text?: string;
  onClick?: () => void;
}
const Link: React.SFC<IProps> = (props) => {
  return (
    <span
      onClick={() => props.onClick && props.onClick()}
      className={style.container}
      style={props.style}
    >
      {props.text}
    </span>
  );
};
export default Link;
