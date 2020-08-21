import React, { useEffect, useRef } from "react";
import style from "./index.less";
interface IProps {
  text?: string;
  content?: string;
  onClick?: () => void;
  onload?: (current) => void;
}
const ShowLog: React.SFC<IProps> = (props) => {
  const textarea = useRef(null);
  useEffect(() => {
    const current = textarea.current;
    current.scrollTop = current.scrollHeight;
    props.onload(current);
  });
  return (
    <textarea
      readOnly={true}
      ref={textarea}
      className={style.container}
      style={{ flex: 1 }}
      value={props.content}
    >
      1
    </textarea>
  );
};
export default ShowLog;
