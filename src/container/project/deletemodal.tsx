import React from "react";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { IDeleteModalProps } from "@/interface/project.interface";
const DeleteModal: React.SFC<IDeleteModalProps> = (props) => {
  const { modalVisible } = props;
  const handleOk = () => {
    props.handleOk();
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  return (
    <Modal
      getContainer={false}
      destroyOnClose={true}
      forceRender={true}
      title="删除项目"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <QuestionCircleOutlined
          style={{ fontSize: 30, color: "orange", paddingRight: 10 }}
        />
        <span>是否删除该项目？</span>
      </div>
    </Modal>
  );
};
export default DeleteModal;
