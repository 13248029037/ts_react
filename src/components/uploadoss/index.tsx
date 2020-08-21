import React from "react";
import { Upload, Button } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import styles from "./index.less";
import { uploadOss } from "@/api";
interface IItem {
  fileName: string;
  url: string;
}
interface IProps {
  style?: React.CSSProperties;
  fileList?: IItem[];
  onFileChange?: (tag: number, item: IItem) => void;
  onSuccess?: () => void;
}
const UploadOss: React.SFC<IProps> = (props) => {
  const fileList = props.fileList || [];
  const config = {
    beforeUpload: (file) => {
      const fileTemp = new FormData();
      fileTemp.append("file", file);
      uploadOss(fileTemp).then((data: IItem) => {
        if (props.onFileChange) {
          props.onFileChange(1, data);
        }
        if (props.onSuccess) {
          props.onSuccess();
        }
      });
      return false;
    },
  };
  const remove = (v) => {
    if (props.onFileChange) {
      props.onFileChange(2, v);
    }
  };
  return (
    <div style={props.style}>
      <Upload {...config} fileList={[]} multiple={true}>
        <Button>
          <UploadOutlined /> 上传文件
        </Button>
      </Upload>
      <ul>
        {fileList.map((item) => (
          <li key={item.url} className={styles.item}>
            <a target="_brank" href={item.url}>
              <LinkOutlined />
              {item.fileName}
            </a>
            <DeleteOutlined
              onClick={() => remove(item)}
              className={styles.delete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UploadOss;
