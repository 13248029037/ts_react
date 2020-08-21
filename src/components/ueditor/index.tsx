import "braft-editor/dist/index.css";
import "./init.css";
import BraftEditor, { EditorState } from "braft-editor";
import React from "react";
import style from "./index.less";
import { uploadOss } from "@/api";
interface IProps {
  style?: React.CSSProperties;
  value?: EditorState;
  className?: string;
  onChange?: (value: string | string[]) => void;
}
const myUploadFn = async (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  try {
    const data = await uploadOss<{ url: string }>(formData);
    param.success({
      url: data.url,
    });
    param.progress(100);
  } catch (error) {
    console.info(error);
  }
};

const Ueditor: React.SFC<IProps> = (props) => {
  const onChange = (valueFromUeditor: EditorState) => {
    props.onChange(valueFromUeditor);
    const Text = valueFromUeditor.toText();
    props.onChange(Text ? [valueFromUeditor.toHTML(), Text] : "");
  };
  return (
    <BraftEditor
      placeholder="请输入信息"
      style={props.style}
      className={style.container + " " + props.className}
      value={props.value}
      onChange={onChange}
      media={{ uploadFn: myUploadFn }}
      colors={[
        "#000000",
        "#333333",
        "#666666",
        "#999999",
        "#cccccc",
        "#ffffff",
        "#61a951",
        "#16a085",
        "#07a9fe",
        "#003ba5",
        "#8e44ad",
        "#f32784",
        "#c0392b",
        "#d35400",
        "#f39c12",
        "#fdda00",
        "#7f8c8d",
        "#2c3e50",
        "#FF0000",
        "#3DEE11",
      ]}
    />
  );
};
export default Ueditor;
