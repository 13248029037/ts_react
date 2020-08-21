import React from "react";
import style from "./index.less";
import {
  DeleteOutlined,
  ShareAltOutlined,
  UserOutlined,
  SolutionOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
interface IProps {
  style?: React.CSSProperties;
  title?: string;
  team?: string;
  updateUser: string;
  hancleChange: (tag: number) => void;
}
enum operationEnum {
  edit = 1,
  link = 2,
  delete = 3,
  rights = 4,
}
const Card: React.SFC<IProps> = (props) => {
  return (
    <div className={style.card} style={props.style}>
      <div className={style["icon-box"]}>
        <SketchOutlined className={style.icon} />
        <h3 className={style.title}>
          {props.title}
          <span style={{ fontSize: 16 }}>({props.team})</span>
        </h3>
        <div className={style.user}>
          <UserOutlined style={{ paddingRight: 4 }} />
          <span style={{ color: "#666" }}>{props.updateUser}</span>
        </div>
        <div className={style["user-right"]}>
          <Popover content="权限设置">
            <SolutionOutlined
              onClick={() => props.hancleChange(operationEnum.rights)}
            />
          </Popover>
        </div>
      </div>
      <div className={style["operation-box"]}>
        <Popover content="项目工作流配置">
          <ShareAltOutlined
            onClick={() => props.hancleChange(operationEnum.link)}
            className={style.operation}
          />
        </Popover>
        <Popover content="删除项目">
          <DeleteOutlined
            onClick={() => props.hancleChange(operationEnum.delete)}
            className={style.operation}
          />
        </Popover>
      </div>
    </div>
  );
};
export default Card;
