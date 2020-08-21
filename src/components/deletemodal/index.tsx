import React from "react";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
export interface IDeleteModalProps {
  title?: string;
  modalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
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
      title={props.title || "删除项目"}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <QuestionCircleOutlined
          style={{ fontSize: 30, color: "orange", paddingRight: 10 }}
        />
        <span>是否删除？</span>
      </div>
    </Modal>
  );
};
export default DeleteModal;
