import React from "react";
import { Form, Input, Modal } from "antd";
import { IIableData } from "@/interface/workflow.interface";

interface IAddModalProps {
  modalVisible: boolean;
  isEdit: boolean;
  handleOk: (value: IIableData) => void;
  handleCancel: () => void;
  editItem?: IIableData;
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const AddModal: React.SFC<IAddModalProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible } = props;
  if (props.isEdit) {
    form.setFieldsValue({
      args: props.editItem.args,
      command: props.editItem.command,
      env: props.editItem.env,
      image: props.editItem.image,
      name: props.editItem.name,
      volueMounts: props.editItem.volueMounts,
    });
  } else {
    form.setFieldsValue({
      args: "",
      command: "",
      env: "",
      image: "",
      name: "",
      volueMounts: "",
    });
  }
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      props.handleOk({
        args: values.args,
        command: values.command,
        env: values.env,
        image: values.image,
        name: values.name,
        volueMounts: values.volueMounts,
      });
    } catch (errorInfo) {
      return false;
    }
    return;
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  return (
    <Modal
      maskClosable={false}
      getContainer={false}
      destroyOnClose={true}
      title={props.isEdit ? "编辑step设置" : "添加step设置"}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="dynamic_rule">
        <Form.Item
          {...formItemLayout}
          name="name"
          label="step名称"
          rules={[
            {
              required: true,
              message: "请输入step名称",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="请输入step名称"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="args"
          label="命令参数"
          rules={[
            {
              message: "多个命令参数用空格分开，例如clean install",
            },
          ]}
        >
          <Input
            autoComplete={"off"}
            placeholder="多个命令参数用空格分开，例如clean install"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="image"
          label="任务镜像"
          rules={[
            {
              required: true,
              message: "请输入任务镜像",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="请输入任务镜像"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="env"
          label="环境变量"
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="多个环境变量用;分开，例env=stage;region=shanghai"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="volueMounts"
          label="挂载目录"
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="多个目录用;分开，例/root;/boot"
            allowClear={true}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddModal;
