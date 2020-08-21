import React, { useEffect, useState } from "react";
import moment from "moment";
import { DashboardOutlined } from "@ant-design/icons";
import style from "./index.less";
interface IProps {
  style?: React.CSSProperties;
  title?: string;
  info?: string;
}
const TimeTick: React.SFC<IProps> = (props) => {
  const [date, setDate] = useState(
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <span className={style.container} style={props.style}>
      <DashboardOutlined style={{ marginRight: 4 }} />
      {date}
    </span>
  );
};
export default TimeTick;
