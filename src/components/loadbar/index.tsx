import React, { useEffect, useState, useRef } from "react";
import style from "./index.less";
import { requestAnimFrame, cancelAnimFrame } from "@/utils/function";
interface IProps {
  style?: React.CSSProperties;
  text?: string;
}
const LoadBar: React.SFC<IProps> = (props) => {
  let timer = 0;
  const loadDom = useRef(null);
  const [width, setWidth] = useState(0);
  const load = () => {
    cancelAnimFrame(timer);
    setWidth((last) => {
      if (last + 1 > 980) {
        return last;
      }
      return last + 1;
    });
    if (width < 980) {
      timer = requestAnimFrame(load);
    }
  };
  useEffect(() => {
    load();
    return () => {
      cancelAnimFrame(timer);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className={style.container} style={props.style}>
      <span
        ref={loadDom}
        className={style.load}
        style={{ width: width / 10 + "%" }}
      />
      <span className={style.text}>{width / 10 + "%"}</span>
    </div>
  );
};
export default LoadBar;
