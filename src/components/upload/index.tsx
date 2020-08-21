import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadexcel } from "@/api";
import { ButtonType } from "antd/lib/button";
interface IProps {
  style?: React.CSSProperties;
  onSuccess?: () => void;
  className?: string;
  text?: string;
  type?: ButtonType;
}
const UploadExcel: React.SFC<IProps> = (props) => {
  const config = {
    beforeUpload: (file) => {
      const fileTemp = new FormData();
      fileTemp.append("file", file);
      uploadexcel(fileTemp).then((data) => {
        if (props.onSuccess) {
          props.onSuccess();
        }
      });
      return false;
    },
  };
  return (
    <Upload
      {...config}
      fileList={[]}
      style={props.style}
      className={props.className}
      accept={`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}
    >
      <Button type={props.type || "default"}>
        <UploadOutlined /> {props.text || "上传文件"}
      </Button>
    </Upload>
  );
};
export default UploadExcel;
