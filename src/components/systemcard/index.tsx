import React from "react";
import style from "./index.less";
interface IProps {
  style?: React.CSSProperties;
  title?: string;
  info?: string;
  onClick: () => void;
  component?: React.SFC<{ style?; className? }>;
}
const Card: React.SFC<IProps> = (props) => {
  return (
    <div className={style.card} style={props.style} onClick={props.onClick}>
      <div className={style["icon-box"]}>
        {props.component && <props.component className={style.icon} />}
        <h3 className={style.title}>{props.title}</h3>
        <p className={style.info}>{props.info}</p>
      </div>
    </div>
  );
};
export default Card;
